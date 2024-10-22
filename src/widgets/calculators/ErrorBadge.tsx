export const ErrorBadge = ({ text }: any) => {
    return (
        <div aria-label={text} className="absolute top-[-10px] left-[4px] text-[12px] w-max bg-red-400 rounded px-[4px] text-white">
            {text}
        </div>
    );
};
