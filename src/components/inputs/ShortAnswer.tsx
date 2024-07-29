import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

function ShortAnswer({ value, setValue }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Question"
      className="bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl flex-1"
    />
  );
}

export default ShortAnswer;
