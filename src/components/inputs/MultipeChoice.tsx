import React, { useState } from "react";

type Props = {};

const MultipeChoice = (props: Props) => {
  const [options, setOptions] = useState([]);
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Question"
        className="bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl flex-1"
      />
    </div>
  );
};

export default MultipeChoice;
