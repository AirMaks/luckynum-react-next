"use client";

import cn from "classnames";
import cls from "./RandomWordList.module.scss";
import { Button } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { useRef, useState } from "react";
import { getRandomWord } from "helpers/getRandomWord";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { Textarea } from "shared/ui/Textarea/Textarea";
import { useSelector } from "react-redux";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";
import gif1 from "shared/assets/images/1.gif";
import Image from "next/image";
import YandexAd from "app/adds";

const RandomWordList = () => {
    const { t } = useTranslation();
    const [randomWord, setRandomWord] = useState<any>("");
    const [time, setTime] = useState<any>(1);
    const [isExclude, setIsExclude] = useState(false);
    const [focus, setFocus] = useState(false);
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
            <YandexAd className="max-w-[960px] h-[70px] mx-auto mt-[20px] max-sm:px-[10px] max-sm:mt-[0]" />
            <div className="px-[10px]">
                <div className={cn("mx-auto mt-[40px] max-sm:mt-[20px] bg-[#f7f7f7] max-w-[530px] rounded p-[20px]", {}, [])}>
                    <h1 className="mb-[20px] text-center text-[24px] font-bold max-sm:text-[15px]">{t("Генератор случайных слов из списка")}</h1>
                    <div className="flex">
                        <Button
                            classContainer="w-full me-[10px]"
                            className={cn({ "bg-stone-800 text-white": isExclude }, [
                                "min-h-[45px] max-sm:min-h-[38px] max-sm:m-0 bg-white-500 border border-black rounded text-[18px] max-sm:text-[14px] leading-[1]"
                            ])}
                            border
                            onClick={() => setIsExclude(prev => !prev)}>
                            {t("исключить повторения")}
                        </Button>

                        <div className={cn(cls.Field, {}, ["max-sm:w-full"])}>
                            <label htmlFor="time" className="!text-[12px]">
                                {t("время анимации")}
                            </label>
                            <Input
                                ref={refTime}
                                className={cn(
                                    "w-[100px] min-h-[45px] max-sm:min-h-[38px] !text-[25px] max-sm:!text-[20px] pt-[10px] px-[6px] pb-[4px] leading-none",
                                    {},
                                    []
                                )}
                                rounded={false}
                                id="time"
                                onChange={handleChangeTime}
                                value={time}
                            />
                        </div>
                    </div>
                    <div className={cn(cls.Field, {}, ["mt-[10px]"])}>
                        {!focus && !textareaValue && (
                            <label htmlFor="textarea" className="!text-[14px] max-sm:!text-[12px]">
                                {t("введите слова через запятую (банан, апельсин, персик) или с переносом строк")}
                            </label>
                        )}
                        <Textarea
                            spellcheck={false}
                            id="textarea"
                            className={cn(cls.Textarea, {}, ["leading-tight"])}
                            onChange={handleTextareaChange}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}></Textarea>
                    </div>

                    <Button
                        className={cn(cls.ButtonChoose, {}, [
                            "min-h-[62px] max-sm:min-h-[48px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded mt-2 text-[20px] max-sm:text-[16px]"
                        ])}
                        border
                        onClick={onClick}
                        disabled={animation}>
                        {t("Получить случайное слово")}
                    </Button>
                </div>
            </div>
            <div
                className={cn(cls.Word, { [cls.AllRepeated]: Array.isArray(randomWord), "!mt-0": animation }, [
                    "text-[46px] max-sm:text-[27px] mt-[30px] flex justify-center max-sm:px-[10px] leading-tight"
                ])}>
                <Image src={src || gif1} className={cn("", { hidden: !animation })} alt="animation" priority />
                {!animation && randomWord}
            </div>
        </>
    );
};

export default RandomWordList;
