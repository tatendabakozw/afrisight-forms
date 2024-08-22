import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export const useDisclosure = () => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return { open, onOpen, onClose };
}

export default function Modal(props: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}) {
    return (
        <Dialog.Root
            open={props.open}
            onOpenChange={(open) => !open && props.onClose()}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-zinc-900/40 backdrop-blur z-40" />
                <Dialog.Content className={cn("fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] overflow-y-auto max-w-[512px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[24px] z-50", props.className)}>
                    <div className="w-full">
                        {props.title && <Dialog.Title style={{ fontSize: `var(--heading-4)` }} className="font-bold tracking-tight">{props.title}</Dialog.Title>}
                        {props.description && (
                            <Dialog.Description className="mt-2">{props.description}</Dialog.Description>
                        )}
                        <Dialog.Close>
                            <button className="absolute top-4 right-4 p-2 rounded-full bg-zinc-50 hover:bg-zinc-400/30 text-zinc-500" onClick={props.onClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </Dialog.Close>
                    </div>
                    <div className="w-full h-[0.5px] bg-zinc-400/30 mb-6" />
                    {props.children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
