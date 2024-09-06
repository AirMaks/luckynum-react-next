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
import YandexAd from "app/adds";

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

    const handleChangeTime: any = (value: string) => {
        setTime(sanitizeSymbols(value));
    };

    return (
        <>
            <YandexAd className="max-w-[430px] h-[70] mx-auto mt-[20px]" />
            <div className="px-[10px]">
                <div className={cn("mx-auto mt-[20px] max-sm:mt-[20px] bg-[#f7f7f7] max-w-[430px] rounded p-[20px]", {}, [])}>
                    <h1 className="mb-[20px] text-center text-[24px] font-bold max-sm:text-[17px]">{t("Генератор случайных чисел")}</h1>
                    <Button
                        className={cn("", { "bg-stone-800 text-white": isExclude }, [
                            "min-h-[42px] bg-white-500 border border-black rounded text-[18px] max-sm:text-[16px] max-sm:min-h-[37px]"
                        ])}
                        onClick={() => setIsExclude(prev => !prev)}>
                        {t("исключить повторения")}
                    </Button>
                    <div className={cn("flex mt-[10px]", {}, [cls.Inputs])}>
                        <div className={cls.Field}>
                            <label htmlFor="from" className="max-sm:!text-[9px]">
                                {t("от")}
                            </label>
                            <Input
                                ref={refFrom}
                                rounded={false}
                                id="from"
                                value={fromValue}
                                onChange={handleChangeFrom}
                                className="!text-[25px] h-[48px] max-sm:!text-[20px] max-sm:h-[40px]"
                            />
                        </div>
                        <div className={cls.Field}>
                            <label htmlFor="to" className="max-sm:!text-[9px]">
                                {t("до")}
                            </label>
                            <Input
                                ref={refTo}
                                rounded={false}
                                id="to"
                                value={toValue}
                                onChange={handleChangeTo}
                                className="!text-[25px] h-[48px] max-sm:!text-[20px] max-sm:h-[40px]"
                            />
                        </div>
                        <div className={cls.Field}>
                            <label htmlFor="time" className="max-sm:!text-[9px]">
                                {t("время анимации")}
                            </label>
                            <Input
                                ref={refTime}
                                rounded={false}
                                id="time"
                                onChange={handleChangeTime}
                                value={time}
                                className="!text-[25px] h-[48px] max-sm:!text-[20px] max-sm:h-[40px]"
                            />
                        </div>
                    </div>
                    <Button
                        className={cn("", {}, [
                            "min-h-[62px] max-sm:min-h-[50px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded mt-2 text-[20px] max-sm:text-[16px]"
                        ])}
                        onClick={onClick}
                        disabled={animation}>
                        {t("Получить случайное число")}
                    </Button>
                </div>
                <div
                    className={cn(cls.Number, { [cls.AllRepeated]: number && typeof number !== "number", "!mt-0": animation }, [
                        "max-sm:!text-[67px] flex justify-center min-h-[300px]"
                    ])}>
                    <Image src={src || gifOne} className={cn("", { hidden: !animation })} alt="gif" priority />
                    {!animation && (typeof number !== "number" ? number?.map((el: boolean | string, i: number) => <div key={i}>{el}</div>) : number)}
                </div>
            </div>
        </>
    );
};

export default RandomNumber;
