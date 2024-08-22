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

    <Input
      placeholder={props.placeholder}
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}

export default PrimaryInput;
