import { useForm } from "@/context/FormContext";
import React, { useState } from "react";

type Props = {};

function Navbar({}: Props) {
  const { sections, addSection, updateSection, deleteSection, saveFormAsJSON } =
    useForm();

  console.log("sections in navbar: ", sections);
  return (
    <div className="flex flex-col items-center py-4 border-b fixed z-50 top-0 w-full bg-white border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4">
        <p className="text-lg font-semibold text-zinc-950">Afrisight Forms</p>
        <div className="md:flex hidden space-x-4 flex-row items-center"></div>
        <div className="flex bg-brand-original text-white px-4 p-2 rounded-xl">
          Create Form
        </div>
      </div>
    </div>
  );
}

export default Navbar;
