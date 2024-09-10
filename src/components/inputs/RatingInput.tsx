function RatingInput(props: {
    maxValue: number;
}) {
    return (

        <div className="flex space-x-4">
            {new Array(props.maxValue ?? 10).fill(0).map((_, idx) => (
                <p key={`input-${idx}`} className="h-[40px] aspect-square rounded-md border border-zinc-400/30 flex justify-center items-center">
                    {idx}
                </p>
            ))}
        </div>
    );
}

export default RatingInput