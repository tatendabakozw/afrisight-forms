import * as SwitchPrimitive from "@radix-ui/react-switch";

export default function Switch(props: { name: string; label?: string }) {
    return (
        <div className="flex items-center">
            {props.label && (
                <label className="pr-[16px]" htmlFor={props.name}>
                    {props.label}
                </label>
            )}
            <SwitchPrimitive.Root
                name={props.name}
                className="w-[42px] h-[25px] bg-zinc-700/30 rounded-full relative data-[state=checked]:bg-black outline-none cursor-default"
                style={{
                    //@ts-ignore
                    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
                }}
            >
                <SwitchPrimitive.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </SwitchPrimitive.Root>
        </div>
    );
}
