import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

export type Option = {
  name: string;
  _id: string;
};

type Props = {
  value: string;
  setValue: (value: string) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
};

const MultipleChoice = ({ value, setValue, options, setOptions }: Props) => {
  const [newOptionName, setNewOptionName] = useState("");
  const [questionClicked, setQuestionClicked] = useState(false);

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      setOptions([
        ...options,
        { name: newOptionName, _id: `op${options.length + 1}` },
      ]);
      setNewOptionName("");
    }
  };

  const handleOptionChange = (index: number, newName: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, name: newName } : option
    );
    setOptions(updatedOptions);
  };

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">
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
      {options.map((option, index) => (
        <div key={option._id} className="flex flex-row items-center gap-2 py-2">
          <div className="h-4 w-4 border-2 border-zinc-400/50 rounded-full" />
          <input
            type="text"
            value={option.name}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="text-sm text-zinc-700 bg-transparent border-b border-dashed border-zinc-400/50 focus:outline-none"
          />
          <button
            onClick={() => handleDeleteOption(index)}
            className="bg-red-500 text-white p-1 rounded-full text-xs font-semibold"
          >
            <XMarkIcon height={12} width={12} />
          </button>
        </div>
      ))}
      <div className="flex flex-row gap-2 mt-2">
        <input
          type="text"
          placeholder="Enter new option"
          value={newOptionName}
          onChange={(e) => setNewOptionName(e.target.value)}
          className="bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl"
        />
        <button
          onClick={handleAddOption}
          className="bg-brand-original flex-shrink-0 text-white p-2 rounded-full text-xs font-semibold"
        >
          <PlusIcon height={24} width={24} />
        </button>
      </div>
    </div>
  );
};

export default MultipleChoice;
