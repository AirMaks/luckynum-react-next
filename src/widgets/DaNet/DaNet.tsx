"use client";

import { useEffect, useState } from "react";
import { Button } from "shared/ui/Button/Button";
import { Three } from "widgets/Three";

const DaNet = () => {
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [stop, setStop] = useState<boolean>(false);

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
        setStop(false);
        setIsLoading(true);
        setTimeout(() => {
            const answers = ["ДА", "НЕТ", "ПОКА НЕ ЯСНО"];
            const randomIndex = Math.floor(Math.random() * answers.length);
            setAnswer(answers[randomIndex]);
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className="">
            <div className="px-[10px] pb-[40px] max-w-[430px] mx-auto mt-[20px] max-sm:mt-[10px] select-none">
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
            <Three answer={answer} loading={isLoading} stop={stop} setStop={setStop} />
        </div>
    );
};

export default DaNet;
