import React from "react";
import { Input } from "../ui/Input";

type Props = {
  label?: string;
  placeholder: string;
  value: string | number;
  setValue: (e: any) => void;
  type?: "password" | "number" | "text";
};

function PrimaryInput(props: Props) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {props.label && (
        <p className="text-zinc-600 font-mdeium text-sm">{props.label}</p>
      )}
      <Input
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
}

export default PrimaryInput;
