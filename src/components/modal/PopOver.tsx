"use client";

import * as RadixPopover from "@radix-ui/react-popover";

interface PopOverProps{
  trigger: React.ReactNode
  body: React.ReactNode
}

export default function PopOver({ trigger, body }: PopOverProps) {
  return (
    <>
      <RadixPopover.Root>
        <RadixPopover.Trigger>{trigger}</RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content align="end"
            className="rounded p-3 w-fit bg-white
            shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] 
            focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.tinta-vino)] 
            will-change-[transform,opacity] 
            data-[state=open]:data-[side=top]:animate-slideDownAndFade 
            data-[state=open]:data-[side=right]:animate-slideLeftAndFade 
            data-[state=open]:data-[side=bottom]:animate-slideUpAndFade 
            data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            sideOffset={10}>
                {body}
            <RadixPopover.PopoverArrow />
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </>
  );
}
