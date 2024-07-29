import { ACTIVE_LINK_COLOR, INACTIVE_LINK_COLOR } from "@/lib/constants";
import { dashboard_nav } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function DashboardSidebar() {
  const router = useRouter();
  return (
    <div className="border-r border-zinc-300/50 h-full flex flex-col space-y-6 p-8">
      <p>LOGO</p>
      {dashboard_nav.sidebar.map((item) => (
        <Link
          href={item.location}
          key={item.id}
          className={`${
            item.location === router.pathname
              ? ACTIVE_LINK_COLOR
              : INACTIVE_LINK_COLOR
          } flex flex-row items-center space-x-4`}
        >
          <item.Icon height={20} width={20} />
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default DashboardSidebar;
