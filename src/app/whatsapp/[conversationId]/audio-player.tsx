"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
    src: string
    avatarImage: string
    time: string
    isGroup: boolean
    isLeft: boolean
}

export default function AudioPlayer({ src, avatarImage, time, isGroup, isLeft }: Props) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [durationInMinutes, setDurationInMinutes] = useState("0:00")
    const audioRef = useRef<HTMLAudioElement>(null)
  
    const togglePlayPause = () => {
  
      const prevValue = isPlaying
      setIsPlaying(!prevValue)
      if (!prevValue) {
        audioRef.current?.play()
      } else {
        audioRef.current?.pause()
      }
    }

    useEffect(() => {
        const duration = audioRef.current?.duration || 0
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        setDurationInMinutes(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
        
    }, [audioRef.current?.duration])
    

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current?.currentTime || 0
        const duration = audioRef.current?.duration || 0
        const progressValue = (currentTime / duration) * 100
        setProgress(progressValue)
    };
  
    return (
        <div className={cn("flex items-center px-1 h-16 rounded-lg max-w-md", !isLeft && "bg-[#dcf8c6]")}>
            <Avatar className={cn("h-12 w-12", isGroup && "hidden")}>
                <AvatarImage alt="User profile" src={avatarImage}/>
            </Avatar>
            <div className="flex flex-1">
                <div className="flex items-center mb-1">
                    <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} onTimeUpdate={handleTimeUpdate} />
                    {isPlaying ? (
                    
                        <Button className="p-0 text-gray-500 bg-transparent hover:bg-transparent" onClick={togglePlayPause}>
                            <PauseIcon onClick={togglePlayPause} className="w-10 h-10" />
                        </Button>
                    ) : (
                        <Button className="p-0 text-gray-500 bg-transparent hover:bg-transparent" onClick={togglePlayPause}>
                            <PlayIcon className="w-10 h-10" />
                        </Button>
                    )}

                </div>
                <div className="flex-1 pt-5 pr-3 space-y-2">
                    <Progress value={progress} className="h-1.5 bg-gray-300" indicatorClassName="bg-[#34b7f1]" />
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-600">{durationInMinutes}</span>
                        <span className="mr-1 text-xs text-gray-600">{time}</span>
                    </div>
                </div>
            </div>
            <Avatar className={cn("h-12 w-12", !isGroup && "hidden")}>
                <AvatarImage alt="User profile" src={avatarImage} />
            </Avatar>
        </div>
    )
}

function CheckCheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" />
        </svg>
    )
}


function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    );
}
  

function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 19h4V5H6zm8-14v14h4V5z" />
      </svg>
    );
}
  