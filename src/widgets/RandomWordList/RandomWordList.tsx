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
import { FormFieldWrapper } from "widgets/calculators/FormFieldWrapper";

const RandomWordList = () => {
    const [randomWord, setRandomWord] = useState<any>("");
    const [time, setTime] = useState<any>(1);
    const [isExclude, setIsExclude] = useState(false);
    const [animation, setAnimation] = useState(false);
    const refTime = useRef(null);
    const [textareaValue, setTextareaValue] = useState("");
    const src = useSelector(getAnimationSrc);
    const onClick = () => {
        const word: any = getRandomWord(textareaValue, isExclude);
        if (!Array.isArray(word) && time !== "0" && time !== 0 && String(time).trim() !== "") {
            setAnimation(true);
            setTimeout(() => {
                setAnimation(false);
                setRandomWord(word);
            }, time * 1000);
        } else {
            setRandomWord(word);
        }
    };

    const handleTextareaChange = (value: any) => {
        setIsExclude(false);
        setTextareaValue(value);
    };

    const handleChangeTime = (value: string) => {
        setTime(sanitizeSymbols(value));
    };

    return (
        <>
            <div className="px-[10px]">
                <div className={cn("mx-auto mt-[20px] max-sm:mt-[10px] bg-[#f7f7f7] max-w-[530px] rounded p-[20px] max-sm:px-[10px]", {}, [])}>
                    <h1 className="mb-[20px] text-center text-[24px] font-bold max-sm:text-[18px]">Генератор случайных слов</h1>
                    <div className="flex mb-[15px] max-sm:mb-[10px] ">
                        <Button
                            classContainer="w-full me-[10px]"
                            className={cn({ "bg-stone-800 text-white": isExclude }, [
                                "leading-[0] min-h-[45px] max-sm:min-h-[38px] max-sm:m-0 bg-white-500 border border-black rounded text-[18px] max-sm:text-[11px]"
                            ])}
                            border
                            onClick={() => setIsExclude(prev => !prev)}>
                            исключить повторения
                        </Button>
                        <FormFieldWrapper label="Время анимации" htmlFor="time" labelClassName="mb-[2px] text-[12px] max-sm:!text-[10px]">
                            <Input
                                ref={refTime}
                                className={cn(
                                    "w-[100px] min-h-[45px] max-sm:min-h-[38px] !text-[25px] max-sm:!text-[20px] px-[6px] py-[4px] leading-none",
                                    {},
                                    []
                                )}
                                rounded={false}
                                id="time"
                                onChange={handleChangeTime}
                                value={time}
                            />
                        </FormFieldWrapper>
                    </div>
                    <div className="mb-[15px] max-sm:mb-[10px]">
                        <FormFieldWrapper
                            label="Введите слова через запятую или с переносом строк"
                            htmlFor="textarea"
                            labelClassName="mb-[2px] text-[12px] max-sm:!text-[10px]">
                            <Textarea
                                spellcheck={false}
                                id="textarea"
                                className={cn(
                                    "max-sm:text-[14px] block no-underline bg-transparent transition-all w-full outline-none p-[6px] leading-tight border border-black min-h-[58px] max-h-[170px] min-w-full overflow-auto text-left"
                                )}
                                onChange={handleTextareaChange}></Textarea>
                        </FormFieldWrapper>
                    </div>
                    <Button
                        className="leading-[0] min-h-[62px] max-sm:min-h-[48px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded text-[20px] max-sm:text-[16px]"
                        border
                        onClick={onClick}
                        disabled={animation}>
                        Получить случайное слово
                    </Button>
                </div>
            </div>
            <div
                className={cn("text-[46px] max-sm:text-[20px] text-center pt-[30px] flex justify-center max-sm:px-[10px] leading-tight", {
                    "!text-[24px] max-sm:!text-[20px]": Array.isArray(randomWord),
                    "!pt-0": animation
                })}>
                <Image
                    src={src || gif1}
                    className={cn("max-sm:max-h-[180px] object-contain", { hidden: !animation })}
                    alt="animation"
                    loading="lazy"
                />
                {!animation && randomWord}
            </div>
        </>
    );
};

export default RandomWordList;
