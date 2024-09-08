"use client";

import cn from "classnames";
import cls from "./RandomNumber.module.scss";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useRef, useState } from "react";
import { getRandomNumber } from "helpers/getRandom";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";
import { useSelector } from "react-redux";
import gifOne from "shared/assets/images/1.gif";
import Image from "next/image";

interface RandomNumberProps {
    animationSrc?: string;
}

const RandomNumber = ({ animationSrc }: RandomNumberProps) => {
    const [state, setState] = useState({
        number: 0 as number | string | boolean | Array<string | boolean>,
        fromValue: 1,
        toValue: 10,
        time: 1,
        isExclude: false,
        animation: false
    });

    const refFrom = useRef(null);
    const refTo = useRef(null);
    const refTime = useRef(null);
    const src = useSelector(getAnimationSrc);

    const onClick = () => {
        const num = getRandomNumber(state.fromValue, state.toValue, state.isExclude);
        if ((num || num === 0) && typeof num === "number" && state.time > 0) {
            setState(prevState => ({ ...prevState, animation: true }));
            setTimeout(() => {
                setState(prevState => ({
                    ...prevState,
                    animation: false,
                    number: num
                }));
            }, state.time * 1000);
        } else {
            setState(prevState => ({ ...prevState, number: num }));
        }
    };

    const handleChange = (field: string) => (value: string) => {
        const sanitized = sanitizeSymbols(value);
        setState(prevState => ({
            ...prevState,
            [field]: sanitized,
            isExclude: false
        }));
    };

    return (
        <div className="px-[10px]">
            <div className={cn("mx-auto mt-[20px] max-sm:mt-[10px] bg-[#f7f7f7] max-w-[430px] rounded p-[20px]")}>
                <h1 className="mb-[20px] text-center text-[24px] font-bold max-sm:text-[17px]">Генератор случайных чисел</h1>
                <Button
                    className={cn(
                        { "bg-stone-800 text-white": state.isExclude },
                        "min-h-[42px] bg-white-500 border border-black rounded text-[18px] max-sm:text-[16px] max-sm:min-h-[37px]"
                    )}
                    onClick={() => setState(prevState => ({ ...prevState, isExclude: !prevState.isExclude }))}>
                    Исключить повторения
                </Button>
                <div className={cn("flex mt-[10px]", cls.Inputs)}>
                    <div className={cls.Field}>
                        <label htmlFor="from" className="max-sm:!text-[9px]">
                            от
                        </label>
                        <Input
                            ref={refFrom}
                            rounded={false}
                            id="from"
                            value={state.fromValue.toString()}
                            onChange={handleChange("fromValue")}
                            className="!text-[25px] h-[48px] max-sm:!text-[20px] max-sm:h-[40px]"
                        />
                    </div>
                    <div className={cls.Field}>
                        <label htmlFor="to" className="max-sm:!text-[9px]">
                            до
                        </label>
                        <Input
                            ref={refTo}
                            rounded={false}
                            id="to"
                            value={state.toValue.toString()}
                            onChange={handleChange("toValue")}
                            className="!text-[25px] h-[48px] max-sm:!text-[20px] max-sm:h-[40px]"
                        />
                    </div>
                    <div className={cls.Field}>
                        <label htmlFor="time" className="max-sm:!text-[9px]">
                            время анимации
                        </label>
                        <Input
                            ref={refTime}
                            rounded={false}
                            id="time"
                            onChange={handleChange("time")}
                            value={state.time.toString()}
                            className="!text-[25px] h-[48px] max-sm:!text-[20px] max-sm:h-[40px]"
                        />
                    </div>
                </div>
                <Button
                    className="min-h-[62px] max-sm:min-h-[50px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded mt-2 text-[20px] max-sm:text-[16px]"
                    onClick={onClick}
                    disabled={state.animation}>
                    Получить случайное число
                </Button>
            </div>
            <div
                className={cn(
                    cls.Number,
                    {
                        [cls.AllRepeated]: typeof state.number !== "number",
                        "min-h-[auto] !pt-[20px]": typeof state.number !== "number",
                        "!pt-0": state.animation
                    },
                    "!text-[80px] max-sm:!text-[67px] flex justify-center min-h-[300px] pt-[70px]"
                )}>
                <Image src={src || gifOne} className={cn({ hidden: !state.animation })} alt="gif" loading="lazy" />
                {!state.animation &&
                    (Array.isArray(state.number)
                        ? state.number.map((el, i) => (
                              <div key={i} className="text-[24px]">
                                  {el}
                              </div>
                          ))
                        : state.number)}
            </div>
        </div>
    );
};

export default RandomNumber;
