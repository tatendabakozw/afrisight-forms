import React, { useState } from "react";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="flex flex-col items-center py-4 border border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4">
        <p>Afrisight Forms</p>
        <div className="md:flex hidden space-x-4 flex-row items-center"></div>
        <div className="flex bg-brand-original text-white px-4 p-2 rounded-xl">
          Create Form
        </div>
      </div>
    </div>
  );
}

export default Navbar;
