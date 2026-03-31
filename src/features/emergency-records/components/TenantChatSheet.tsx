import { MessageCircle } from "lucide-react";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import {
  ChatDateDivider,
  ChatInput,
  ChatMessageList,
  Message
} from "./chat-primitives";
import { Dialog } from "radix-ui";

const messages: Message[] = [
  {
    type: "received",
    sender: "Arlene",
    time: "3:04 PM",
    bubbles: [
      "Thanks for reporting this, Sarah. I'll assign a maintenance technician right away."
    ]
  },
  {
    type: "sent",
    sender: "Jane",
    time: "4:06 PM",
    text: "Thanks. I'll be home after 4 PM if someone needs access."
  },
  {
    type: "received",
    sender: "Arlene",
    time: "4:08 PM",
    bubbles: [
      "Perfect. I've scheduled a plumber between 4:30 PM – 6:00 PM today. You'll receive a notification once they're on the way."
    ]
  }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TenantChatSheet = ({ open, onOpenChange }: Props) => (
  <Sheet open={open} onOpenChange={onOpenChange} className="w-185.75">
    {/* Header */}
    <Dialog.Title className="px-6 pt-8 pb-4 flex items-center gap-3">
      <div className="flex-1 flex items-center gap-3">
        <div className="p-2 bg-brand-primary-red-50 rounded-lg">
          <MessageCircle className="size-5 text-brand-primary-red-600-d" />
        </div>
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
          Tenant Chat
        </span>
      </div>
      <SheetClose />
    </Dialog.Title>

    {/* Messages */}
    <div className="flex-1 px-6 py-6 border-t border-b border-brand-Text-100 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      <ChatDateDivider label="Mon Feb 19" />
      <ChatMessageList messages={messages} />
    </div>

    {/* Input */}
    <ChatInput />
  </Sheet>
);

export default TenantChatSheet;
