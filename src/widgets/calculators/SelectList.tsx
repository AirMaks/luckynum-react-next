import React, { useState, useEffect, useRef, useId } from "react";
import cn from "classnames";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";

interface SelectListProps {
    className?: string;
    onSelectClick?: () => void;
    onSelectItemClick: (item: any) => void;
    items: string[] | number[];
    selectedItem: number | string;
    isOpenSelect?: boolean;
    ariaDescribedby?: string;
}

export const SelectList: React.FC<SelectListProps> = props => {
    const { className, onSelectClick, onSelectItemClick, items, selectedItem, isOpenSelect = false, ariaDescribedby } = props;
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(isOpenSelect);
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Индекс выделенного элемента

    const selectId = useId(); // Генерируем уникальный ID для select
    const labelId = `${selectId}-label`; // Генерируем уникальный ID для label
    const listboxId = `${selectId}-listbox`; // Генерируем уникальный ID для listbox

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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
        }

        if (isOpen) {
            if (e.key === "ArrowDown") {
                setHighlightedIndex(prevIndex => (prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex));
            } else if (e.key === "ArrowUp") {
                setHighlightedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
            } else if (e.key === "Enter" && highlightedIndex >= 0) {
                onSelectItemClick(items[highlightedIndex]);
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [isOpen]);

    if (!items || !items.length) return null;

    return (
        <>
            <div id={`${selectId}-description`} className="sr-only">
                Выберите элемент из списка
            </div>

            <div
                ref={selectRef}
                className={cn("rounded p-[4px] border border-gray-700 relative flex items-center", [className])}
                aria-haspopup="listbox"
                role="combobox"
                aria-controls={listboxId}
                aria-expanded={isOpen}
                aria-labelledby={labelId}
                aria-describedby={`${selectId}-description`} // Ссылка на описание
            >
                <ArrowIcon className="absolute top-[50%] right-[5px] translate-y-[-50%] pointer-events-none" />
                <div
                    onClick={handleSelectClick}
                    className="cursor-pointer truncate pe-[10px] w-full"
                    id={labelId}
                    tabIndex={0} // Позволяет фокусироваться на элементе
                    role="button"
                    onKeyDown={handleKeyDown}>
                    {selectedItem}
                </div>
                <div
                    id={listboxId}
                    className={cn(
                        "absolute max-h-[300px] top-[40px] right-0 left-0 overflow-y-auto z-[1001] border border-gray-700 rounded",
                        { "opacity-0 hidden": !isOpen },
                        ["bg-[#f5f5f7]"]
                    )}
                    role="listbox"
                    aria-labelledby={labelId}>
                    {items.map((el: any, i) => (
                        <div
                            onClick={() => {
                                onSelectItemClick(el);
                                setIsOpen(false);
                            }}
                            className={cn("p-[4px] cursor-pointer", { "bg-[#d5e3fb]": el === selectedItem || i === highlightedIndex })}
                            key={i}
                            role="option"
                            aria-selected={el === selectedItem}>
                            {el}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
