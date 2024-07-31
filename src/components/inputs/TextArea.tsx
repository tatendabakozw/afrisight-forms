import React, { useState } from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const TextArea = ({ value, setValue }: Props) => {
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const [headingClicked, setHeadingClicked] = useState(false);
  const [description, setDescription] = useState("");

  const enterHeading = () => {
    setHeadingClicked(true);
    setDescriptionClicked(false);
  };
  const enterDescription = () => {
    setHeadingClicked(false);
    setDescriptionClicked(true);
  };

  const saveitems = () => {
    setHeadingClicked(false);
    setDescriptionClicked(false);
  };
  return (
    <div className="flex flex-col space-y-4">
      {headingClicked ? (
        <div className="flex heading" onClick={enterHeading}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-zinc-100 rounded-xl p-2 w-full"
            placeholder="Enter heading"
          />
        </div>
      ) : (
        <div className="flex heading" onClick={enterHeading}>
          {value ? value : "Click here to change heading"}
        </div>
      )}
      {descriptionClicked ? (
        <div className="text-zinc-500 text-sm " onClick={enterDescription}>
          <textarea
            value={description}
            className="bg-zinc-100 rounded-xl p-2 w-full"
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Enter description of the area"
          />
        </div>
      ) : (
        <div className="text-zinc-500 text-sm " onClick={enterDescription}>
          {description ? description : "Click here to change description"}
        </div>
      )}
      {(descriptionClicked || headingClicked) && (
        <div
          onClick={saveitems}
          className="flex self-end bg-brand-original text-white px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer"
        >
          Save
        </div>
      )}
    </div>
  );
};

export default TextArea;
