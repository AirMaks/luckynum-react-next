"use client";

import { useEffect, useState } from "react";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";
import { Input } from "shared/ui/Input/Input";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";

const PercentMinusNumber = () => {
    const [percent, setPercent] = useState<any>(50);
    const [number, setNumber] = useState(40);
    const [result, setResult] = useState<number>(0);

    const calculateResult = () => {
        const calculatedResult = (1 - percent / 100) * number;
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
                    <FormFieldWrapper label="Число" htmlFor="number" className="w-[50%]" labelClassName="text-[13px]">
                        <Input
                            rounded={false}
                            id="number"
                            value={number.toString()}
                            onChange={handleNumber}
                            className="text-[20px] max-sm:text-[16px] h-[40px] max-sm:h-[38px]"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label="Процент %" htmlFor="percent" className="w-[50%]" labelClassName="text-[13px]">
                        <Input
                            rounded={false}
                            id="percent"
                            value={percent.toString()}
                            onChange={handlePercent}
                            className="text-[20px] max-sm:text-[16px] h-[40px] max-sm:h-[38px]"
                        />
                    </FormFieldWrapper>
                </div>
            </div>
            <div className="flex mt-[10px] flex-col">
                <h2 className="font-medium text-[20px] me-[10px] max-sm:text-[17px]">Результат: {result === Infinity ? 0 : result}</h2>
                <p className="text-[20px] max-sm:text-[16px]">
                    {number} - {percent}% это {result === Infinity ? 0 : result}
                </p>
            </div>
        </>
    );
};

export default PercentMinusNumber;
