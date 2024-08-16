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
            <h1 className="pt-[30px] text-center text-[20px]">{t("Генератор случайных слов из списка")}</h1>
            <div className={cn(cls.Container, {}, [])}>
                <div className="d-flex">
                    <Button
                        classContainer="mr-[10px] w-full"
                        className={cn({ "bg-stone-800 text-white": isExclude }, [
                            "min-h-[50px] bg-white-500 border border-black rounded mr-[10px] text-[18px] leading-[1]"
                        ])}
                        border
                        onClick={() => setIsExclude(prev => !prev)}>
                        {t("исключить повторения")}
                    </Button>

                    <div className={cn(cls.Field, {}, [])}>
                        <label htmlFor="time">{t("время анимации")}</label>
                        <Input
                            ref={refTime}
                            className={cn("w-[100px] min-h-[50px] text[27px] text-right pt-[10px] px-[6px] pb-[4px]", {}, [cls.Input])}
                            rounded={false}
                            id="time"
                            onChange={handleChangeTime}
                            value={time}
                        />
                    </div>
                </div>
                <div className={cn(cls.Field, {}, ["mt-10"])}>
                    {!focus && !textareaValue && (
                        <label htmlFor="textarea">{t("выбрать из списка через запятую (банан, апельсин, персик) или с переносом строк")}</label>
                    )}
                    <Textarea
                        spellcheck={false}
                        id="textarea"
                        className={cn(cls.Textarea, {}, [])}
                        onChange={handleTextareaChange}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}></Textarea>
                </div>

                <Button
                    className={cn(cls.ButtonChoose, {}, [
                        "min-h-[62px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded mt-2"
                    ])}
                    border
                    onClick={onClick}
                    disabled={animation}>
                    {t("Получить случайное слово")}
                </Button>
            </div>
            <div className={cn(cls.Word, { [cls.AllRepeated]: Array.isArray(randomWord) }, ["d-flex justify-content-center"])}>
                <Image src={src || gif1} className={cn("", { hidden: !animation })} alt="animation" priority />
                {!animation && randomWord}
            </div>
        </>
    );
};

export default RandomWordList;
