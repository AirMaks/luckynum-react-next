"use client";

import { useEffect, useState } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { Input } from "shared/ui/Input/Input";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";
import { formatPrice } from "helpers/formatPrice";

const PercentPlusNumber = () => {
    const [percent, setPercent] = useState<any>(50);
    const [number, setNumber] = useState(40);
    const [result, setResult] = useState<number>(0);

    const calculateResult = () => {
        const calculatedResult = (1 + percent / 100) * number;
        setResult(calculatedResult);
    };

    const handlePercent = (value: any) => {
        let sanitized = sanitizePercents(value);
        setPercent(sanitized);
    };

    const handleNumber = (value: any) => {
        let sanitized = sanitizeSymbols(value);
        setNumber(sanitized);
    };

    useEffect(() => {
        calculateResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [percent, number]);

    return (
        <>
            <div className="flex flex-col">
                <div className="flex gap-[10px]">
                    <FormFieldWrapper label="Число" htmlFor="number" className="w-[50%]">
                        <Input rounded={false} id="number" value={number.toString()} onChange={handleNumber} className="text-right" />
                    </FormFieldWrapper>
                    <FormFieldWrapper label="Процент %" htmlFor="percent" className="w-[50%]">
                        <Input rounded={false} id="percent" value={percent.toString()} onChange={handlePercent} className="text-right" />
                    </FormFieldWrapper>
                </div>
            </div>
            <div className="flex mt-[10px] flex-col">
                <h2 className="font-bold text-[20px] me-[10px]">Результат: {formatPrice(result, false)}</h2>
                <p className="text-md">{number} + {percent}% это {formatPrice(result, false)}</p>
            </div>
        </>
    );
};

export default PercentPlusNumber;
