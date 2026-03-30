"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/../public/assets/notifications/tenley-logo.svg";
import NoData from "@/../public/assets/notifications/no-notifications.svg";
import { TypographyStyles } from "@/styles/common-typography";

const notifications = [
  {
    group: "Today",
    items: [
      {
        title: "Emergency: Pipe Burst in Unit 204",
        time: "1h ago",
        body: "Water leak reported in Oak Tower Apartments. Immediate maintenance required. Tenant reports flooding in bathroom."
      },
      {
        title: "Work Order Completed",
        time: "1h ago",
        body: "Your recent work order for Property #5 has been completed and marked as done. Please review it to ensure everything is in order."
      }
    ]
  },
  {
    group: "Yesterday",
    items: [
      {
        title: "Scheduled Maintenance: Roof Repair",
        time: "2h ago",
        body: "Routine roof maintenance scheduled for Maple Building. Expect minor noise disruptions."
      },
      {
        title: "Tenant Request: Pest Control",
        time: "3h ago",
        body: "Tenant in Unit 310 has reported sightings of pests. Request for pest control services submitted."
      }
    ]
  },
  {
    group: "Feb 16",
    items: [
      {
        title: "Safety Inspection: Fire Alarms",
        time: "4h ago",
        body: "Annual safety inspection scheduled for fire alarms across all units. Compliance is mandatory."
      },
      {
        title: "Work Order Completed",
        time: "1h ago",
        body: "Your recent work order for Property #5 has been completed and marked as done. Please review it to ensure everything is in order."
      }
    ]
  },
  {
    group: "Feb 15",
    items: [
      {
        title: "Emergency: Power Outage",
        time: "5h ago",
        body: "Power outage reported in the East Wing. Electricians dispatched for immediate repair."
      },
      {
        title: "Tenant Complaint: Noise",
        time: "6h ago",
        body: "Tenant in Unit 402 has filed a complaint about excessive noise coming from the neighboring unit."
      }
    ]
  }
];

const NotificationItem = ({
  title,
  time,
  body
}: {
  title: string;
  time: string;
  body: string;
}) => (
  <div className="w-full p-3 bg-brand-base-white rounded-lg shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)] outline outline-1 outline-offset-[-1px] outline-brand-Text-100 flex items-center gap-3">
    <div className="size-12 px-2 py-2.5 bg-brand-primary-red-50 rounded-xl flex flex-col justify-center items-center shrink-0">
      <Image src={Logo} alt="icon" width={28} height={28} />
    </div>
    <div className="flex flex-col gap-1 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-brand-Text-950-d text-base font-semibold leading-5">
          {title}
        </span>
        <span className="text-brand-Text-400 text-sm font-normal leading-5 ml-auto shrink-0">
          {time}
        </span>
      </div>
      <p className="text-brand-Text-500 text-base font-normal leading-5">
        {body}
      </p>
    </div>
  </div>
);

const NotificationsView = () => {
  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-10 w-full">
      <div className="flex-col-2">
        <h1 className={TypographyStyles.title}>Notifications</h1>
        <p className={TypographyStyles.subTitle}>
          Manage all your alerts and updates
        </p>
      </div>
      {true ? (
        <div className="h-full w-full flex-col-10 center text-center">
          <Image src={NoData} width={233} height={200} alt="" />
          <div className="flex-col-2 max-w-100">
            <p className={TypographyStyles.title}>No Notifications Yet</p>
            <p className={TypographyStyles.subTitle}>
              When something important happens, you'll see updates and alerts
              here.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {notifications.map((section) => (
            <div key={section.group} className="flex flex-col gap-4">
              <h2 className="text-brand-base-black text-lg font-medium">
                {section.group}
              </h2>
              <div className="flex flex-col gap-4">
                {section.items.map((item, i) => (
                  <NotificationItem key={i} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsView;
