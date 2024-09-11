import cn from "classnames";

export const SummaryItem = ({ text, value, className }: { text: string; value: string; className?: string }) => {
    return (
        <div className="mb-[10px] max-sm:mb-[5px] text-[20px] max-sm:text-[16px] flex justify-between flex-wrap">
            <div className={cn("inline-block font-bold me-[20px]", [[className]])}>{text}</div>
            <span>{value}</span>
        </div>
    );
};
