import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Option } from "@/utils/types";

type Props = {
  value: string;
  setValue: (value: string) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
};

const MultipleChoice = ({ options, setOptions }: Props) => {
  const [newOptionName, setNewOptionName] = useState("");

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      setOptions([
        ...options,
        { name: newOptionName, id: `op${options.length + 1}` },
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

      {options.map((option, index) => (
        <div key={option.id} className="flex flex-row items-center gap-2 py-2">
          <div className="h-4 w-4 border-2 border-zinc-400/50 rounded-full" />
          <Input
            type="text"
            value={option.name}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full text-zinc-700 bg-transparent border-b border-dashed border-zinc-400/50 focus:outline-none"
          />
          <button
            onClick={() => handleDeleteOption(index)}
            className="bg-red-500 text-white p-1 rounded-full text-xs font-semibold"
          >
            <XMarkIcon height={12} width={12} />
          </button>
        </div>
      ))}
      <div className="flex flex-row gap-2 mt-2 border-t border-zinc-400/30 pt-4">
        <Input
          type="text"
          placeholder="Enter new option"
          value={newOptionName}
          onChange={(e) => setNewOptionName(e.target.value)}
          className="bg-zinc-100 border w-full ml-6 border-zinc-200/50 py-2 px-4 rounded-xl"
        />
        <button
          onClick={handleAddOption}
          className="bg-blue-600 flex-shrink-0 text-white p-2 rounded-full text-xs font-semibold"
        >
          <PlusIcon height={24} width={24} />
        </button>
      </div>
    </div>
  );
};

export default MultipleChoice;
