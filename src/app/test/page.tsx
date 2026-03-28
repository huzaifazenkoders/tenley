"use client";
import DateRangeSelector from "@/components/ui/date-range-selector";
import DateTimeRangeSelector from "@/components/ui/date-time-range-selector";
import DateTimeSelector from "@/components/ui/date-time-selector";
import DateSelector from "@/components/ui/date-selector";
import Dropdown from "@/components/ui/dropdown";
import OtpInput from "@/components/ui/otp-input";
import PasswordInput from "@/components/ui/password-input";
import PhoneInput from "@/components/ui/phone-input";
import Select from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import TimeRangeSelector from "@/components/ui/time-range-selector";
import TimeSelector from "@/components/ui/time-selector";
import { inputStyles } from "@/styles/ui/inputStyles";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import React from "react";

const page = () => {
  const [selectedRole, setSelectedRole] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>();
  const [selectedDateRange, setSelectedDateRange] = React.useState({
    startDate: null as Date | null,
    endDate: null as Date | null
  });
  const [selectedTimeRange, setSelectedTimeRange] = React.useState({
    startTime: null as string | null,
    endTime: null as string | null
  });
  const [selectedDateTimeRange, setSelectedDateTimeRange] = React.useState({
    startDateTime: null as Date | null,
    endDateTime: null as Date | null
  });

  const roleOptions = [
    { value: "designer", label: "Designer" },
    { value: "developer", label: "Developer" },
    { value: "manager", label: "Manager" }
  ];

  const actionOptions = [
    { value: "edit", label: "Edit profile" },
    { value: "duplicate", label: "Duplicate item" },
    { value: "archive", label: "Archive item" }
  ];

  return (
    <div className="flex center w-screen px-4 py-15">
      <div className="flex w-full max-w-[560px] flex-col gap-10">
        <TextInput label="Hello" required />
        <PasswordInput label="Hello" />
        <Select
          label="Select Test"
          placeholder="Choose a role"
          value={selectedRole}
          setValue={setSelectedRole}
          options={roleOptions}
        />
        <p className="text-sm text-text-secondary">
          Selected role: {selectedRole || "Nothing selected"}
        </p>
        <Dropdown
          label="Dropdown Test"
          items={actionOptions.map((item) => ({
            ...item,
            onClick: () => alert(`Clicked ${item.label}`)
          }))}
        >
          <button
            type="button"
            className={cn(
              inputStyles,
              "flex items-center justify-between gap-3 text-left"
            )}
          >
            <span>Open Dropdown</span>
            <ChevronDown className="size-4 text-text-secondary" />
          </button>
        </Dropdown>
        <DateSelector value={selectedDate} setValue={setSelectedDate} />
        <p className="text-sm text-text-secondary">
          Date:{" "}
          {selectedDate ? moment(selectedDate).format("DD MMM YYYY") : "Nothing selected"}
        </p>
        <TimeSelector value={selectedTime} setValue={setSelectedTime} />
        <p className="text-sm text-text-secondary">
          Time: {selectedTime ? moment(selectedTime, "HH:mm").format("hh:mm A") : "Nothing selected"}
        </p>
        <DateTimeSelector value={selectedDateTime} setValue={setSelectedDateTime} />
        <p className="text-sm text-text-secondary">
          Date & time:{" "}
          {selectedDateTime
            ? moment(selectedDateTime).format("DD MMM YYYY, hh:mm A")
            : "Nothing selected"}
        </p>
        <DateRangeSelector
          value={selectedDateRange}
          setValue={setSelectedDateRange}
        />
        <p className="text-sm text-text-secondary">
          Date range:{" "}
          {selectedDateRange.startDate
            ? `${moment(selectedDateRange.startDate).format("DD MMM YYYY")} - ${
                selectedDateRange.endDate
                  ? moment(selectedDateRange.endDate).format("DD MMM YYYY")
                  : "..."
              }`
            : "Nothing selected"}
        </p>
        <TimeRangeSelector
          value={selectedTimeRange}
          setValue={setSelectedTimeRange}
        />
        <p className="text-sm text-text-secondary">
          Time range:{" "}
          {selectedTimeRange.startTime
            ? `${moment(selectedTimeRange.startTime, "HH:mm").format(
                "hh:mm A"
              )} - ${
                selectedTimeRange.endTime
                  ? moment(selectedTimeRange.endTime, "HH:mm").format("hh:mm A")
                  : "..."
              }`
            : "Nothing selected"}
        </p>
        <DateTimeRangeSelector
          value={selectedDateTimeRange}
          setValue={setSelectedDateTimeRange}
        />
        <p className="text-sm text-text-secondary">
          Date & time range:{" "}
          {selectedDateTimeRange.startDateTime
            ? `${moment(selectedDateTimeRange.startDateTime).format(
                "DD MMM YYYY, hh:mm A"
              )} - ${
                selectedDateTimeRange.endDateTime
                  ? moment(selectedDateTimeRange.endDateTime).format(
                      "DD MMM YYYY, hh:mm A"
                    )
                  : "..."
              }`
            : "Nothing selected"}
        </p>
        <OtpInput />
        <PhoneInput />
      </div>
    </div>
  );
};

export default page;
