"use client";
import { MegaphoneOff } from "lucide-react";

const BroadCastMessageView = () => {
  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-6 w-full min-h-[calc(100vh-16px)]">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-brand-Text-950-d text-2xl font-bold leading-8">
            Broadcast Message
          </h1>
          <p className="text-brand-Text-500 text-base font-normal leading-5">
            Send alerts or important updates across platform
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-brand-base-white rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col items-center gap-4 text-center">
          <div className="p-3 bg-brand-primary-red-50 rounded-full">
            <MegaphoneOff className="size-8 text-brand-primary-red-600-d" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-brand-Text-950-d text-xl font-semibold leading-6">
              No broadcast message available
            </h2>
            <p className="text-brand-Text-500 text-sm font-normal leading-5">
              Broadcast messages will appear here once they are available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadCastMessageView;
