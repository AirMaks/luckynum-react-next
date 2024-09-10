import cn from "classnames";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";

export const SelectList = (props: any) => {
    const { className, onSelectClick, onSelectItemClick, items, selectedItem, isOpenSelect } = props;
    if (!items || !items.length) return null;
    return (
        <div className={cn("rounded p-[4px] border border-black relative flex items-center", [className])}>
            <ArrowIcon className="absolute top-[50%] right-[5px] translate-y-[-50%] pointer-events-none" />
            <div onClick={onSelectClick} className="cursor-pointer truncate pe-[10px] w-full">
                {selectedItem}
            </div>
            <div
                className={cn(
                    "absolute max-h-[300px] top-[40px] right-0 left-0 overflow-y-auto z-[1001] border border-black rounded",
                    { "opacity-0 hidden": !isOpenSelect },
                    ["bg-[#f7f7f7]"]
                )}>
                {items.map((el: any, i: any) => {
                    return (
                        <div
                            onClick={() => onSelectItemClick(el)}
                            className={cn("p-[4px] cursor-pointer", { "bg-[#d5e3fb]": el === selectedItem }, [])}
                            key={i}>
                            {el}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
