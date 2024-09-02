"use client";

import { useEffect, useState } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { Input } from "shared/ui/Input/Input";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";
import { formatPrice } from "helpers/formatPrice";

const NumberGreaterNumber = () => {
    const [number1, setNumber1] = useState<any>(50);
    const [number2, setNumber2] = useState(40);
    const [result, setResult] = useState<number>(0);

    const calculateResult = () => {
        const calculatedResult = ((number1 - number2) / number2) * 100;
        setResult(calculatedResult);
    };

    const handleNumber1 = (value: any) => {
        let sanitized = sanitizePercents(value);
        setNumber1(sanitized);
    };

    const handleNumber2 = (value: any) => {
        let sanitized = sanitizeSymbols(value);
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
                    <FormFieldWrapper label="Число 1" htmlFor="number1" className="w-[50%]">
                        <Input rounded={false} id="number1" value={number1.toString()} onChange={handleNumber1} className="text-right" />
                    </FormFieldWrapper>
                    <FormFieldWrapper label="Число 2" htmlFor="number2" className="w-[50%]">
                        <Input rounded={false} id="number2" value={number2.toString()} onChange={handleNumber2} className="text-right" />
                    </FormFieldWrapper>
                </div>
            </div>
            <div className="flex mt-[10px] flex-col">
                <h2 className="font-bold text-[20px] me-[10px]">Результат: {formatPrice(result, false)} %</h2>
                <p className="text-md">{number1} больше чем {number2} на {formatPrice(result, false)} %</p>
            </div>
        </>
    );
};

export default NumberGreaterNumber;
