"use client";

import { useEffect, useState } from "react";
import { Button } from "shared/ui/Button/Button";
import gifOne from "shared/assets/images/1.gif";
import Image from "next/image";
import cn from "classnames";

const DaNet = () => {
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
        return () => {
            document.body.classList.remove("loading");
        };
    }, [isLoading]);

    const generateAnswer = () => {
        setIsLoading(true);
        setAnswer("");
        setTimeout(() => {
            const answers = ["ДА", "НЕТ", "ПОКА НЕ ЯСНО"];
            const randomIndex = Math.floor(Math.random() * answers.length);
            setAnswer(answers[randomIndex]);
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div>
            <div className="px-[10px] max-w-[430px] mx-auto mt-[20px] max-sm:mt-[10px] select-none">
                <div className=" bg-[#f7f7f7] shadow  rounded p-[20px] max-sm:px-[10px]">
                    <h1 className="mb-[20px] text-center text-[24px] font-medium max-sm:text-[17px]">
                        Генератор ответов <br />
                        {`${"Да"} или ${"Нет"}`}
                    </h1>
                    <Button
                        className="leading-[0] min-h-[62px] max-sm:min-h-[48px] bg-white-500 hover:bg-stone-800 hover:text-white max-sm:hover:bg-[#f7f7f7] max-sm:hover:text-inherit border border-black rounded text-[20px] max-sm:text-[16px]"
                        onClick={generateAnswer}
                        disabled={isLoading}>
                        Получить ответ
                    </Button>
                </div>
            </div>
            <div className="!text-[80px] max-sm:!text-[67px] flex justify-center">
                <Image
                    src={gifOne}
                    className={cn("max-sm:max-h-[190px] object-contain hidden", { "!block": isLoading })}
                    alt="кот gif"
                    priority={true}
                />
            </div>
            {!isLoading && answer && (
                <div className="text-[50px] leading-none h-[300px] max-sm:h-[190px] flex justify-center items-center max-sm:text-[30px]">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default DaNet;
