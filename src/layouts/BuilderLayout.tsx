import { ReactNode } from "react";
import Head from "next/head";
import BuilderNavbar from "@/components/navigation/BuilderNavbar";

type Props = {
    children?: ReactNode;
    button?: ReactNode;
    openSettingsModal: () => void;
    title: string;
    description: string;
};

function BuilderLayout({ children, openSettingsModal, title, description }: Props) {
    return (
        <div className="flex flex-col antialiased">
            <Head>
                <title>Build Your Form | Afrisight</title>
            </Head>
            <BuilderNavbar title={title} description={description} openSettingsModal={openSettingsModal} />
            <div className="relative flex flex-col min-h-screen bg-zinc-100 pt-4">
                {children}
            </div>
        </div>
    );
}

export default BuilderLayout;
