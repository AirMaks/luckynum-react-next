"use client";

import cn from "classnames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useRef, useState } from "react";
import { getRandomWord } from "helpers/getRandomWord";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { Textarea } from "shared/ui/Textarea/Textarea";
import { useSelector } from "react-redux";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";
import gif1 from "shared/assets/images/1.gif";
import Image from "next/image";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Генератор случайных слов",
          "url": "https://lucky-num.ru/generator-sluchainykh-slov",
          "description": "Генератор случайных слов помогает выбрать случайное слово из списка. Вы можете задать свои слова и исключить повторения.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

const RandomWordList = () => {
    const [randomWord, setRandomWord] = useState<string>("");
    const [time, setTime] = useState<any>(1);
    const [isExclude, setIsExclude] = useState<boolean>(false);
    const [animation, setAnimation] = useState<boolean>(false);
    const refTime = useRef<HTMLInputElement>(null);
    const [textareaValue, setTextareaValue] = useState<string>("");
    const src = useSelector(getAnimationSrc);

    const onClick = () => {
        const word = getRandomWord(textareaValue, isExclude);
        if (!Array.isArray(word) && time !== 0 && String(time).trim() !== "") {
            setAnimation(true);
            setTimeout(() => {
                setAnimation(false);
                setRandomWord(word);
            }, time * 1000);
        } else {
            setRandomWord(word);
        }
    };

    const handleTextareaChange = (value: string) => {
        setIsExclude(false);
        setTextareaValue(value);
    };

    const handleChangeTime = (value: string) => {
        setTime(sanitizeSymbols(value));
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px]">
                <div className="mx-auto mt-[20px] max-sm:mt-[10px] bg-[#f5f5f7] shadow max-w-[530px] rounded p-[20px] max-sm:px-[10px]">
                    <h1 className="mb-[20px] text-center text-[24px] font-medium max-sm:text-[17px]">Генератор случайных слов</h1>
                    <div className="flex mb-[15px] max-sm:mb-[10px]">
                        <Button
                            classContainer="w-full me-[10px]"
                            className={cn({ "bg-stone-800 text-white": isExclude }, [
                                "leading-[1] min-h-[40px] max-sm:min-h-[38px] max-sm:m-0 bg-white-500 border border-gray-700 rounded text-[18px] max-sm:text-[13px]"
                            ])}
                            border
                            onClick={() => setIsExclude(prev => !prev)}
                            ariaPressed={isExclude}
                            ariaLabel="Кнопка для исключения повторений">
                            исключить повторения
                        </Button>
                        <FormFieldWrapper label="Время анимации" htmlFor="time">
                            <Input
                                ref={refTime}
                                className="w-[100px] min-h-[40px] max-sm:min-h-[38px] !text-[20px] max-sm:!text-[16px] px-[6px] py-[4px] leading-none"
                                rounded={false}
                                id="time"
                                onChange={handleChangeTime}
                                value={time}
                                ariaLabel="Время анимации в секундах"
                            />
                        </FormFieldWrapper>
                    </div>
                    <div className="mb-[15px] max-sm:mb-[10px]">
                        <FormFieldWrapper label="Введите слова через запятую или с переносом строк" htmlFor="textarea">
                            <Textarea
                                spellCheck={false}
                                autofocus
                                id="textarea"
                                className="text-[20px] max-sm:text-[16px] block no-underline bg-transparent transition-all w-full outline-none p-[6px] leading-tight border border-gray-700 min-h-[58px] max-h-[170px] min-w-full overflow-auto text-left"
                                onChange={handleTextareaChange}
                                ariaLabel="Текстовое поле для ввода слов через запятую или с переносами строк"
                            />
                        </FormFieldWrapper>
                    </div>
                    <Button
                        className="leading-[0] min-h-[62px] max-sm:min-h-[48px] max-sm:hover:bg-[#f5f5f7] max-sm:hover:text-inherit bg-white-500 hover:bg-stone-800 hover:text-white border border-gray-700 rounded text-[20px] max-sm:text-[16px]"
                        border
                        onClick={onClick}
                        disabled={animation}
                        ariaPressed={animation}
                        ariaLabel="Кнопка, чтобы сгенерировать случайное слово">
                        Получить случайное слово
                    </Button>
                </div>
            </div>
            <div
                className={cn(
                    "min-h-[300px] max-sm:min-h-[180px] text-[46px] max-sm:text-[20px] text-center pt-[30px] flex justify-center max-sm:px-[10px] leading-tight",
                    {
                        "!text-[24px] max-sm:!text-[20px]": Array.isArray(randomWord),
                        "!pt-0": animation
                    }
                )}>
                <Image
                    src={src || gif1}
                    className={cn("max-sm:max-h-[180px] object-contain", { hidden: !animation })}
                    alt="кот gif"
                    priority={true}
                />
                {!animation && (
                    <div className="flex items-center justify-center">
                        <span id="random-word-description" className="sr-only">
                            Ваше случайное слово: {randomWord}
                        </span>
                        <span aria-describedby="random-word-description">{randomWord}</span>
                    </div>
                )}
            </div>
            <p className="mx-auto max-w-[530px] text-justify max-sm:px-[10px]">
                {`Генератор случайных слов — это простой и удобный способ выбрать случайное слово из вашего списка. Введите слова, разделяя их запятыми или размещая каждое слово на новой строке. Чтобы избежать повторяющихся слов, просто нажмите на кнопку "${"Исключить повторения"}". Также вы можете настроить время анимации в секундах, чтобы результат появился с задержкой, добавляя интригу и динамику в процесс выбора.`}
            </p>
        </>
    );
};

export default RandomWordList;
