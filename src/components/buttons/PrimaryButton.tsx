import React from "react";

type Props = {
  onClick: () => void;
  text: string;
  loading?: boolean;
  error?: string;
  success?: boolean;
};

const PrimaryButton = (props: Props) => {
  return (
    <button
      onClick={props.loading ? () => console.log("loadiing...") : props.onClick}
      className={`${
        props.error
          ? "bg-red-600 "
          : props.success
          ? "bg-green-600 "
          : "bg-brand-original "
      }  text-white uppercase font-medium rounded-full py-2 px-6`}
    >
      {props.loading ? "Loading..." : props.text}
    </button>
  );
};

export default PrimaryButton;
