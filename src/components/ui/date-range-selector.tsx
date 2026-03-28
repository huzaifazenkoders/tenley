"use client";

import * as React from "react";
import moment from "moment";

import {
  BaseSelectorProps,
  CalendarPanel,
  DateRangeValue,
  SelectorContent,
  SelectorRoot,
  formatDateRangeLabel
} from "./date-selector.shared";

interface Props extends BaseSelectorProps {
  value?: DateRangeValue;
  setValue?: (value: DateRangeValue) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

const DateRangeSelector = ({
  value,
  setValue,
  disabledDates,
  minDate,
  maxDate,
  ...rest
}: Props) => {
  const [range, setRange] = React.useState<DateRangeValue>({
    startDate: value?.startDate ?? null,
    endDate: value?.endDate ?? null
  });

  React.useEffect(() => {
    setRange({
      startDate: value?.startDate ?? null,
      endDate: value?.endDate ?? null
    });
  }, [value?.startDate, value?.endDate]);

  const handleSelectDate = (date: Date) => {
    let nextRange: DateRangeValue;

    if (!range.startDate || (range.startDate && range.endDate)) {
      nextRange = { startDate: date, endDate: null };
    } else if (moment(date).isBefore(range.startDate, "day")) {
      nextRange = { startDate: date, endDate: null };
    } else {
      nextRange = { startDate: range.startDate, endDate: date };
    }

    setRange(nextRange);
    setValue?.(nextRange);

    if (nextRange.startDate && nextRange.endDate) {
      rest.onOpenChange?.(false);
    }
  };

  return (
    <SelectorRoot {...rest} triggerLabel={formatDateRangeLabel(range)}>
      <SelectorContent>
        <CalendarPanel
          rangeStart={range.startDate}
          rangeEnd={range.endDate}
          onSelectDate={handleSelectDate}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          initialViewDate={range.startDate}
        />
      </SelectorContent>
    </SelectorRoot>
  );
};

export default DateRangeSelector;
