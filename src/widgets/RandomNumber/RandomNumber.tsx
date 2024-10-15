"use client";

import cn from "classnames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useRef, useState } from "react";
import { getRandomNumber } from "helpers/getRandom";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";
import { useSelector } from "react-redux";
import gifOne from "shared/assets/images/1.gif";
import Image from "next/image";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";

const RandomNumber = () => {
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
            <div className="mx-auto mt-[20px] max-sm:mt-[10px] bg-[#f7f7f7] shadow max-w-[430px] rounded p-[20px] max-sm:px-[10px]">
                <h1 className="mb-[20px] text-center text-[24px] font-medium max-sm:text-[17px]">Генератор случайных чисел</h1>
                <Button
                    className={cn(
                        "leading-[1] min-h-[42px] bg-white-500 border mb-[15px] max-sm:mb-[10px] border-black rounded text-[18px] max-sm:text-[16px] max-sm:min-h-[38px]",
                        { "bg-stone-800 text-white": state.isExclude }
                    )}
                    onClick={() => setState(prevState => ({ ...prevState, isExclude: !prevState.isExclude }))}>
                    исключить повторения
                </Button>
                <div className="flex gap-[5px] mb-[15px] max-sm:mb-[10px]">
                    <FormFieldWrapper label="От" htmlFor="from">
                        <Input
                            ref={refFrom}
                            rounded={false}
                            id="from"
                            value={state.fromValue.toString()}
                            onChange={handleChange("fromValue")}
                            className="!text-[20px] h-[40px] max-sm:h-[38px] max-sm:!text-[16px]"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label="До" htmlFor="to">
                        <Input
                            ref={refTo}
                            rounded={false}
                            id="to"
                            value={state.toValue.toString()}
                            onChange={handleChange("toValue")}
                            className="!text-[20px] h-[40px] max-sm:h-[38px] max-sm:!text-[16px]"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label="Время анимации" htmlFor="time">
                        <Input
                            ref={refTime}
                            rounded={false}
                            id="time"
                            onChange={handleChange("time")}
                            value={state.time.toString()}
                            className="!text-[20px] h-[40px] max-sm:h-[38px] max-sm:!text-[16px]"
                        />
                    </FormFieldWrapper>
                </div>
                <Button
                    className="leading-[0] min-h-[62px] max-sm:min-h-[48px] bg-white-500 hover:bg-stone-800 hover:text-white max-sm:hover:bg-[#f7f7f7] max-sm:hover:text-inherit border border-black rounded text-[20px] max-sm:text-[16px]"
                    onClick={onClick}
                    disabled={state.animation}>
                    Получить случайное число
                </Button>
            </div>
            <div
                className={cn("!text-[80px] max-sm:!text-[67px] flex justify-center pt-[70px] max-sm:pt-[40px]", {
                    "!pt-[20px]": typeof state.number !== "number",
                    "!pt-0": state.animation
                })}>
                <Image
                    src={src || gifOne}
                    className={cn("max-sm:max-h-[190px] object-contain", { hidden: !state.animation })}
                    alt="кот gif"
                    priority={true}
                />
                {!state.animation &&
                    (Array.isArray(state.number)
                        ? state.number.map((el, i) => (
                              <div key={i} className="text-[24px] text-center max-sm:text-[20px]">
                                  {el}
                              </div>
                          ))
                        : state.number)}
            </div>
        </div>
    );
};

export default RandomNumber;
