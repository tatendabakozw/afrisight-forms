import React, { useState } from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const FileUpload = ({ value, setValue }: Props) => {
  const [questionClicked, setQuestionClicked] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
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
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
