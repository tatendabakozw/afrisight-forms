import { ReactNode } from "react";
import Head from "next/head";
import BuilderNavbar from "@/components/navigation/BuilderNavbar";

type Props = {
    children?: ReactNode;
    button?: ReactNode;
    title: string;
    description: string;
    openSettingsModal: () => void;
    openPreviewModal: () => void;
};

function BuilderLayout({ children, openSettingsModal, title, description, openPreviewModal }: Props) {
    return (
        <div className="flex flex-col antialiased">
            <Head>
                <title>Build Your Form | Afrisight</title>
            </Head>
            <BuilderNavbar title={title} description={description} openSettingsModal={openSettingsModal} openPreviewModal={openPreviewModal} />
            <div className="relative flex flex-col min-h-screen bg-zinc-100 pt-4">
                {children}
            </div>
        </div>
    );
}

export default BuilderLayout;
