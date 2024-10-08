import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;

  button?: ReactNode;
};

function GeneralLayout({ children }: Props) {
  return (
    <div className="flex flex-col pt-16 antialiased">
      <Head>
        <title>Build Your Form | Afrisight</title>
      </Head>
      <Navbar />
      <div className="relative flex flex-col min-h-screen pt-4">
        {children}
      </div>
    </div>
  );
}

export default GeneralLayout;
