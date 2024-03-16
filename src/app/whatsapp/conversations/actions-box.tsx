"use client"

import React, { useState } from 'react';
import { ConversationDialog, DeleteConversationDialog, SlackDialog } from './conversation-dialogs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConversationDAO } from '@/services/conversation-services';

type Props = {
  data: ConversationDAO
}

export function ConversationActions({ data }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSlackDialog, setShowSlackDialog] = useState(false)


  return (
    <div className="flex items-center">
      <DeleteConversationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        description={`¿Deseas eliminar esta conversación de ${data.name}?`}
        id={data.id}
      />

      <SlackDialog
        open={showSlackDialog}
        onOpenChange={setShowSlackDialog}
        id={data.id}
      />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown className={cn("cursor-pointer hover:text-muted-foreground hover-target", data.unreadMessages > 0 && "hidden", !showDeleteDialog && "opacity-0")} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setShowSlackDialog(true)}>Editar Slack Hook</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>Eliminar Chat</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
