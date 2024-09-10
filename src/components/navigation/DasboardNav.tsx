import { UserIcon } from "@heroicons/react/16/solid";
import React from "react";
import UserDropdowb from "../user-dropdown/UserDropdowb";

function DasboardNav() {
  return (
    <div className="flex flex-row items-center justify-between w-full p-2 border-b border-zinc-200/50">
      <div className="flex-1"></div>
      <UserDropdowb />
    </div>
  );
}

export default DasboardNav;
