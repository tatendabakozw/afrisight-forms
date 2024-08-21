import React from "react";
import { Textarea } from "../ui/Input";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

function Paragraph({ value, setValue }: Props) {
  return (

    <Textarea
      rows={5}
      placeholder="Enter your answer"
      disabled
      className="bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl flex-1"
    />
  );
}

export default Paragraph;
