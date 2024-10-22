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

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Калькулятор процентов",
          "url": "https://lucky-num.ru/percent-calculator",
          "description": "Калькулятор поможет вам посчитать проценты.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

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
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px]">
                <div className="shadow mt-[20px] max-sm:mt-[10px] p-[20px] max-sm:px-[10px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[550px] bg-[#f5f5f7] max-lg:p-[20px] rounded">
                    <h1 className="text-center text-[24px] mb-[20px] font-medium max-sm:text-[17px]">Рассчитать проценты</h1>
                    <FormFieldWrapper labelNone className="mb-[15px]">
                        <SelectList
                            ariaDescribedby="Выбор типа расчета"
                            autofocus
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
            <p className="mt-[20px] mx-auto max-w-[550px] text-justify max-sm:px-[10px] mb-[20px]">
                Калькулятор процентов — это простой и удобный инструмент для быстрого расчета процентных значений. Вы можете узнать, сколько процентов
                составляет одно число от другого, найти процент от числа, прибавить или вычесть процент к числу, а также рассчитать, на сколько
                процентов одно число больше или меньше другого. Этот калькулятор поможет вам легко выполнять финансовые расчеты, планировать бюджет и
                анализировать данные.
            </p>
            <p className="mt-[20px] mx-auto max-w-[550px] text-justify max-sm:px-[10px] mb-[20px]">
                Кроме того, с его помощью вы сможете точно определить изменения в любых величинах, будь то рост цен, скидки или изменение показателей
                прибыли. Такой инструмент полезен не только в бизнесе, но и в повседневной жизни, например, для расчета скидок при покупках или
                определения процентной прибыли от инвестиций.
            </p>
        </>
    );
};

export default PercentCalculator;
