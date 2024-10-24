"use client";

import { useEffect, useState } from "react";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";
import { SelectList } from "../SelectList";
import { TIRE_DIAMETERS, TIRE_PROFILES, TIRE_WIDTHS } from "const";
import cn from "classnames";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useLocalStorage from "shared/hooks/useLocalStorage";
import Loader from "shared/ui/Loader/Loader";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Калькулятор шин и дисков",
          "url": "https://lucky-num.ru/kalkulyator-shin",
          "description": "Калькулятор шин и дисков помогает рассчитать размеры колес, которые вы хотите установить.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

interface Props {
    h1: string;
    className?: string;
}

interface TireData {
    width: number;
    profile: number;
    diameter: number;
}

interface TireResults {
    diameter: number;
    width: number;
    circumference: number;
    profileHeight: number;
    revolutionsPerKm: number;
    revolutionsPerMile: number;
    groundClearanceChange: string;
    result: string;
}

interface TireDifferences {
    diameter: string;
    width: string;
    circumference: string;
    profileHeight: string;
    revolutionsPerKm: string;
    revolutionsPerMile: string;
    groundClearanceChange: string;
}

export const TireCalculator: React.FC<Props> = props => {
    const [oldTire, setOldTire] = useLocalStorage<TireData>("oldTire", { width: 205, profile: 65, diameter: 15 });
    const [newTire, setNewTire] = useLocalStorage<TireData>("newTire", { width: 195, profile: 55, diameter: 15 });
    const [speed, setSpeed] = useLocalStorage<number>("speed", 60);
    const [unit, setUnit] = useState<"mm" | "inch">("mm");
    const [isMounted, setIsMounted] = useState(false);
    const [results, setResults] = useState<{ oldTireData: TireResults; newTireData: TireResults; differences: TireDifferences } | null>(null);
    const [isDanger, setIsDanger] = useState(false);

    const [isOldWidthSelectOpen, setIsOldWidthSelectOpen] = useState(false);
    const [isOldProfileSelectOpen, setIsOldProfileSelectOpen] = useState(false);
    const [isOldDiameterSelectOpen, setIsOldDiameterSelectOpen] = useState(false);

    const [isNewWidthSelectOpen, setIsNewWidthSelectOpen] = useState(false);
    const [isNewProfileSelectOpen, setIsNewProfileSelectOpen] = useState(false);
    const [isNewDiameterSelectOpen, setIsNewDiameterSelectOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        calculateResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oldTire, newTire]);

    const handleChange = (name: "old" | "new", key: keyof TireData, value: number) => {
        if (name === "old") {
            setOldTire({ ...oldTire, [key]: value });
        } else {
            setNewTire({ ...newTire, [key]: value });
        }
    };

    const calculateResults = () => {
        const oldTireData = calculateTireData(oldTire);
        const newTireData = calculateTireData(newTire);
        const differences = calculateDifferences(oldTireData, newTireData);

        setResults({ oldTireData, newTireData, differences });
    };

    const calculateTireData = ({ width, profile, diameter }: TireData): TireResults => {
        const rimDiameterInMm = diameter * 25.4;
        const sidewallHeight = (width * profile) / 100;
        const totalDiameter = rimDiameterInMm + sidewallHeight * 2;
        const circumference = totalDiameter * Math.PI;
        const revolutionsPerKm = 1000000 / circumference;
        const revolutionsPerMile = revolutionsPerKm * 1.60934;

        const oldTotalDiameter = oldTire.diameter * 25.4 + ((oldTire.width * oldTire.profile) / 100) * 2;
        const diameterDifference = Math.abs(totalDiameter - oldTotalDiameter);
        const diameterPercentageDifference = (diameterDifference / oldTotalDiameter) * 100;

        let result = "Внимание! Диаметр отличается более чем на 3%!";
        setIsDanger(diameterPercentageDifference > 3);
        if (diameterPercentageDifference <= 3) {
            result = "Все хорошо. Диаметр в пределах 3%.";
        }

        return {
            diameter: Number(parseFloat(totalDiameter.toFixed(2))),
            width,
            circumference: Number(parseFloat(circumference.toFixed(2))),
            profileHeight: Number(parseFloat(sidewallHeight.toFixed(2))),
            revolutionsPerKm: Number(parseFloat(revolutionsPerKm.toFixed(2))),
            revolutionsPerMile: Number(parseFloat(revolutionsPerMile.toFixed(2))),
            groundClearanceChange: `${Number(sidewallHeight.toFixed(2))} мм`,
            result
        };
    };

    const calculateDifferences = (oldTireData: TireResults, newTireData: TireResults): TireDifferences => {
        const diffDiameter = newTireData.diameter - oldTireData.diameter;
        const diffWidth = newTireData.width - oldTireData.width;
        const diffCircumference = newTireData.circumference - oldTireData.circumference;
        const diffProfileHeight = newTireData.profileHeight - oldTireData.profileHeight;
        const diffRevolutionsPerKm = newTireData.revolutionsPerKm - oldTireData.revolutionsPerKm;
        const diffRevolutionsPerMile = newTireData.revolutionsPerMile - oldTireData.revolutionsPerMile;
        const diffGroundClearanceChange = diffDiameter / 2;

        const formatDifference = (value: number, baseValue: number, showMm = true) => {
            const sign = value > 0 ? "+" : "";
            const base = ((value / baseValue) * 100).toFixed(2);
            const baseSign = Number(base) > 0 ? "+" : "";
            return `${sign}${Number(value.toFixed(2))} ${showMm ? "мм" : ""} (${baseSign}${Number(base)}%)`;
        };

        return {
            diameter: formatDifference(diffDiameter, oldTireData.diameter),
            width: formatDifference(diffWidth, oldTireData.width),
            circumference: formatDifference(diffCircumference, oldTireData.circumference),
            profileHeight: formatDifference(diffProfileHeight, oldTireData.profileHeight),
            revolutionsPerKm: formatDifference(diffRevolutionsPerKm, oldTireData.revolutionsPerKm, false),
            revolutionsPerMile: formatDifference(diffRevolutionsPerMile, oldTireData.revolutionsPerMile, false),
            groundClearanceChange:
                diffGroundClearanceChange === 0 ? "Клиренс не изменится" : `Клиренс изменится на ${diffGroundClearanceChange.toFixed(2)} мм`
        };
    };

    const calculateFuelConsumptionChange = (oldTireData: any, newTireData: any) => {
        const oldDiameter = oldTireData?.diameter;
        const newDiameter = newTireData?.diameter;
        const diameterChangePercentage = ((newDiameter - oldDiameter) / oldDiameter) * 100;
        const fuelConsumptionChangePercentage = diameterChangePercentage * 0.25; // Примерно 0.25% на каждый 1% изменения диаметра

        return fuelConsumptionChangePercentage;
    };

    const convertToInches = (value: number, baseValue: number | boolean = false) => {
        if (baseValue === false) return `${Number((value / 25.4).toFixed(2))}"`;

        if (typeof baseValue === "number") {
            const base = ((value / baseValue) * 100).toFixed(2);
            const baseSign = Number(base) > 0 ? "+" : "";
            return `${Number((value / 25.4).toFixed(2))}" (${baseSign}${Number(base)}%)`;
        }

        return `${Number((value / 25.4).toFixed(2))}"`;
    };

    const calculateNewSpeed = (oldCircumference: number, newCircumference: number, speed: number) => {
        return (speed * newCircumference) / oldCircumference;
    };
    const fuelConsumptionChange = calculateFuelConsumptionChange(results?.oldTireData, results?.newTireData);
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px] ms-auto me-auto max-w-[710px]">
                <div className="mt-[20px] max-sm:mt-[10px] p-[20px] bg-[#f5f5f7] shadow rounded max-sm:px-[10px]">
                    <h1 className="text-center text-[24px] mb-[20px] font-medium max-sm:text-[17px]">{props.h1}</h1>

                    <div className="flex justify-center gap-[15px] mb-[20px]">
                        <button
                            aria-label="Выбрать миллимметры"
                            aria-pressed={unit === "mm"}
                            onClick={() => setUnit("mm")}
                            className={cn(
                                "shadow border-0 bg-slate-400 text-white px-[10px] max-sm:px-[5px] leading-none py-[7px] max-sm:py-[5px] w-[100px]",
                                {
                                    "!bg-blue-500": unit === "mm"
                                }
                            )}>
                            ММ
                        </button>
                        <button
                            aria-label="Выбрать дюймы"
                            aria-pressed={unit === "inch"}
                            onClick={() => setUnit("inch")}
                            className={cn(
                                "shadow border-0 bg-slate-400 text-white px-[10px] max-sm:px-[5px] leading-none py-[7px] max-sm:py-[5px] w-[100px]",
                                {
                                    "!bg-blue-500": unit === "inch"
                                }
                            )}>
                            Дюймы
                        </button>
                    </div>
                    {!isMounted ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="flex gap-[15px]">
                                <div className="flex flex-col gap-[15px] max-sm:gap-[10px] w-1/2 max-sm:w-full">
                                    <h2 className="text-[20px] max-sm:text-[14px] truncate">Стандартный размер</h2>
                                    <FormFieldWrapper labelNone>
                                        <SelectList
                                            ariaDescribedby="Выбор ширины для стандартного размера"
                                            onSelectClick={() => setIsOldWidthSelectOpen(prev => !prev)}
                                            isOpenSelect={isOldWidthSelectOpen}
                                            onSelectItemClick={(value: number) => handleChange("old", "width", value)}
                                            items={TIRE_WIDTHS}
                                            selectedItem={oldTire.width}
                                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                        />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper labelNone>
                                        <SelectList
                                            ariaDescribedby="Выбор профиля для стандартного размера"
                                            onSelectClick={() => setIsOldProfileSelectOpen(prev => !prev)}
                                            isOpenSelect={isOldProfileSelectOpen}
                                            onSelectItemClick={(value: number) => handleChange("old", "profile", value)}
                                            items={TIRE_PROFILES}
                                            selectedItem={oldTire.profile}
                                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                        />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper labelNone>
                                        <SelectList
                                            ariaDescribedby="Выбор диаметра для стандартного размера"
                                            onSelectClick={() => setIsOldDiameterSelectOpen(prev => !prev)}
                                            isOpenSelect={isOldDiameterSelectOpen}
                                            onSelectItemClick={(value: number) => handleChange("old", "diameter", value)}
                                            items={TIRE_DIAMETERS}
                                            selectedItem={oldTire.diameter}
                                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                        />
                                    </FormFieldWrapper>
                                </div>

                                <div className="flex flex-col gap-[15px] max-sm:gap-[10px] w-1/2 max-sm:w-full">
                                    <h2 className="text-[20px] max-sm:text-[14px] truncate">Новый размер</h2>
                                    <FormFieldWrapper labelNone>
                                        <SelectList
                                            ariaDescribedby="Выбор ширины для нового размера"
                                            onSelectClick={() => setIsNewWidthSelectOpen(prev => !prev)}
                                            isOpenSelect={isNewWidthSelectOpen}
                                            onSelectItemClick={(value: number) => handleChange("new", "width", value)}
                                            items={TIRE_WIDTHS}
                                            selectedItem={newTire.width}
                                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                        />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper labelNone>
                                        <SelectList
                                            ariaDescribedby="Выбор профиля для стандартного размера"
                                            onSelectClick={() => setIsNewProfileSelectOpen(prev => !prev)}
                                            isOpenSelect={isNewProfileSelectOpen}
                                            onSelectItemClick={(value: number) => handleChange("new", "profile", value)}
                                            items={TIRE_PROFILES}
                                            selectedItem={newTire.profile}
                                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                        />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper labelNone>
                                        <SelectList
                                            ariaDescribedby="Выбор диаметра для стандартного размера"
                                            onSelectClick={() => setIsNewDiameterSelectOpen(prev => !prev)}
                                            isOpenSelect={isNewDiameterSelectOpen}
                                            onSelectItemClick={(value: number) => handleChange("new", "diameter", value)}
                                            items={TIRE_DIAMETERS}
                                            selectedItem={newTire.diameter}
                                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                        />
                                    </FormFieldWrapper>
                                </div>
                            </div>
                            {results && (
                                <div className="mt-[30px]">
                                    <div
                                        className="grid grid-cols-4 mt-[20px] border-l border-t border-gray-700 max-sm:text-[12px] break-words"
                                        role="table"
                                        aria-label="Сравнение характеристик шин">
                                        <div className="font-medium border-r border-b border-gray-700 p-[4px]" role="columnheader">
                                            Показатель
                                        </div>
                                        <div className="font-medium border-r border-b border-gray-700 p-[4px]" role="columnheader">
                                            Стандартная шина
                                        </div>
                                        <div className="font-medium border-r border-b border-gray-700 p-[4px]" role="columnheader">
                                            Новая шина
                                        </div>
                                        <div className="font-medium border-r border-b border-gray-700 p-[4px]" role="columnheader">
                                            Разница
                                        </div>

                                        <div className="border-r border-gray-700 border-b p-[4px] font-medium" role="rowheader">
                                            Диаметр
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? `${results.oldTireData.diameter} мм` : convertToInches(results.oldTireData.diameter)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? `${results.newTireData.diameter} мм` : convertToInches(results.newTireData.diameter)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? results.differences.diameter
                                                : convertToInches(
                                                      parseFloat(results.differences.diameter.split(" ")[0]),
                                                      results.oldTireData.diameter
                                                  )}
                                        </div>

                                        <div className="border-r border-gray-700 border-b p-[4px] font-medium" role="rowheader">
                                            Ширина
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? `${results.oldTireData.width} мм` : convertToInches(results.oldTireData.width)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? `${results.newTireData.width} мм` : convertToInches(results.newTireData.width)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? results.differences.width
                                                : convertToInches(parseFloat(results.differences.width.split(" ")[0]), results.oldTireData.width)}
                                        </div>

                                        <div className="border-r border-gray-700 border-b p-[4px] font-medium" role="rowheader">
                                            Длина окружности
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? `${results.oldTireData.circumference} мм`
                                                : convertToInches(results.oldTireData.circumference)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? `${results.newTireData.circumference} мм`
                                                : convertToInches(results.newTireData.circumference)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? results.differences.circumference
                                                : convertToInches(
                                                      parseFloat(results.differences.circumference.split(" ")[0]),
                                                      results.oldTireData.circumference
                                                  )}
                                        </div>

                                        <div className="border-r border-gray-700 border-b p-[4px] font-medium" role="rowheader">
                                            Высота профиля
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? `${results.oldTireData.profileHeight} мм`
                                                : convertToInches(results.oldTireData.profileHeight)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? `${results.newTireData.profileHeight} мм`
                                                : convertToInches(results.newTireData.profileHeight)}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm"
                                                ? results.differences.profileHeight
                                                : convertToInches(
                                                      parseFloat(results.differences.profileHeight.split(" ")[0]),
                                                      results.oldTireData.profileHeight
                                                  )}
                                        </div>

                                        <div className="border-r border-gray-700 border-b p-[4px] font-medium" role="rowheader">
                                            {unit === "mm" ? "Оборотов на км" : "Оборотов на милю"}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? results.oldTireData.revolutionsPerKm : results.oldTireData.revolutionsPerMile}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? results.newTireData.revolutionsPerKm : results.newTireData.revolutionsPerMile}
                                        </div>
                                        <div className="border-r border-gray-700 border-b p-[4px]" role="cell">
                                            {unit === "mm" ? results.differences.revolutionsPerKm : results.differences.revolutionsPerMile}
                                        </div>
                                    </div>

                                    <div className="mt-[20px] select-none">
                                        <div>
                                            <h3 className="mb-[10px] text-[20px] max-sm:text-[16px] text-center" id="speed-heading">
                                                Скорость автомобиля, {unit === "mm" ? "км/ч" : "миль/ч"}
                                            </h3>
                                            <div className="grid grid-cols-2 mt-[20px] text-center" role="group" aria-labelledby="speed-heading">
                                                <div className="mb-[10px] text-[18px] max-sm:text-[14px] leading-none">
                                                    При показаниях спидометра на стандартных шинах:
                                                </div>

                                                <div className="mb-[10px] text-[18px] max-sm:text-[14px] leading-none">
                                                    Реальная скорость на новых шинах будет:
                                                </div>
                                                <div className="flex items-center justify-center mt-2">
                                                    <div
                                                        className={cn(
                                                            "w-[170px] shadow max-sm:w-[130px] max-sm:text-[22px] bg-black p-[10px] leading-none rounded flex items-center justify-center text-teal-500 text-[36px]",
                                                            [props.className]
                                                        )}
                                                        aria-label={`Показания спидометра: ${speed}`}>
                                                        {speed}{" "}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center mt-2">
                                                    <div
                                                        className={cn(
                                                            "w-[170px] shadow max-sm:w-[130px] max-sm:text-[22px] bg-black p-[10px] leading-none rounded flex items-center justify-center text-teal-500 text-[36px]",
                                                            [props.className]
                                                        )}
                                                        aria-label={`Реальная скорость: ${Number(
                                                            calculateNewSpeed(
                                                                results.oldTireData.circumference,
                                                                results.newTireData.circumference,
                                                                speed
                                                            ).toFixed(2)
                                                        )}`}>
                                                        {Number(
                                                            calculateNewSpeed(
                                                                results.oldTireData.circumference,
                                                                results.newTireData.circumference,
                                                                speed
                                                            ).toFixed(2)
                                                        )}{" "}
                                                    </div>
                                                </div>
                                            </div>
                                            <Slider
                                                trackStyle={{ backgroundColor: "#3B82F6" }}
                                                handleStyle={{
                                                    backgroundColor: "#3B82F6",
                                                    borderColor: "#3B82F6",
                                                    opacity: 1,
                                                    boxShadow: "none",
                                                    width: "20px",
                                                    height: "20px",
                                                    marginTop: "-8px"
                                                }}
                                                min={1}
                                                max={500}
                                                className="max-sm:!w-[calc(100%-20px)] max-sm:!mx-auto my-[30px]"
                                                value={speed}
                                                onChange={value => setSpeed(Number(value))}
                                                aria-label="Регулятор скорости"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            "shadow text-center max-sm:text-[14px] mt-5 font-medium bg-green-600 text-white  p-[10px] rounded",
                                            {
                                                "!bg-red-800": isDanger
                                            }
                                        )}
                                        role="alert"
                                        aria-live="polite">
                                        <div>
                                            {unit === "mm" ? (
                                                <div>{results.differences.groundClearanceChange}.</div>
                                            ) : (
                                                <div>
                                                    {results.differences.groundClearanceChange.includes("Клиренс не изменится")
                                                        ? "Клиренс не изменится."
                                                        : `Клиренс изменится на ${convertToInches(parseFloat(results.differences.groundClearanceChange.split(" ")[3]))}.`}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">{results.newTireData.result}</div>
                                    </div>
                                    <div className="mt-[20px]">
                                        <h3 className="mb-[10px] text-[20px] max-sm:text-[16px] text-center" id="fuel-consumption-heading">
                                            Изменение расхода топлива
                                        </h3>
                                        <div
                                            className={cn("text-center text-[20px] max-sm:text-[16px]", {
                                                "text-red-800": fuelConsumptionChange > 0,
                                                "text-green-600": fuelConsumptionChange < 0
                                            })}
                                            role="alert"
                                            aria-live="polite">
                                            {fuelConsumptionChange > 0
                                                ? `Расход топлива увеличится примерно на ${Number(fuelConsumptionChange.toFixed(2))}`
                                                : fuelConsumptionChange < 0
                                                  ? `Расход топлива уменьшиться примерно на ${Number(fuelConsumptionChange.toFixed(2))}`
                                                  : Number(fuelConsumptionChange.toFixed(2))}
                                            %
                                        </div>
                                        <p className="mt-[10px] max-sm:text-[14px] text-justify" aria-describedby="fuel-consumption-heading">
                                            Важно! Этот расчет является приблизительным и не учитывает все факторы, влияющие на расход топлива.
                                            Фактическое изменение расхода топлива может отличаться в зависимости от условий эксплуатации, стиля
                                            вождения и других факторов.
                                        </p>
                                        <p
                                            className="p-[10px] rounded bg-slate-300 mt-[10px] text-justify max-sm:text-[14px]"
                                            aria-describedby="fuel-consumption-heading">
                                            Калькулятор шин — удобный инструмент для точного расчета параметров новых колес вашего автомобиля. Укажите
                                            ширину, диаметр и профиль старой шины, затем введите данные для новой шины. В результате вы получите
                                            информацию о том, как изменится клиренс, расход топлива и скорость на новых колесах. Этот расчет поможет
                                            вам подобрать оптимальные шины, обеспечив комфорт и безопасность на дороге.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default TireCalculator;
