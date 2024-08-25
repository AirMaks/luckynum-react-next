import cn from "classnames";

export const SummaryItem = ({ text, value, className }: { text: string; value: string; className?: string }) => {
    return (
        <div className="mb-[10px] text-[20px] flex justify-between flex-wrap">
            <div className={cn("d-inline-block font-bold me-[20px]", [[className]])}>{text}</div>
            <span>{value}</span>
        </div>
    );
};
