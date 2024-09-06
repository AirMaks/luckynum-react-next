"use client";

import { useEffect, useState } from "react";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { Input } from "shared/ui/Input/Input";
import Image from "next/image";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";
import YandexAd from "app/adds";

const CurtainsCalculator = () => {
    const [rodLength, setRodLength] = useState<any>(250);
    const [gatheringCoefficient, setGatheringCoefficient] = useState<any>(1.5);
    const [additionalWidth, setAdditionalWidth] = useState<any>(20);
    const [curtainNumber, setCurtainNumber] = useState<any>(2);
    const [result, setResult] = useState(0);

    const calculateWidth = () => {
        const totalWidth = (Number(rodLength) + Number(additionalWidth)) * (Number(gatheringCoefficient) || 1);
        const res = totalWidth / (Number(curtainNumber) || 1);
        setResult(Number(res.toFixed(2)));
    };

    const handleCoeff = (value: any) => {
        let sanitized = sanitizePercents(value);
        setGatheringCoefficient(sanitized);
    };

    const handleCurtainNumber = (value: any) => {
        let sanitized = sanitizeSymbols(value);
        setCurtainNumber(sanitized);
    };

    const handleRodWidth = (value: any) => {
        let sanitized = sanitizePercents(value);
        setRodLength(sanitized);
    };

    const handleAdditionalWidth = (value: any) => {
        let sanitized = sanitizePercents(value);
        setAdditionalWidth(sanitized);
    };

    useEffect(() => {
        calculateWidth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rodLength, gatheringCoefficient, additionalWidth, curtainNumber]);

    return (
        <>
        <div className="max-w-[710px] h-[70px] mx-auto mt-[20px] max-sm:px-[10px] max-sm:mt-[0]"><YandexAd  /></div>

            <div className="pt-[30px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[750px] px-[20px] max-sm:px-[10px]">
                <div className="bg-[#f7f7f7] p-[40px] max-lg:p-[20px] rounded">
                    <h1 className="text-center text-[24px] mb-[20px] font-bold max-sm:text-[20px]">Рассчитать ширину штор</h1>
                    <div className="flex gap-[10px] max-sm:flex-col">
                        <FormFieldWrapper label="Длина карниза (см)" htmlFor="rod_length">
                            <Input rounded={false} id="rod_length" value={rodLength} onChange={handleRodWidth} />
                        </FormFieldWrapper>

                        <FormFieldWrapper label="Доп. ширина (см)" htmlFor="additional_width">
                            <Input rounded={false} id="additional_width" value={additionalWidth.toString()} onChange={handleAdditionalWidth} />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Коэфф. сборки" htmlFor="gathering_coefficient">
                            <Input rounded={false} id="gathering_coefficient" value={gatheringCoefficient.toString()} onChange={handleCoeff} />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Кол-во штор" htmlFor="curtain_number">
                            <Input rounded={false} id="curtain_number" value={curtainNumber.toString()} onChange={handleCurtainNumber} />
                        </FormFieldWrapper>
                    </div>
                    <div className="flex mt-[10px] flex-wrap">
                        <h2 className="font-bold text-[20px] me-[10px]">Ширина одной шторы:</h2>
                        <p className="text-[20px]">{result || 0} см.</p>
                    </div>
                </div>
                <article className="pb-[40px]">
                    <h3 className="font-bold text-[18px] mb-[10px] mt-[40px]">Как рассчитать ширину штор на нашем калькуляторе?</h3>
                    <strong className="font-semibold">
                        При определении ширины занавесей следует принимать во внимание несколько ключевых факторов:
                    </strong>
                    <p className="mt-[15px]">
                        <span className="block mb-[20px]">
                            - <b>Длина карниза</b> должна быть длиннее оконного проема на 20-25 см с каждой стороны.
                        </span>
                        <Image
                            width={0}
                            height={0}
                            sizes="40vw"
                            style={{ width: "700px", height: "auto" }}
                            src="/img/window.png"
                            alt="расчет ширины штор"
                        />
                    </p>
                    <p className="mt-[30px]">
                        <span className="block mb-[20px]">
                            - <b>Припуск</b> в размере 6 см нужен для обработки боковых сторон штор.
                        </span>
                    </p>
                    <p className="mt-[15px]">
                        <span className="block mb-[20px]">
                            - <b>Для плотного соединения</b> двух задернутых штор необходимо добавить 15 см, чтобы они налегали друг на друга.
                        </span>
                    </p>
                    <p className="mt-[15px]">
                        <span className="block mb-[10px]">
                            - <b>Коэффициент сборки</b>, зависит от плотности и фактуры материала:
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            Легкие ткани типа <b>тюля, органзы, вуали</b> коэффициент сборки <b>2-4</b>.
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            Средние ткани плотности <b>шелк, лен, смешанные ткани</b> – <b>от 2 до 4</b>.
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            Плотные ткани, такие как <b>бархат или жаккард</b> – <b>1,5-2</b>.
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            Для <b>легкой драпировки</b> используется коэффициент <b>1,5</b>.
                        </span>
                    </p>

                    <p className="mt-[15px]">
                        <span className="block mb-[10px]">
                            - <b>При использовании петель</b>:
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            <b>Тканевые петли</b> - <b>1,5-2</b>, с добавлением примерно 20 см с каждой стороны в зависимости от количества складок.
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            <b>Люверсы или ленты</b> - <b>2</b>, с добавлением примерно 20 см с каждой стороны в зависимости от количества складок.
                        </span>
                        <span className="block ps-[20px] mb-[4px] text-neutral-600">
                            <b>Карандашные складки или буфы</b> - <b>2-2,5</b>, с добавлением примерно 20 см с каждой стороны в зависимости от
                            количества складок.
                        </span>
                    </p>
                    <p className="mt-[15px] mb-[15px]">
                        - <b>Для угловых, эркерных и мансардных</b> штор добавляется <b>по 10 см</b> запаса ткани на каждый изгиб и угол.
                    </p>
                    <strong className="font-semibold">Формула для расчета ширины штор: </strong>
                    <p className="mt-[5px]">
                        (<b>Длина карниза</b> + <b>припуски на загиб с обеих сторон (6 см)</b> + <b>на плотное соединение двух полотен (15 см)</b> +{" "}
                        <b>дополнительно до 20 см с каждой стороны в зависимости от вида крепления</b> +{" "}
                        <b>если угловые, эркерные или мансардные шторы 10 см</b>) * <b>на коэффициент сборки</b>.
                    </p>
                </article>
            </div>
        </>
    );
};

export default CurtainsCalculator;
