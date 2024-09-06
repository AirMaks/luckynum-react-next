"use client";

import { useState } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper";
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
import YandexAd from "app/adds";

const PercentCalculator = () => {
    const [isOpenSelectType, setIsOpenSelectType] = useState<any>(false);
    const [percentType, setPercentType] = useState(PERCENT_TYPE_NUMBER_FROM_NUMBER);

    const onSelectTypeClick = () => {
        setIsOpenSelectType((prev: any) => !prev);
    };
    const onSelectTypeItemClick = (value: any) => {
        setIsOpenSelectType(false);
        setPercentType(value);
    };

    return (
        <>
        <div className="max-w-[710px] h-[70px] mx-auto mt-[20px] max-sm:px-[10px] max-sm:mt-[0]">

            <YandexAd  />
        </div>
            <div className="pt-[30px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[550px] px-[20px] max-sm:px-[10px]">
                <div className="bg-[#f7f7f7] p-[40px] max-lg:p-[20px] rounded">
                    <h1 className="text-center text-[24px] mb-[20px] font-bold max-sm:text-[20px]">Рассчитать проценты</h1>
                    <FormFieldWrapper label="Тип вычисления">
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
