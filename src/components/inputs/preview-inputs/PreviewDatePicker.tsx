import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

function DatePicker({ value, setValue }: Props) {
  const [questionClicked, setQuestionClicked] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      {questionClicked ? (
        <div className="flex flex-row items-center gap-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Question"
            className="bg-zinc-100 border w-full border-zinc-200/50 py-2 text-sm px-4 rounded-xl gap-4 flex-1"
          />
          <button
            onClick={() => setQuestionClicked(false)}
            className="bg-brand-original flex-shrink-0 text-white p-2 rounded-lg text-sm font-semibold"
          >
            Save
          </button>
        </div>
      ) : (
        <div
          onClick={() => setQuestionClicked(true)}
          className="text-zinc-500 text-sm"
        >
          {value ? value : "Click here to change question"}
        </div>
      )}
      <div className="border border-zinc-300/50 bg-zinc-100 flex items-center flex-row rounded-lg gap-2 p-2">
        <CalendarDateRangeIcon height={24} width={24} />
        <p className="text-xs">Pick a date</p>
      </div>
    </div>
  );
}

export default DatePicker;
