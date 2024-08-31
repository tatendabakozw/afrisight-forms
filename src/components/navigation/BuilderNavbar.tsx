import { useAuth } from "@/context/AuthContext";
import { saveItem, useForm } from "@/context/FormContext";
import { getMessage } from "@/helpers/getMessage";
import { db } from "@/lib/firebase";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { GearIcon, Pencil1Icon, PlayIcon } from "@radix-ui/react-icons";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import crypto from "crypto";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { axiosInstance, FORM_ROUTES } from "@/utils/apiUrl";


export default function BuilderNavbar(props: {
    title: string;
    description: string;
    openSettingsModal: () => void;
    openPreviewModal: () => void;
}) {
    const router = useRouter();
    const { id } = router.query
    const { sections, formName, formDescription } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { logout, user } = useAuth();

    console.log({ sections })

    useEffect(() => {
        // if (success) router.push("/forms");
    }, [success])

    const onSaveToFirebase = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(FORM_ROUTES.UPDATE(id as string), { sections: JSON.stringify(sections) })
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            console.error(getMessage(error));
            setError(getMessage(error));
            setLoading(false);
        }
    }
    return (
        <nav className="sticky top-0 w-full z-20 bg-white border-b border-zinc-400/10">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <div className="flex flex-1 space-x-8">
                    <Link href={"/forms"} className="w-[32px] h-[32px] rounded bg-zinc-200" />
                    <div className="flex gap-2 w-fit items-center">
                        <p className={cn(!props.title && "italic text-zinc-600", props.title && "font-bold")}>
                            {props.title || "Form title placeholder"}
                        </p>
                        <button onClick={props.openSettingsModal}>
                            <Pencil1Icon className="w-5 h-5" />
                        </button>
                    </div>

                </div>
                <div className="flex justify-end gap-8">
                    <div className="flex gap-2 items-center">
                        <button onClick={props.openSettingsModal} className="h-[36px] w-[36px] rounded-xl bg-zinc-100 transition-all hover:bg-zinc-200 flex items-center justify-center">
                            <GearIcon className="h-5 w-5" />
                        </button>
                        <button onClick={props.openPreviewModal} className="h-[36px] w-[36px] rounded-xl bg-zinc-100 transition-all hover:bg-zinc-200 flex items-center justify-center">
                            <PlayIcon className="h-5 w-5" />
                        </button>
                        <button className="h-[36px] px-4 rounded-xl bg-zinc-100 transition-all hover:bg-zinc-200 flex items-center justify-center">
                            Invite
                        </button>
                        <button onClick={onSaveToFirebase} className="h-[36px] px-4 font-semibold rounded-xl bg-blue-600 text-white flex items-center justify-center">
                            {loading ? <Spinner /> : "Publish"}
                        </button>
                    </div>
                    <button
                        className="transition-all cursor-pointer duration-100 text-zinc-700 bg-zinc-100 p-2 rounded-full"
                        onClick={logout}
                    >
                        <ArrowRightEndOnRectangleIcon height={24} width={24} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

const Spinner = () => {
    return (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
    )
}