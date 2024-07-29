import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;

  button?: ReactNode;
};

function GeneralLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="relative flex flex-col min-h-screen">
        <div className="fixed h-10 w-10 bg-blue-600 rounded-full bottom-5 right-5"></div>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default GeneralLayout;
