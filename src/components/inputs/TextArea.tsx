import React, { useState } from "react";

type Props = {};

const TextArea = (props: Props) => {
  const [clockedArea, setClickedArea] = useState();
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const [headingClicked, setHeadingClicked] = useState(false);
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex heading">Click here to change heading</div>
      <div className="text-zinc-500 text-sm ">
        Click here to change description
      </div>
    </div>
  );
};

export default TextArea;
