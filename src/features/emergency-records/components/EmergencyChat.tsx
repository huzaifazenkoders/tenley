import { MessageSquare } from "lucide-react";
import {
  ChatDateDivider,
  ChatInput,
  ChatMessageList,
  Message
} from "./chat-primitives";

const messages: Message[] = [
  {
    type: "received",
    sender: "Arlene",
    time: "3:04 PM",
    bubbles: [
      "Tenant reported heavy water leakage from the bathroom ceiling. Elderly resident. Please prioritize."
    ]
  },
  {
    type: "received",
    sender: "Arlene",
    time: "4:05 PM",
    bubbles: [
      "On the Way.",
      "Diagnosing issue. Looks like burst supply valve behind wall."
    ]
  },
  {
    type: "sent",
    sender: "Jane",
    time: "4:06 PM",
    text: "Is this repairable tonight or do we need replacement parts?"
  },
  {
    type: "received",
    sender: "Arlene",
    time: "4:08 PM",
    bubbles: ["Uploading photos of damaged valve and leak area."]
  }
];

const EmergencyChat = () => (
  <div className="flex-1 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline -outline-offset-1 outline-brand-Text-100 flex flex-col min-h-0">
    <div className="p-6 flex items-center gap-3">
      <div className="p-2 bg-brand-primary-red-50 rounded-lg">
        <MessageSquare className="size-5 text-brand-primary-red-600-d" />
      </div>
      <div className="flex flex-col">
        <span className="text-brand-Text-950-d text-xl font-semibold leading-6">
          Emergency Group Chat
        </span>
        <span className="text-brand-Text-600 text-xs font-normal leading-4">
          3 members
        </span>
      </div>
    </div>

    <div className="flex-1 px-6 py-4 border-t border-b border-brand-Text-100 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      <ChatDateDivider label="Mon Feb 19" />
      <ChatMessageList messages={messages} />
    </div>

    <ChatInput />
  </div>
);

export default EmergencyChat;
