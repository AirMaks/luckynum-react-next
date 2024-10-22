"use client";

import { useState } from "react";
import cn from "classnames";

const CopyToClipboardButton = ({ textToCopy, ariaLabel }: any) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
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
            <button onClick={handleCopyClick} aria-label={ariaLabel} aria-pressed={isCopied}>
                {textToCopy}
            </button>
        </div>
    );
};

export default CopyToClipboardButton;
