import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Input } from "../ui/Input";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

function DatePicker({ value, setValue }: Props) {
  return (
    <div className="border border-zinc-300/50 bg-zinc-100 flex items-center flex-row rounded-lg gap-2 p-2">
      <CalendarDateRangeIcon height={24} width={24} />
      <p className="text-xs">Pick a date</p>
    </div>
  );
}

export default DatePicker;
