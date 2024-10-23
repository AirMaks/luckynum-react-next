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
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Генератор случайных чисел",
          "url": "https://lucky-num.ru/generator-sluchainykh-chisel",
          "description": "Генератор случайных чисел помогает получить случайное число. Вы можете исключить повторения.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

const RandomNumber = () => {
    const [state, setState] = useState({
        number: 0 as number | string | boolean | Array<string | boolean>,
        fromValue: 1,
        toValue: 10,
        isExclude: false,
        animation: false
    });

    const [time, setTime] = useState(1);

    const refFrom = useRef(null);
    const refTo = useRef(null);
    const refTime = useRef(null);
    const src = useSelector(getAnimationSrc);

    const onClick = () => {
        const num = getRandomNumber(state.fromValue, state.toValue, state.isExclude);
        if ((num || num === 0) && typeof num === "number" && time > 0) {
            setState(prevState => ({ ...prevState, animation: true }));
            setTimeout(() => {
                setState(prevState => ({
                    ...prevState,
                    animation: false,
                    number: num
                }));
            }, time * 1000);
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
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px] select-none">
                <div className="mx-auto mt-[20px] max-sm:mt-[10px] bg-[#f5f5f7] shadow max-w-[430px] rounded p-[20px] max-sm:px-[10px]">
                    <h1 className="mb-[20px] text-center text-[24px] font-medium max-sm:text-[17px]">Генератор случайных чисел</h1>
                    <div className="flex gap-[5px] mb-[10px] max-sm:mb-[10px]">
                        <FormFieldWrapper labelNone htmlFor="from">
                            <Input
                                autofocus
                                ref={refFrom}
                                rounded={false}
                                id="from"
                                ariaLabel="Поле для ввода числа От"
                                value={state.fromValue.toString()}
                                onChange={handleChange("fromValue")}
                                className="!text-[20px] h-[40px] max-sm:h-[38px] max-sm:!text-[16px]"
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper labelNone htmlFor="to">
                            <Input
                                ref={refTo}
                                rounded={false}
                                id="to"
                                ariaLabel="Поле для ввода числа До"
                                value={state.toValue.toString()}
                                onChange={handleChange("toValue")}
                                className="!text-[20px] h-[40px] max-sm:h-[38px] max-sm:!text-[16px]"
                            />
                        </FormFieldWrapper>
                    </div>
                    <h3 className="mb-[10px] text-[14px]" aria-live="polite">
                        Время анимации, сек: <span className="font-medium">{time}</span>
                    </h3>
                    <div className="mb-[20px] w-[calc(100%-15px)] mx-auto">
                        <Slider
                            trackStyle={{ backgroundColor: "#3B82F6" }}
                            handleStyle={{
                                backgroundColor: "#3B82F6",
                                borderColor: "#3B82F6",
                                opacity: 1,
                                boxShadow: "none",
                                width: "15px",
                                height: "15px",
                                marginTop: "-5px"
                            }}
                            min={1}
                            max={10}
                            value={time}
                            onChange={value => setTime(Number(value))}
                        />
                    </div>
                    <FormFieldWrapper
                        label="исключить повторения"
                        htmlFor="exclude"
                        labelClassName="cursor-pointer !relative p-0 ml-[10px] bg-transparent !top-[unset]"
                        className="flex mb-[20px] items-center me-[10px]">
                        <Input
                            id="exclude"
                            type="checkbox"
                            value={state.isExclude}
                            onChange={() => setState(prevState => ({ ...prevState, isExclude: !prevState.isExclude }))}
                            className="!w-auto cursor-pointer absolute"
                            ariaLabel="Кнопка для исключения повторений"
                        />
                    </FormFieldWrapper>
                    <Button
                        className="leading-[0] min-h-[62px] max-sm:min-h-[48px] shadow bg-blue-500 text-white hover:bg-blue-600 max-sm:hover:bg-blue-600 max-sm:hover:text-inherit border-0 rounded text-[20px] max-sm:text-[16px]"
                        onClick={onClick}
                        disabled={state.animation}
                        ariaLabel="Кнопка, чтобы сгенерировать случайное число"
                        ariaDisabled={state.animation}
                        ariaPressed={state.animation}>
                        Получить случайное число
                    </Button>
                </div>
                <div
                    className={cn(
                        "min-h-[300px] max-sm:min-h-[190px] !text-[80px] max-sm:!text-[67px] flex justify-center pt-[70px] max-sm:pt-[40px]",
                        {
                            "!pt-[20px]": typeof state.number !== "number",
                            "!pt-0": state.animation
                        }
                    )}
                    role="status"
                    aria-live="polite">
                    <Image
                        src={src || gifOne}
                        className={cn("max-sm:max-h-[190px] object-contain", { hidden: !state.animation })}
                        alt="Анимация кота"
                        priority={true}
                    />
                    {!state.animation &&
                        (Array.isArray(state.number) ? (
                            state.number.map((el, i) => (
                                <div key={i} className="text-[24px] text-center max-sm:text-[20px]" role="presentation">
                                    {el}
                                </div>
                            ))
                        ) : (
                            <>
                                <span id="random-number-description" className="sr-only">
                                    Ваше случайное число: {state.number}
                                </span>
                                <span aria-describedby="random-number-description">{state.number}</span>
                            </>
                        ))}
                </div>
            </div>
            <p className="mx-auto max-w-[430px] text-justify max-sm:px-[10px]">
                {`Генератор случайных чисел — это удобный инструмент для быстрого получения случайного числа в заданном диапазоне. Просто введите начальное значение в поле "${"От"}" и конечное значение в поле "${"До"}". Если вы хотите исключить повторения чисел, активируйте опцию "Исключить повторения". Для добавления интерактива можно задать время анимации в секундах, чтобы результат отображался с задержкой, создавая эффект ожидания.`}
            </p>
        </>
    );
};

export default RandomNumber;
