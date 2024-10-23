"use client";

import { useState } from "react";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";
import { Input } from "shared/ui/Input/Input";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";
import { SelectList } from "../SelectList";
import { Button } from "shared/ui/Button/Button";
import cn from "classnames";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Калькулятор калорий",
          "url": "https://lucky-num.ru/kalkulyator-kaloriy",
          "description": "Рассчитайте свою дневную норму калорий бесплатно на нашем удобном калькуляторе.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

const CalorieCalculator = () => {
    const [age, setAge] = useState("0");
    const [height, setHeight] = useState("0");
    const [weight, setWeight] = useState("0");
    const [gender, setGender] = useState("Мужской");
    const [activity, setActivity] = useState("Сидячий образ жизни");
    const [formula, setFormula] = useState("Миффлина-Сен Жеора");
    const [calories, setCalories] = useState<any>(null);
    const [bmi, setBmi] = useState<number | null>(null);
    const [macronutrients, setMacronutrients] = useState<any>(null);
    const [isOpenSelectGender, setIsOpenSelectGender] = useState(false);
    const [isOpenSelectActivity, setIsOpenSelectActivity] = useState(false);
    const [isOpenSelectFormula, setIsOpenSelectFormula] = useState(false);

    const calculateCalories = () => {
        const weightKg = parseFloat(weight);
        const heightCm = parseFloat(height);
        const ageYears = parseFloat(age);
        if (!weightKg || !heightCm || !ageYears) return;
        let bmr = 1;

        if (formula === "Миффлина-Сен Жеора") {
            if (gender === "Мужской") {
                bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
            } else {
                bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
            }
        } else if (formula === "Харриса-Бенедикта") {
            if (gender === "Мужской") {
                bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears;
            } else {
                bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears;
            }
        }

        let activityMultiplier;
        switch (activity) {
            case "Сидячий образ жизни":
                activityMultiplier = 1.2;
                break;
            case "Слабая активность":
                activityMultiplier = 1.375;
                break;
            case "Умеренная активность":
                activityMultiplier = 1.55;
                break;
            case "Высокая активность":
                activityMultiplier = 1.725;
                break;
            case "Супер активность":
                activityMultiplier = 1.9;
                break;
            default:
                activityMultiplier = 1.2;
        }

        const maintenanceCalories = bmr * activityMultiplier;
        const loseWeightCalories = maintenanceCalories - 500;
        const gainMuscleCalories = maintenanceCalories + 500;

        setCalories({
            maintenance: maintenanceCalories.toFixed(0),
            loseWeight: loseWeightCalories.toFixed(0),
            gainMuscle: gainMuscleCalories.toFixed(0)
        });

        // Расчет ИМТ
        const heightM = heightCm / 100;
        const bmiValue = weightKg / (heightM * heightM);
        setBmi(bmiValue);

        // Расчет макронутриентов
        const proteinCalories = maintenanceCalories * 0.3;
        const fatCalories = maintenanceCalories * 0.3;
        const carbsCalories = maintenanceCalories * 0.4;

        const proteinGrams = proteinCalories / 4;
        const fatGrams = fatCalories / 9;
        const carbsGrams = carbsCalories / 4;

        setMacronutrients({
            protein: proteinGrams.toFixed(0),
            fat: fatGrams.toFixed(0),
            carbs: carbsGrams.toFixed(0)
        });
    };

    const onSelectGenderClick = () => {
        setIsOpenSelectGender((prev: any) => !prev);
    };
    const onSelectGenderItemClick = (value: any) => {
        setGender(value);
    };

    const onSelectActivityClick = () => {
        setIsOpenSelectActivity((prev: any) => !prev);
    };
    const onSelectActivityItemClick = (value: any) => {
        setActivity(value);
    };

    const onSelectFormulaClick = () => {
        setIsOpenSelectFormula((prev: any) => !prev);
    };
    const onSelectFormulaItemClick = (value: any) => {
        setFormula(value);
    };

    const handleAgeChange = (value: any) => {
        const sanitized = sanitizePercents(value);
        setAge(sanitized);
    };

    const handleWeightChange = (value: any) => {
        const sanitized = sanitizePercents(value);
        setWeight(sanitized);
    };

    const handleHeightChange = (value: any) => {
        const sanitized = sanitizePercents(value);
        setHeight(sanitized);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px]">
                <div
                    className="bg-[#f5f5f7] shadow mt-[20px] max-sm:mt-[10px] p-[20px] max-sm:px-[10px] rounded pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[750px] px-[20px]"
                    role="form"
                    aria-label="Калькулятор калорий">
                    <h1 className="text-center text-[24px] mb-[10px] font-medium max-sm:text-[17px]" id="calorie-heading">
                        Калькулятор калорий
                    </h1>
                    <p className="mb-[40px] text-center" aria-describedby="calorie-heading">
                        Узнайте, сколько калорий, белков, жиров и углеводов нужно для поддержания веса, похудения или набора мышечной массы.
                    </p>
                    <div className="flex max-sm:flex-wrap gap-[10px] mb-[10px]" role="group" aria-labelledby="calorie-heading">
                        <FormFieldWrapper label="Возраст" htmlFor="age" className="max-sm:w-full">
                            <Input
                                rounded={false}
                                autofocus
                                id="age"
                                value={age}
                                onChange={handleAgeChange}
                                className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                ariaLabel="Возраст"
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Вес (кг)" htmlFor="weight" className="max-sm:w-full">
                            <Input
                                rounded={false}
                                id="weight"
                                value={weight}
                                onChange={handleWeightChange}
                                className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                ariaLabel="Вес"
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Рост (см)" htmlFor="height" className="max-sm:w-full">
                            <Input
                                rounded={false}
                                id="height"
                                value={height}
                                onChange={handleHeightChange}
                                className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                ariaLabel="Рост"
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper labelNone className="w-[120px] max-sm:w-full">
                            <SelectList
                                onSelectClick={onSelectGenderClick}
                                isOpenSelect={isOpenSelectGender}
                                onSelectItemClick={onSelectGenderItemClick}
                                items={["Мужской", "Женский"]}
                                selectedItem={gender}
                                className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] w-[120px] max-sm:w-full"
                                ariaDescribedby="Пол"
                            />
                        </FormFieldWrapper>
                    </div>
                    <FormFieldWrapper labelNone className="w-full mb-[10px]">
                        <SelectList
                            onSelectClick={onSelectActivityClick}
                            isOpenSelect={isOpenSelectActivity}
                            onSelectItemClick={onSelectActivityItemClick}
                            items={["Сидячий образ жизни", "Слабая активность", "Умеренная активность", "Высокая активность", "Супер активность"]}
                            selectedItem={activity}
                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] max-sm:w-full"
                            ariaDescribedby="Уровень активности"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper labelNone className="w-full mb-[10px]">
                        <SelectList
                            onSelectClick={onSelectFormulaClick}
                            isOpenSelect={isOpenSelectFormula}
                            onSelectItemClick={onSelectFormulaItemClick}
                            items={["Миффлина-Сен Жеора", "Харриса-Бенедикта"]}
                            selectedItem={formula}
                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                            ariaDescribedby="Формула расчета"
                        />
                    </FormFieldWrapper>
                    <Button
                        onClick={calculateCalories}
                        className={cn(
                            "leading-[0] min-h-[62px] max-sm:min-h-[48px] shadow bg-blue-500 text-white hover:bg-blue-600 max-sm:hover:bg-blue-600 max-sm:hover:text-inherit border-0 rounded text-[20px] max-sm:text-[16px]",
                            {
                                "opacity-50 cursor-default": !Number(age) || !Number(weight) || !Number(height)
                            }
                        )}
                        ariaLabel="Рассчитать калории">
                        Рассчитать
                    </Button>
                </div>
                <div className="mt-[20px] max-sm:mt-[10px]  mx-auto max-w-[750px]" role="group" aria-labelledby="calorie-heading">
                    {calories && (
                        <div>
                            <h2 className="text-[18px] text-center mb-[10px]" id="calorie-heading">
                                Ваша суточная норма калорий
                            </h2>
                            <p>
                                <span className="font-bold">Для поддержания веса:</span> {calories.maintenance} ккал
                            </p>
                            <p>
                                <span className="font-bold">Для сброса веса:</span> {calories.loseWeight} ккал
                            </p>
                            <p>
                                <span className="font-bold">Для набора мышечной массы:</span> {calories.gainMuscle} ккал
                            </p>
                            {bmi !== null && (
                                <div>
                                    <p>
                                        <span className="font-bold">Индекс массы тела:</span> {bmi.toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {macronutrients && (
                        <div>
                            <p>
                                <span className="font-bold">Белки:</span> {macronutrients.protein} г
                            </p>
                            <p>
                                <span className="font-bold">Жиры:</span> {macronutrients.fat} г
                            </p>
                            <p>
                                <span className="font-bold">Углеводы:</span> {macronutrients.carbs} г
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CalorieCalculator;
