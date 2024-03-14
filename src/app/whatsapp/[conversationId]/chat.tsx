"use client"

import { Button } from "@/components/ui/button";
import { cn, reduceText } from "@/lib/utils";
import { ConversationDAO } from "@/services/conversation-services";
import { format } from "date-fns";
import { ArrowDownCircle, Loader, Reply } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsFilePdfFill } from "react-icons/bs";
import { setMessagesReadAction } from "../conversations/conversation-actions";
import SendText from "./send-text";
import AudioPlayer from "./audio-player";
import QuotedBox from "./quoted-box";
import VCardDisplay from "./vcard-box";
import LocationBox from "./location-box";
import socket from "@/lib/socket";
import { MessageDAO } from "@/services/message-services";
import { getConversationMessagesDAOAction, getUnreadMessagesDAOAction } from "../messages/message-actions";

type Props = {
  conversation: ConversationDAO
}

export function Chat({ conversation }: Props) {

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [replyId, setReplyId] = useState("")
  const [replayName, setReplayName] = useState("")
  const [replayText, setReplayText] = useState("")
  const [replayType, setReplayType] = useState("")

  const [messages, setMessages] = useState<MessageDAO[]>([])
  const [newMessages, setNewMessages] = useState(false)

  const [loading, setLoading] = useState(false)


  const markAsread = useCallback(() => {
    if (conversation.unreadMessages === 0) return
    
    setMessagesReadAction(conversation.id)
    .then(() => {
        socket.emit("messagesRead", conversation.id);
    })
    .catch((error) => {
        console.error(error);
    });
  }, [conversation.id, conversation.unreadMessages]);

  useEffect(() => {
    if (!newMessages) return
    
    console.log("buscando mensajes no leidos")
    
    getUnreadMessagesDAOAction(conversation.id)
    .then((data) => {
      if (data) {
        // append new messages to the list
        setMessages((prev) => [...prev, ...data])
        setNewMessages(false)
        markAsread()
      }
    })
    .catch((error) => {
      console.error(error)
    })

  }, [conversation.id, newMessages, markAsread])

  useEffect(() => {

    // Escuchar el evento 'messageArrived' desde el servidor
    socket.on("messageArrived", (message) => {
        
        if (message === conversation.id) {
            setNewMessages(true)
        }        
    })

    // Limpiar el listener al desmontar el componente
    return () => {
      socket.off("messageArrived")
    };
  }, [conversation.id])

  

  useEffect(() => {
    setLoading(true)
    getConversationMessagesDAOAction(conversation.id, 30)
    .then((data) => {
      if (data) {
        setMessages(data)
        markAsread()
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [conversation.id, markAsread])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    scrollToBottom()
  }, [messages])

  function reply(message: any) {
    setReplyId(message.wapId)
    setReplayName(message.name)
    setReplayText(message.content)
    switch (message.mimeType) {
      case "application/pdf":
        setReplayType("pdf")
        break
      case "audio/ogg; codecs=opus":
        setReplayType("audio")
        break
      case "image/jpeg":
        setReplayType("image")
        break
      case "video/mp4":
        setReplayType("video")
        break
      default:
        setReplayType("text")
        break    
    }
  }

  function notifyCloseReplay() {
    setReplyId("")
    setReplayName("")
    setReplayText("")
    setReplayType("")
  }

  function notifyNewMessage() {
    setNewMessages(true)    
  }

  
  return (
    <div>
      <div className={cn("flex flex-col whatsapp-background px-4 custom-scrollbar overflow-auto h-[calc(100vh-270px)] bg-gray-200 border", replayType && "overflow-auto h-[calc(100vh-360px)]")}>
      {loading && <Loader className="w-8 h-8 mx-auto mt-10 animate-spin text-muted-foreground" />}
      {
        messages.map((message) => {
          const quotedId= message.quoted && message.quoted.split("_@_")[0]
          const rawQuotedText= message.quoted && message.quoted.split("_@_")[1]
          const quotedText= rawQuotedText && rawQuotedText.split("_*:")[1] || rawQuotedText
          const messageQuoted= messages.find(m => m.wapId === quotedId)
          const nameQuoted= messageQuoted?.name
          const mimeTypeQuoted= messageQuoted?.mimeType
          const quotedMediaUrl= messageQuoted?.mediaUrl

          const isPdf= message.mediaUrl && message.mimeType?.startsWith("application/pdf")
          const pdfUrl= isPdf && message.mediaUrl?.split("_@_")[0]
          const pdfName= isPdf && message.mediaUrl?.split("_@_")[1]

          const isAudio= message.mediaUrl && message.mimeType?.startsWith("audio")

          const isSingleEmojiMessage= message.content.length === 2 && isSingleEmoji(message.content)

          const isGroup= conversation.isGroup
        return (
          message.role === "user" ?
          <div key={message.id}>
            <div className="max-w-sm p-2 mt-3 mb-2 bg-white rounded-lg xl:max-w-lg">
              <div className="flex justify-between">
                <p className="text-xs text-[#00a884]">{message.name}</p>
                <Button variant="secondary" className="h-5 gap-2 px-1" onClick={() => reply(message)}>
                  <Reply className="text-muted-foreground" />
                </Button>
              </div>
              { message.mediaUrl && message.mimeType?.startsWith("image") &&  <Image src={message.mediaUrl} alt="media" className="object-cover w-full rounded-lg" width={300} height={200} /> }
              {message.mediaUrl && message.mimeType?.startsWith("video") && (
                <video
                  src={message.mediaUrl}
                  controls
                  className="object-cover w-full rounded-lg"
                  width={300}
                  height={200}>
                  Tu navegador no soporta el elemento <code>video</code>.
                </video>
              )}

              {
                message.quoted && 
                <QuotedBox name={nameQuoted!} replayText={quotedText!} mimeType={mimeTypeQuoted!} mediaUrl={quotedMediaUrl} />
              }

              {
                message.content === "_contact_" && 
                <VCardDisplay vCardContent={message.mimeType || ""} />
              }

              {
                message.content === "_location_" && message.mimeType &&
                <LocationBox location={JSON.parse(message.mimeType || "")} />
              }

              {isPdf && pdfUrl && (
                <div className="mt-4">
                  
                  <Link href={pdfUrl} target="_blank">
                    <Button variant="link" className="flex justify-between w-full px-0.5">
                      <div className="flex items-center gap-3">
                        <BsFilePdfFill size={25} className="text-red-500 " /> 
                        {pdfName ? reduceText(pdfName, 35) : "Descargar PDF"} 
                      </div>
                      <ArrowDownCircle size={25} className="text-muted-foreground"/>
                    </Button>                  
                  </Link>
                  
                </div>
              )}

              { isAudio && <AudioPlayer src={message.mediaUrl!} avatarImage={message.pictureUrl!} time={format(message.createdAt, "HH:mm")} isGroup={isGroup} isLeft={true}/> }

              {
                (message.mediaUrl && message.content !== "_audio_") || (!message.mediaUrl && message.content !== "_contact_" && message.content !== "_location_") &&
                <>
                  <p className={cn(isSingleEmojiMessage && "text-5xl text-center", "mt-1")}>{message.content}</p>
                  <p className="text-xs text-right text-muted-foreground">{format(message.createdAt, "HH:mm")}</p>
                </>
              }
            </div> 
              { message.reactions && <p className={cn("text-xs whitespace-pre-line mt-1 ml-1", !message.reactions && "hidden")}>{message.reactions}</p>}
          </div> 
          :
          <div key={message.id} className="rounded-lg mt-3 mb-2 max-w-lg self-end min-w-[384px]">
            <div className="bg-[#dcf8c6] p-2">
              <div className="flex justify-between">
                <p className="text-xs text-[#00a884]">{message.name}</p>
                <Button variant="secondary" className="h-5 gap-2 px-1" onClick={() => reply(message)}>
                  <Reply className="text-muted-foreground" />
                </Button>
              </div>
              { message.mediaUrl && message.mimeType?.startsWith("image") &&  <Image src={message.mediaUrl} alt="media" className="object-cover w-full rounded-lg" width={300} height={200} /> }
              {message.mediaUrl && message.mimeType?.startsWith("video") && (
                <video
                  src={message.mediaUrl}
                  controls
                  className="object-cover w-full rounded-lg"
                  width={300}
                  height={200}>
                  Tu navegador no soporta el elemento <code>video</code>.
                </video>
              )}

              {
                message.quoted && 
                <QuotedBox name={nameQuoted!} replayText={quotedText!} mimeType={mimeTypeQuoted!} mediaUrl={quotedMediaUrl} />
              }
              {isPdf && pdfUrl && (
                <div className="bg-[#f0f0f0] rounded-lg p-2 mt-1">
                  
                  <Link href={pdfUrl} target="_blank">
                    <Button variant="link" className="gap-2">
                      <BsFilePdfFill size={25} className="text-red-500 " /> 
                      {pdfName || "Descargar PDF"} 
                      <ArrowDownCircle size={25} className="text-muted-foreground"/>
                    </Button>                  
                  </Link>
                  
                </div>
              )}

              { isAudio && <AudioPlayer src={message.mediaUrl!} avatarImage={message.pictureUrl!} time={format(message.createdAt, "HH:mm")} isGroup={isGroup} isLeft={false}/> }

              {
                message.content !== "_audio_" &&
                <>
                  <p className={cn("whitespace-pre-line mt-1", isSingleEmojiMessage && "text-5xl text-center")}>{message.content}</p>
                  <p className="text-xs text-right text-muted-foreground">{format(message.createdAt, "HH:mm")}</p>
                </>
              }
            </div>
            { message.reactions && <p className={cn("text-xs text-right whitespace-pre-line mt-1", !message.reactions && "hidden")}>{message.reactions}</p>}
          </div>
        )})
      }

        <div ref={messagesEndRef} /> {/* Elemento al final de los mensajes */}
        
      </div>
      <div className="my-3">
          <SendText conversationId={conversation.id} replayId={replyId} replyName={replayName} replayText={replayText} type={replayType} notifyCloseReplay={notifyCloseReplay} notifyNewMessage={notifyNewMessage} />
      </div>
    </div>
  )
}


function isSingleEmoji(str: string): boolean {
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
  const matches = str.match(emojiRegex);

  if (matches && matches.length === 1) {
    // Reemplazamos el emoji por '' para ver si queda algún otro caracter.
    const stringWithoutEmoji = str.replace(emojiRegex, '').trim();
    // Si no queda nada más o solo espacios, era un único emoji.
    return stringWithoutEmoji === '';
  }

  return false;
}