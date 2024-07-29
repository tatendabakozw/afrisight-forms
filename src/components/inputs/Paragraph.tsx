import React, { useState } from "react";

type Props = {};

function Paragraph({}: Props) {
  const [value, setValue] = useState("");
  return (
    <textarea
      rows={5}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Question"
      className="bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl flex-1"
    />
  );
}

export default Paragraph;
