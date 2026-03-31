import Image from "next/image";
import { Send } from "lucide-react";
import TextInput from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

export type Message =
  | { type: "received"; sender: string; time: string; bubbles: string[] }
  | { type: "sent"; sender: string; time: string; text: string };

export const ChatDateDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-px bg-brand-Text-100" />
    <span className="text-brand-Text-400 text-xs font-normal leading-4">
      {label}
    </span>
    <div className="flex-1 h-px bg-brand-Text-100" />
  </div>
);

export const ChatMessageList = ({ messages }: { messages: Message[] }) => (
  <>
    {messages.map((msg, i) => {
      if (msg.type === "received") {
        return (
          <div key={i} className="flex items-start gap-2">
            <Image
              src="https://placehold.co/24x24"
              alt="avatar"
              width={24}
              height={24}
              className="rounded-full mt-0.5"
              unoptimized
            />
            <div className="flex flex-col gap-2">
              {msg.bubbles.map((text, j) => (
                <div
                  key={j}
                  className="p-2.5 bg-brand-base-white rounded-tr-lg rounded-bl-lg rounded-br-lg outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex flex-col gap-1.5"
                >
                  <span className="text-brand-Text-950-d text-sm font-normal leading-5">
                    {text}
                  </span>
                  <span className="text-brand-Text-400 text-[10px] font-medium leading-3">
                    {msg.sender}, {msg.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div key={i} className="flex items-start justify-end gap-2">
          <div className="p-2.5 bg-brand-primary-red-500 rounded-tl-lg rounded-bl-lg rounded-br-lg flex flex-col gap-1.5">
            <span className="text-brand-base-white text-sm font-normal leading-5">
              {msg.text}
            </span>
            <span className="text-brand-Text-50 text-[10px] font-medium leading-3 text-right">
              {msg.sender}, {msg.time}
            </span>
          </div>
          <Image
            src="https://placehold.co/24x24"
            alt="avatar"
            width={24}
            height={24}
            className="rounded-full mt-0.5"
            unoptimized
          />
        </div>
      );
    })}
  </>
);

export const ChatInput = () => (
  <div className="p-6">
    <div className="flex items-center gap-2">
      <TextInput
        placeholder="Type your message here..."
        className="rounded-full h-10 px-6"
      />
      <Button size={"icon"} className="size-10">
        <Send className="size-5 text-brand-base-white" />
      </Button>
    </div>
  </div>
);
