"use client";

import * as React from "react";
import moment from "moment";

import {
  BaseSelectorProps,
  SelectorContent,
  SelectorRoot,
  TimeGrid,
  TimeRangeValue,
  formatTimeRangeLabel,
  formatTimeValue
} from "./date-selector.shared";

interface Props extends BaseSelectorProps {
  value?: TimeRangeValue;
  setValue?: (value: TimeRangeValue) => void;
  minuteStep?: number;
}

const TimeRangeSelector = ({
  value,
  setValue,
  minuteStep = 1,
  ...rest
}: Props) => {
  const [activeField, setActiveField] = React.useState<"start" | "end">("start");
  const [range, setRange] = React.useState<TimeRangeValue>({
    startTime: value?.startTime ?? null,
    endTime: value?.endTime ?? null
  });

  React.useEffect(() => {
    setRange({
      startTime: value?.startTime ?? null,
      endTime: value?.endTime ?? null
    });
  }, [value?.startTime, value?.endTime]);

  const selectedValue = activeField === "start" ? range.startTime : range.endTime;

  const handleTimeSelect = (time: string) => {
    let nextRange: TimeRangeValue =
      activeField === "start"
        ? { ...range, startTime: time }
        : { ...range, endTime: time };

    if (
      nextRange.startTime &&
      nextRange.endTime &&
      moment(nextRange.endTime, "HH:mm").isBefore(
        moment(nextRange.startTime, "HH:mm")
      )
    ) {
      nextRange =
        activeField === "start"
          ? { startTime: time, endTime: null }
          : { startTime: time, endTime: time };
    }

    setRange(nextRange);
    setValue?.(nextRange);

    if (activeField === "start") {
      setActiveField("end");
      return;
    }

    if (nextRange.startTime && nextRange.endTime) {
      rest.onOpenChange?.(false);
    }
  };

  return (
    <SelectorRoot {...rest} triggerLabel={formatTimeRangeLabel(range)}>
      <SelectorContent className="w-[320px]">
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveField("start")}
            className={cnField(activeField === "start")}
          >
            Start: {range.startTime ? formatTimeValue(range.startTime) : "--:--"}
          </button>
          <button
            type="button"
            onClick={() => setActiveField("end")}
            className={cnField(activeField === "end")}
          >
            End: {range.endTime ? formatTimeValue(range.endTime) : "--:--"}
          </button>
        </div>

        <div className="mb-3 text-sm font-medium text-text-primary">
          Select {activeField === "start" ? "Start" : "End"} Time
        </div>

        <TimeGrid
          selectedValue={selectedValue}
          minuteStep={minuteStep}
          onSelect={handleTimeSelect}
        />
      </SelectorContent>
    </SelectorRoot>
  );
};

const cnField = (active: boolean) =>
  [
    "rounded-md text-sm font-medium transition-colors",
    "px-3 py-2",
    active
      ? "bg-primary text-safed"
      : "bg-background-secondary text-text-primary hover:bg-background-secondary/80"
  ].join(" ");

export default TimeRangeSelector;
