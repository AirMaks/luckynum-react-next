import { useState } from "react";
import cn from "classnames";

const CopyToClipboardButton = ({ textToCopy }: any) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);

            // Сбросить состояние "скопировано" через некоторое время
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Не удалось скопировать текст: ", err);
        }
    };

    return (
        <div>
            <div
                className={cn(
                    "shadow-sm absolute top-[50%] left-[50%] text-[#fff] translate-y-[-50%] translate-x-[-50%] hidden text-[12px] bg-lime-600 p-[4px] rounded",
                    {
                        "!block": isCopied
                    }
                )}>
                Скопировано!
            </div>
            <button onClick={handleCopyClick}>{textToCopy}</button>
        </div>
    );
};

export default CopyToClipboardButton;
