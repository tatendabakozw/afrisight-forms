import DasboardNav from "@/components/navigation/DasboardNav";
import DashboardFooter from "@/components/navigation/DashboardFooter";
import DashboardSidebar from "@/components/navigation/DashboardSidebar";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

function DashboardLayout({ children }: Props) {
  return (
    <div className="flex flex-row min-h-screen h-full flex-1 relative">
      <div className="sidebar h-screen w-1/5 sticky top-0">
        <DashboardSidebar />
      </div>
      <div className="other  min-h-screen flex-1 flex-col">
        <DasboardNav />
        <div className="flex-1 min-h-screen">{children}</div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
