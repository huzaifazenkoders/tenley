"use client";

import * as React from "react";

import {
  BaseSelectorProps,
  CalendarPanel,
  SelectorContent,
  SelectorRoot,
  TimeGrid,
  combineDateAndTime,
  extractTimeFromDate,
  formatDateTimeLabel
} from "./date-selector.shared";

interface Props extends BaseSelectorProps {
  value?: Date | null;
  setValue?: (value: Date) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  minuteStep?: number;
}

const DateTimeSelector = ({
  value,
  setValue,
  disabledDates,
  minDate,
  maxDate,
  minuteStep = 1,
  ...rest
}: Props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(value ?? null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(
    extractTimeFromDate(value)
  );

  React.useEffect(() => {
    setSelectedDate(value ?? null);
    setSelectedTime(extractTimeFromDate(value));
  }, [value]);

  const commitIfReady = (nextDate: Date | null, nextTime: string | null) => {
    if (!nextDate || !nextTime) return;

    setValue?.(combineDateAndTime(nextDate, nextTime));
    rest.onOpenChange?.(false);
  };

  return (
    <SelectorRoot {...rest} triggerLabel={formatDateTimeLabel(value)}>
      <SelectorContent className="w-[340px]">
        <CalendarPanel
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            commitIfReady(date, selectedTime);
          }}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          initialViewDate={selectedDate}
        />

        <div className="mt-4 border-t border-border-primary pt-4">
          <p className="mb-3 text-sm font-medium text-text-primary">Select Time</p>
          <TimeGrid
            selectedValue={selectedTime}
            minuteStep={minuteStep}
            onSelect={(time) => {
              setSelectedTime(time);
              commitIfReady(selectedDate, time);
            }}
          />
        </div>
      </SelectorContent>
    </SelectorRoot>
  );
};

export default DateTimeSelector;
