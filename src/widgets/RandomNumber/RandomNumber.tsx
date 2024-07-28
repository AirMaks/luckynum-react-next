"use client";

import cn from "classnames";
import cls from "./RandomNumber.module.scss";
import { Button } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { useRef, useState } from "react";
import { getRandomNumber } from "helpers/getRandom";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";
import { useSelector } from "react-redux";
import gifOne from "shared/assets/images/1.gif";
import Image from "next/image";

const RandomNumber = ({ animationSrc }: any) => {
    const { t } = useTranslation();
    const [number, setNumber] = useState<any>(0);
    const [fromValue, setFromValue] = useState<any>(1);
    const [toValue, setToValue] = useState<any>(10);
    const [time, setTime] = useState<any>(1);
    const [isExclude, setIsExclude] = useState(false);
    const [animation, setAnimation] = useState(false);
    const refFrom = useRef(null);
    const refTo = useRef(null);
    const refTime = useRef(null);
    const src = useSelector(getAnimationSrc);

    const onClick = () => {
        const num: number | string | boolean = getRandomNumber(fromValue, toValue, isExclude);
        if (num && typeof num === "number" && time !== "0" && time !== 0 && String(time).trim() !== "") {
            setAnimation(true);
            setTimeout(() => {
                setAnimation(false);
                setNumber(num);
            }, time * 1000);
        } else {
            setNumber(num);
        }
    };

    const handleChangeFrom = (value: string) => {
        const sanitized = sanitizeSymbols(value);
        setIsExclude(false);
        setFromValue(sanitized);
    };

    const handleChangeTo = (value: string) => {
        setIsExclude(false);
        setToValue(sanitizeSymbols(value));
    };

    const handleChangeTime = (value: string) => {
        setTime(sanitizeSymbols(value));
    };

    const onExclude = () => {
        setIsExclude(prev => !prev);
    };

    return (
        <>
            <h1 className={cls.heading}>{t("Генератор случайных чисел")}</h1>
            <div className={cn(cls.Container, {}, [])}>
                <Button
                    className={cn(cls.ButtonExclude, { "bg-stone-800 text-white": isExclude }, [
                        "min-h-[42px] bg-white-500 border border-black rounded mb-2"
                    ])}
                    onClick={onExclude}>
                    {t("исключить повторения")}
                </Button>
                <div className={cn("d-flex mt-10", {}, [cls.Inputs])}>
                    <div className={cls.Field}>
                        <label htmlFor="from">{t("от")}</label>
                        <Input ref={refFrom} rounded={false} id="from" value={fromValue} onChange={handleChangeFrom} />
                    </div>
                    <div className={cls.Field}>
                        <label htmlFor="to">{t("до")}</label>
                        <Input ref={refTo} rounded={false} id="to" value={toValue} onChange={handleChangeTo} />
                    </div>
                    <div className={cls.Field}>
                        <label htmlFor="time">{t("время анимации")}</label>
                        <Input ref={refTime} rounded={false} id="time" onChange={handleChangeTime} value={time} />
                    </div>
                </div>
                <Button
                    className={cn(cls.ButtonChoose, {}, [
                        "min-h-[62px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded mt-2"
                    ])}
                    onClick={onClick}
                    disabled={animation}>
                    {t("Получить случайное число")}
                </Button>
            </div>
            <div className={cn(cls.Number, { [cls.AllRepeated]: number && typeof number !== "number" }, ["d-flex justify-content-center"])}>
                {animation ? (
                    <Image src={src || gifOne} className="animation" alt="gif" />
                ) : number && typeof number !== "number" ? (
                    number?.map((el: boolean | string, i: number) => <div key={i}>{el}</div>)
                ) : (
                    number
                )}
            </div>
        </>
    );
};

export default RandomNumber;
