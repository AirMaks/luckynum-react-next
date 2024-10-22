import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";

type SelectItem = number;

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
        setHighlightedIndex(-1); // Сбросить индекс при закрытии
    }, [isOpen]);

    if (!items || !items.length) return null;

    return (
        <div
            aria-describedby={ariaDescribedby}
            ref={selectRef}
            className={cn("rounded p-[4px] border border-gray-700 relative flex items-center", [className])}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby="select-label">
            <ArrowIcon className="absolute top-[50%] right-[5px] translate-y-[-50%] pointer-events-none" />
            <div
                onClick={handleSelectClick}
                className="cursor-pointer truncate pe-[10px] w-full"
                id="select-label"
                tabIndex={0} // Позволяет фокусироваться на элементе
                role="button" // Указываем, что это кнопка
                aria-controls="select-listbox" // Связываем с выпадающим списком
                onKeyDown={handleKeyDown}>
                {selectedItem}
            </div>
            <div
                id="select-listbox"
                className={cn(
                    "absolute max-h-[300px] top-[40px] right-0 left-0 overflow-y-auto z-[1001] border border-gray-700 rounded",
                    { "opacity-0 hidden": !isOpen },
                    ["bg-[#f5f5f7]"]
                )}
                role="listbox" // Указываем, что это список
                aria-labelledby="select-label">
                {items.map((el: any, i) => (
                    <div
                        onClick={() => {
                            onSelectItemClick(el);
                            setIsOpen(false); // Закрываем селект после выбора элемента
                        }}
                        className={cn("p-[4px] cursor-pointer", { "bg-[#d5e3fb]": el === selectedItem || i === highlightedIndex })}
                        key={i}
                        role="option" // Указываем, что это элемент списка
                        aria-selected={el === selectedItem} // Отмечаем выбранный элемент
                    >
                        {el}
                    </div>
                ))}
            </div>
        </div>
    );
};
