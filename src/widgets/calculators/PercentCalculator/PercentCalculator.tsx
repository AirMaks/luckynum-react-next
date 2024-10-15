"use client";

import { useState } from "react";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";
import { SelectList } from "../SelectList";
import {
    PERCENT_TYPE_NUMBER_FROM_NUMBER,
    PERCENT_TYPE_NUMBER_GREATER_NUMBER,
    PERCENT_TYPE_NUMBER_LESS_NUMBER,
    PERCENT_TYPE_PERCENT_FROM_NUMBER,
    PERCENT_TYPE_PERCENT_MINUS_NUMBER,
    PERCENT_TYPE_PERCENT_PLUS_NUMBER
} from "const";
import NumberFromNumber from "./NumberFromNumber";
import PercentFromNumber from "./PercentFromNumber";
import PercentPlusNumber from "./PercentPlusNumber";
import PercentMinusNumber from "./PercentMinusNumber";
import NumberGreaterNumber from "./NumberGreaterNumber";
import NumberLessNumber from "./NumberLessNumber";

const PercentCalculator = () => {
    const [isOpenSelectType, setIsOpenSelectType] = useState<any>(false);
    const [percentType, setPercentType] = useState(PERCENT_TYPE_NUMBER_FROM_NUMBER);

    const onSelectTypeClick = () => {
        setIsOpenSelectType((prev: any) => !prev);
    };
    const onSelectTypeItemClick = (value: any) => {
        setPercentType(value);
    };

    return (
        <>
            <div className="px-[10px]">
                <div className="shadow mt-[20px] max-sm:mt-[10px] p-[20px] max-sm:px-[10px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[550px] bg-[#f7f7f7] max-lg:p-[20px] rounded">
                    <h1 className="text-center text-[24px] mb-[20px] font-medium max-sm:text-[17px]">Рассчитать проценты</h1>
                    <FormFieldWrapper labelNone className="mb-[15px]">
                        <SelectList
                            onSelectClick={onSelectTypeClick}
                            isOpenSelect={isOpenSelectType}
                            onSelectItemClick={onSelectTypeItemClick}
                            items={[
                                PERCENT_TYPE_NUMBER_FROM_NUMBER,
                                PERCENT_TYPE_PERCENT_FROM_NUMBER,
                                PERCENT_TYPE_PERCENT_PLUS_NUMBER,
                                PERCENT_TYPE_PERCENT_MINUS_NUMBER,
                                PERCENT_TYPE_NUMBER_GREATER_NUMBER,
                                PERCENT_TYPE_NUMBER_LESS_NUMBER
                            ]}
                            selectedItem={percentType}
                            className="text-[20px] max-sm:text-[16px] h-[40px] max-sm:h-[38px]"
                        />
                    </FormFieldWrapper>
                    {percentType === PERCENT_TYPE_NUMBER_FROM_NUMBER && <NumberFromNumber />}
                    {percentType === PERCENT_TYPE_PERCENT_FROM_NUMBER && <PercentFromNumber />}
                    {percentType === PERCENT_TYPE_PERCENT_PLUS_NUMBER && <PercentPlusNumber />}
                    {percentType === PERCENT_TYPE_PERCENT_MINUS_NUMBER && <PercentMinusNumber />}
                    {percentType === PERCENT_TYPE_NUMBER_GREATER_NUMBER && <NumberGreaterNumber />}
                    {percentType === PERCENT_TYPE_NUMBER_LESS_NUMBER && <NumberLessNumber />}
                </div>
            </div>
        </>
    );
};

export default PercentCalculator;
