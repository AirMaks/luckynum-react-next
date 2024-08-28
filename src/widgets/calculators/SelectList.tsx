import cn from "classnames";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";

export const SelectList = (props: any) => {
    const { className, onSelectClick, onSelectItemClick, items, selectedItem, isOpenSelect } = props;
    if (!items || !items.length) return null;
    return (
        <div className={cn("rounded p-[4px] border border-black relative", [className])}>
            <ArrowIcon className="absolute top-[10px] right-[5px] pointer-events-none" />
            <div onClick={onSelectClick} className="cursor-pointer">
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
                            className={cn("p-[4px] cursor-pointer", { "bg-[#e1e1e1]": el === selectedItem }, [])}
                            key={i}>
                            {el}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
