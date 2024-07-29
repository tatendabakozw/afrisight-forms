import { ACTIVE_LINK_COLOR, INACTIVE_LINK_COLOR } from "@/lib/constants";
import { nav_items } from "@/lib/data";
import { Bars3BottomRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center py-4 border border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4">
        <p>LOGO</p>
        <div className="md:flex hidden space-x-4 flex-row items-center">
          {nav_items.map((item) => (
            <Link
              href={item.location}
              key={item.id}
              className={`${
                item.location === router.pathname
                  ? ACTIVE_LINK_COLOR
                  : INACTIVE_LINK_COLOR
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <p className="md:flex hidden">CTA</p>
        <div onClick={() => setNavOpen(!navOpen)} className=" md:hidden flex">
          <Bars3BottomRightIcon height={20} width={20} />
        </div>
      </div>
      {navOpen && (
        <div className="md:hidden flex space-y-4 flex-col items-center">
          {nav_items.map((item) => (
            <Link
              href={item.location}
              key={item.id}
              className={`${
                item.location === router.pathname
                  ? ACTIVE_LINK_COLOR
                  : INACTIVE_LINK_COLOR
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
