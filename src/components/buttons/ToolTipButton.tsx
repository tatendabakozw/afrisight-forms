import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  children: ReactNode;
  text: string;
}

const ToolTipButton = (props: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipButton;
