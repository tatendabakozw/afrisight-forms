import React, { useId } from "react";
import { Input } from "../ui/Input";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

function ShortAnswer({ value, setValue }: Props) {
  const id = useId();
  return (

    <Input
      type="text"
      name={id}
      disabled
      placeholder="Enter your answer"
      className="cursor-disabled bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl flex-1"
    />
  );
}

export default ShortAnswer;
// interface ComponentProps<T> {
//   name: string
//   data: T
// }

// type ShortAnswerProps = {
//   value: string
//   setValue: () => void
// }

// export default ShortAnswer;
// const imp = (component: "ShortAnswer" | "Paragraph", props: ComponentProps<ShortAnswerProps>) => {
//   const comp = await import(component)

//   return comp(props)
// }
