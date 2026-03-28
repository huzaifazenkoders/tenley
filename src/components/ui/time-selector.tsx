"use client";

import * as React from "react";

import {
  BaseSelectorProps,
  SelectorContent,
  SelectorRoot,
  TimeGrid,
  TimeValue,
  formatTimeValue
} from "./date-selector.shared";

interface Props extends BaseSelectorProps {
  value?: TimeValue | null;
  setValue?: (value: TimeValue) => void;
  minuteStep?: number;
}

const TimeSelector = ({ value, setValue, minuteStep = 1, ...rest }: Props) => {
  return (
    <SelectorRoot
      {...rest}
      triggerLabel={value ? formatTimeValue(value) : "Select Time"}
    >
      <SelectorContent className="w-[320px] px-0">
        <TimeGrid
          selectedValue={value}
          minuteStep={minuteStep}
          onSelect={(time) => {
            setValue?.(time);
            rest.onOpenChange?.(false);
          }}
        />
      </SelectorContent>
    </SelectorRoot>
  );
};

export default TimeSelector;
