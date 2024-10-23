"use client";

import { useEffect, useState } from "react";
import { Button } from "shared/ui/Button/Button";
import gifOne from "shared/assets/images/1.gif";
import Image from "next/image";
import cn from "classnames";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Генератор Да Нет",
          "url": "https://lucky-num.ru/generator-da-net",
          "description": "Генератор Да Нет помогает получить ответ на интересующий вас вопрос.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

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
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div>
                <div className="max-sm:px-[10px] max-w-[430px] mx-auto mt-[20px] max-sm:mt-[10px] select-none">
                    <div className=" bg-[#f5f5f7] shadow  rounded p-[20px] max-sm:px-[10px]">
                        <h1 className="mb-[20px] text-center text-[24px] font-medium max-sm:text-[17px]">
                            Генератор ответов <br />
                            {`${"Да"} или ${"Нет"}`}
                        </h1>
                        <Button
                            className="leading-[0] min-h-[62px] max-sm:min-h-[48px] shadow bg-blue-500 text-white hover:bg-blue-600 max-sm:hover:bg-blue-600 max-sm:hover:text-inherit border-0 rounded text-[20px] max-sm:text-[16px]"
                            onClick={generateAnswer}
                            disabled={isLoading}
                            ariaLabel="Кнопка для получения ответа"
                            ariaDisabled={isLoading}>
                            Получить ответ
                        </Button>
                    </div>
                </div>
                <div className="min-h-[300px] max-sm:min-h-[190px]">
                    <div className="!text-[80px] max-sm:!text-[67px] flex justify-center">
                        <Image
                            src={gifOne}
                            className={cn("max-sm:max-h-[190px] object-contain hidden", { "!block": isLoading })}
                            alt="кот gif"
                            priority={true}
                        />
                    </div>
                    {!isLoading && answer && (
                        <div
                            aria-label={`Ваш ответ: ${answer}`}
                            className="text-[50px] leading-none min-h-[300px] max-sm:min-h-[190px] flex justify-center items-center max-sm:text-[30px]">
                            {answer}
                        </div>
                    )}
                </div>
            </div>
            <p className="mx-auto max-w-[430px] text-justify max-sm:px-[10px]">
                {`Генератор ответов Да Нет — это простой и удобный способ получить случайный ответ на интересующий вас вопрос. А милый котик в виде анимации поднимет вам настроение ${":)"}`}
            </p>
        </>
    );
};

export default DaNet;
