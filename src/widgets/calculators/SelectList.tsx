import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";

type SelectItem = number;

interface SelectListProps {
    className?: string;
    onSelectClick?: () => void;
    onSelectItemClick: (item: SelectItem) => void;
    items: string[] | number[];
    selectedItem: number | string;
    isOpenSelect?: boolean;
}

export const SelectList: React.FC<SelectListProps> = props => {
    const { className, onSelectClick, onSelectItemClick, items, selectedItem, isOpenSelect = false } = props;
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(isOpenSelect);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false); // Закрываем селект
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
        if (onSelectClick) {
            onSelectClick();
        }
    };

    if (!items || !items.length) return null;

    return (
        <div ref={selectRef} className={cn("rounded p-[4px] border border-black relative flex items-center", [className])}>
            <ArrowIcon className="absolute top-[50%] right-[5px] translate-y-[-50%] pointer-events-none" />
            <div onClick={handleSelectClick} className="cursor-pointer truncate pe-[10px] w-full">
                {selectedItem}
            </div>
            <div
                className={cn(
                    "absolute max-h-[300px] top-[40px] right-0 left-0 overflow-y-auto z-[1001] border border-black rounded",
                    { "opacity-0 hidden": !isOpen },
                    ["bg-[#f7f7f7]"]
                )}>
                {items.map((el: any, i) => {
                    return (
                        <div
                            onClick={() => {
                                onSelectItemClick(el);
                                setIsOpen(false); // Закрываем селект после выбора элемента
                            }}
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
