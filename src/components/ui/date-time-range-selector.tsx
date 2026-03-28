"use client";

import * as React from "react";
import moment from "moment";

import {
  BaseSelectorProps,
  CalendarPanel,
  DateTimeRangeValue,
  SelectorContent,
  SelectorRoot,
  TimeGrid,
  TimeRangeValue,
  combineDateAndTime,
  extractTimeFromDate,
  formatDateTimeRangeLabel,
  formatTimeValue
} from "./date-selector.shared";

interface Props extends BaseSelectorProps {
  value?: DateTimeRangeValue;
  setValue?: (value: DateTimeRangeValue) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  minuteStep?: number;
}

const DateTimeRangeSelector = ({
  value,
  setValue,
  disabledDates,
  minDate,
  maxDate,
  minuteStep = 1,
  ...rest
}: Props) => {
  const [dateRange, setDateRange] = React.useState({
    startDate: value?.startDateTime ?? null,
    endDate: value?.endDateTime ?? null
  });
  const [timeRange, setTimeRange] = React.useState<TimeRangeValue>({
    startTime: extractTimeFromDate(value?.startDateTime),
    endTime: extractTimeFromDate(value?.endDateTime)
  });
  const [activeField, setActiveField] = React.useState<"start" | "end">("start");

  React.useEffect(() => {
    setDateRange({
      startDate: value?.startDateTime ?? null,
      endDate: value?.endDateTime ?? null
    });
    setTimeRange({
      startTime: extractTimeFromDate(value?.startDateTime),
      endTime: extractTimeFromDate(value?.endDateTime)
    });
  }, [value?.startDateTime, value?.endDateTime]);

  const commitValue = (
    nextDateRange: typeof dateRange,
    nextTimeRange: TimeRangeValue
  ) => {
    const nextValue: DateTimeRangeValue = {
      startDateTime:
        nextDateRange.startDate && nextTimeRange.startTime
          ? combineDateAndTime(nextDateRange.startDate, nextTimeRange.startTime)
          : null,
      endDateTime:
        nextDateRange.endDate && nextTimeRange.endTime
          ? combineDateAndTime(nextDateRange.endDate, nextTimeRange.endTime)
          : null
    };

    setValue?.(nextValue);

    if (nextValue.startDateTime && nextValue.endDateTime) {
      rest.onOpenChange?.(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    let nextDateRange = dateRange;

    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      nextDateRange = { startDate: date, endDate: null };
    } else if (moment(date).isBefore(dateRange.startDate, "day")) {
      nextDateRange = { startDate: date, endDate: null };
    } else {
      nextDateRange = { startDate: dateRange.startDate, endDate: date };
    }

    setDateRange(nextDateRange);
    commitValue(nextDateRange, timeRange);
  };

  const handleTimeSelect = (time: string) => {
    const nextTimeRange =
      activeField === "start"
        ? { ...timeRange, startTime: time }
        : { ...timeRange, endTime: time };

    setTimeRange(nextTimeRange);
    commitValue(dateRange, nextTimeRange);
    if (activeField === "start") setActiveField("end");
  };

  return (
    <SelectorRoot
      {...rest}
      triggerLabel={formatDateTimeRangeLabel({
        startDateTime:
          dateRange.startDate && timeRange.startTime
            ? combineDateAndTime(dateRange.startDate, timeRange.startTime)
            : null,
        endDateTime:
          dateRange.endDate && timeRange.endTime
            ? combineDateAndTime(dateRange.endDate, timeRange.endTime)
            : null
      })}
    >
      <SelectorContent className="w-[340px]">
        <CalendarPanel
          rangeStart={dateRange.startDate}
          rangeEnd={dateRange.endDate}
          onSelectDate={handleDateSelect}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          initialViewDate={dateRange.startDate}
        />

        <div className="mt-4 border-t border-border-primary pt-4">
          <div className="mb-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveField("start")}
              className={cnField(activeField === "start")}
            >
              Start:{" "}
              {timeRange.startTime ? formatTimeValue(timeRange.startTime) : "--:--"}
            </button>
            <button
              type="button"
              onClick={() => setActiveField("end")}
              className={cnField(activeField === "end")}
            >
              End: {timeRange.endTime ? formatTimeValue(timeRange.endTime) : "--:--"}
            </button>
          </div>

          <div className="mb-3 text-sm font-medium text-text-primary">
            Select {activeField === "start" ? "Start" : "End"} Time
          </div>

          <TimeGrid
            selectedValue={
              activeField === "start" ? timeRange.startTime : timeRange.endTime
            }
            minuteStep={minuteStep}
            onSelect={handleTimeSelect}
          />
        </div>
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

export default DateTimeRangeSelector;
