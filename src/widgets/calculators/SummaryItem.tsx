import cn from "classnames";

export const SummaryItem = ({ text, value, className, ariaLabel }: { text: string; value: string; className?: string; ariaLabel: any }) => {
    return (
        <div className="mb-[10px] max-sm:mb-[5px] text-[20px] max-sm:text-[16px] flex justify-between flex-wrap" aria-label={ariaLabel}>
            <div className={cn("inline-block font-medium me-[20px]", [[className]])}>{text}</div>
            <span>{value}</span>
        </div>
    );
};
