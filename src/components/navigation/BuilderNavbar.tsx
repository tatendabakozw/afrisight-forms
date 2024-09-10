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
import { Square3Stack3DIcon } from "@heroicons/react/20/solid";
import Spinner from "../ui/Spinner";


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
            <div className="container mx-auto p-2 flex justify-between items-center">
                <div className="flex flex-1 space-x-8">
                    <Link href={"/forms"} className="font-semibold text-indigo-600 inline-flex items-center gap-2">
                        <span className="w-[32px] h-[32px] rounded-md bg-indigo-100 flex items-center justify-center">
                            <Square3Stack3DIcon className="size-5" />
                        </span>
                        Builder
                    </Link>
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
                        <button onClick={props.openSettingsModal} className="h-[36px] w-[36px] button justify-center">
                            <GearIcon className="h-5 w-5" />
                        </button>
                        <button onClick={props.openPreviewModal} className="h-[36px] w-[36px] button p-0 justify-center">
                            <PlayIcon className="h-6 w-6" />
                        </button>

                        <button onClick={onSaveToFirebase} className="button w-20 justify-center">
                            {loading ? <Spinner color={"text-zinc-600"} size={16} /> : "Publish"}
                        </button>
                    </div>
                    <button
                        className="bg-zinc-400/20 text-zinc-900 p-2 rounded-full flex gap-2 items-center pl-4 font-semibold"
                        onClick={logout}
                    >
                        Sign out
                        <ArrowRightEndOnRectangleIcon height={24} width={24} />
                    </button>
                </div>
            </div>
        </nav>
    )
}
