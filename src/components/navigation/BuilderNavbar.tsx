import { useAuth } from "@/context/AuthContext";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { GearIcon, PlayIcon } from "@radix-ui/react-icons";

export default function BuilderNavbar(props: {
    title: string;
    description: string;
    openSettingsModal: () => void;
    openPreviewModal: () => void;
}) {
    const { logout, user } = useAuth();

    return (
        <nav className="sticky top-0 w-full z-20 bg-white border-b border-zinc-400/10">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <div className="w-[32px] h-[32px] rounded bg-zinc-200" />
                <div className="flex flex-1 justify-center items-center">
                    <div className="flex gap-2 w-fit items-center">
                        <p className="font-bold">
                            {props.title}
                        </p>
                        <p className="text-xs h-[20px] inline-flex items-center px-2 rounded bg-zinc-100 font-bold text-zinc-500">
                            DRAFT
                        </p>
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
                        <button className="h-[36px] px-4 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                            Publish
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