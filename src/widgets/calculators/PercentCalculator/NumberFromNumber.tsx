"use client";

import { useEffect, useState } from "react";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";
import { Input } from "shared/ui/Input/Input";
import { sanitizePercents } from "helpers/sanitizeSymbols";

const NumberFromNumber = () => {
    const [number1, setNumber1] = useState<any>(20);
    const [number2, setNumber2] = useState<any>(40);
    const [result, setResult] = useState<number>(0);

    const calculateResult = () => {
        const calculatedResult = (number1 / number2) * 100;
        setResult(calculatedResult);
    };

    const handleNumber1 = (value: any) => {
        let sanitized = sanitizePercents(value);
        setNumber1(sanitized);
    };

    const handleNumber2 = (value: any) => {
        let sanitized = sanitizePercents(value);
        setNumber2(sanitized);
    };

    useEffect(() => {
        calculateResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number1, number2]);

    return (
        <>
            <div className="flex flex-col">
                <div className="flex gap-[10px]">
                    <FormFieldWrapper label="Число 1" htmlFor="number1" className="w-[50%]" labelClassName="text-[13px]">
                        <Input
                            autofocus
                            rounded={false}
                            id="number1"
                            value={number1.toString()}
                            onChange={handleNumber1}
                            className="text-[20px] max-sm:text-[16px] h-[40px] max-sm:h-[38px]"
                            ariaLabel="Укажите Число 1"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label="Число 2" htmlFor="number2" className="w-[50%]" labelClassName="text-[13px]">
                        <Input
                            rounded={false}
                            id="number2"
                            value={number2.toString()}
                            onChange={handleNumber2}
                            className="text-[20px] max-sm:text-[16px] h-[40px] max-sm:h-[38px]"
                            ariaLabel="Укажите Число 2"
                        />
                    </FormFieldWrapper>
                </div>
            </div>
            <div className="flex mt-[10px] flex-col" aria-label="Результат вычисления процентов">
                <h2
                    className="font-medium text-[20px] me-[10px] max-sm:text-[17px]"
                    id="result-heading"
                    aria-label={`Ваш результат: ${result === Infinity ? 0 : result}%`}>
                    Результат: {result === Infinity ? 0 : result}%
                </h2>
                <p
                    className="text-[20px] max-sm:text-[16px]"
                    aria-describedby="result-heading"
                    aria-label={`${number1} это ${result === Infinity ? 0 : result}% от ${number2}`}>
                    {number1} это {result === Infinity ? 0 : result}% от {number2}
                </p>
            </div>
        </>
    );
};

export default NumberFromNumber;
