"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "shared/ui/Input/Input";
import cn from "classnames";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";
import { formatPrice } from "helpers/formatPrice";
import { ANUI, DIFF, TERMS } from "../../../const";
import { Content } from "./content";
import { Anui } from "./anui";
import { Diff } from "./diff";
import { ScheduleModal } from "./scheduleModal";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { SelectList } from "../SelectList";
import Link from "next/link";
import { ErrorBadge } from "../ErrorBadge";
import Loader from "shared/ui/Loader/Loader";

const keys = Object.keys(TERMS);

export const csvDataHeaders = [
    { label: "Дата", key: "date" },
    { label: "Платеж", key: "payment" },
    { label: "Погашено", key: "principal" },
    { label: "Остаток", key: "balance" },
    { label: "Проценты", key: "interest" }
];

const MortgageCalculator = () => {
    const [creditSumValue, setCreditSumValue] = useState<any>(1000000);
    const [initialPaymentValue, setInitialPaymentValue] = useState<any>(0);
    const [initialPaymentPercent, setInitialPaymentPercent] = useState<any>(0);
    const [percent, setPercent] = useState<any>(5);
    const [creditTerm, setCreditTerm] = useState<any>("1 год");
    const [monthlyPayment, setMonthlyPayment] = useState<any>(0);
    const [diffOverPaid, setDiffOverPaid] = useState<any>(0);
    const [isOpenSelect, setIsOpenSelect] = useState<any>(false);
    const [isOpenSelectType, setIsOpenSelectType] = useState<any>(false);
    const refCreditSum = useRef(null);
    const refPercent = useRef(null);
    const refInitialPayment = useRef(null);
    const [paymentSchedule, setPaymentSchedule] = useState<any>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorPV, setErrorPV] = useState(false);
    const [errorCS, setErrorCS] = useState(false);
    const [errorPercent, setErrorPercent] = useState(false);

    const [type, setType] = useState<any>(ANUI);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
      }, []);

    const handleChangeCreditSum = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();

        setErrorCS(Number(sanitized) <= Number(initialPaymentValue));
        setErrorPV(Number(sanitized) <= Number(initialPaymentValue));

        setCreditSumValue(sanitized);
        const percent = (+initialPaymentValue / +sanitized) * 100;
        setInitialPaymentPercent(percent);
    };

    const handleChangeInitialPayment = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();

        setErrorPV(Number(sanitized) >= creditSumValue);
        setErrorCS(Number(sanitized) >= creditSumValue);
        setInitialPaymentValue(sanitized);
        const percent = (+sanitized / +creditSumValue) * 100;
        setInitialPaymentPercent(percent);
    };

    const handlePercentChange = (value: any) => {
        const sanitized = sanitizePercents(value);
        setErrorPercent(Number(sanitized) === 0);
        setPercent(sanitized);
    };

    const onSelectClick = () => {
        setIsOpenSelect((prev: any) => !prev);
        setIsOpenSelectType(false);
    };

    const onSelectItemClick = (value: any) => {
        setCreditTerm(value);
        setIsOpenSelect(false);
    };
    const onSelectTypeClick = () => {
        setIsOpenSelectType((prev: any) => !prev);
        setIsOpenSelect(false);
    };
    const onSelectTypeItemClick = (value: any) => {
        if (value !== type) setMonthlyPayment(0);
        setType(value);
        setIsOpenSelectType(false);
    };
    const formattedCreditSumValue = formatPrice(creditSumValue, false);
    const formattedInitialPaymentValue = formatPrice(initialPaymentValue, false);

    const csvData = (paymentSchedule || []).reduce((acc: any, curr: any) => {
        acc.push({
            date: curr.date,
            payment: formatPrice(curr.payment),
            principal: formatPrice(curr.principal),
            balance: formatPrice(curr.balance),
            interest: formatPrice(curr.interest)
        });

        return acc;
    }, []);

    const anuiProps = {
        percent,
        creditTerm,
        creditSumValue,
        initialPaymentValue,
        setMonthlyPayment,
        setPaymentSchedule,
        type,
        monthlyPayment,
        setPercent
    };

    const diffProps = {
        percent,
        creditTerm,
        creditSumValue,
        initialPaymentValue,
        setMonthlyPayment,
        setPaymentSchedule,
        type,
        monthlyPayment,
        diffOverPaid,
        setDiffOverPaid,
        setPercent
    };

    const scheduleProps = { modalIsOpen, csvData, setModalIsOpen, paymentSchedule, type };



    return (
        <div className="pt-[60px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[1000px] px-[20px]">
            <div className="bg-blue-50 p-[40px] max-lg:p-[20px] rounded">
                <h1 className="text-center text-[24px] mb-[20px] font-bold">Калькулятор ипотеки</h1>
                <div className="flex justify-between max-sm:flex-col">
                    <div className="flex flex-col w-1/2 max-sm:w-full">
                        <FormFieldWrapper label="Сумма ипотеки" htmlFor="credit_sum">
                            {errorCS && <ErrorBadge text="СИ не может быть меньше/равна ПВ" />}
                            <Input
                                ref={refCreditSum}
                                rounded={false}
                                className={cn({
                                    "!outline-red-600 !outline-2 !outline !border-transparent": errorCS
                                })}
                                id="credit_sum"
                                value={formattedCreditSumValue}
                                onChange={handleChangeCreditSum}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Процентная ставка" htmlFor="percent">
                            {errorPercent && <ErrorBadge text="Процент не может быть 0" />}
                            <Input className={cn("")} ref={refPercent} rounded={false} id="percent" value={percent} onChange={handlePercentChange} />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Срок кредита">
                            <SelectList
                                onSelectClick={onSelectClick}
                                isOpenSelect={isOpenSelect}
                                onSelectItemClick={onSelectItemClick}
                                items={keys}
                                selectedItem={creditTerm}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper
                            htmlFor="initial_payment"
                            label={`Первоначальный взнос ${
                                Number(initialPaymentValue) === Number(creditSumValue)
                                    ? "100%"
                                    : `${Number(parseFloat(initialPaymentPercent).toFixed(2))} %`
                            }`}>
                            {errorPV && <ErrorBadge text="ПВ не может быть больше/равен СИ" />}
                            <Input
                                ref={refInitialPayment}
                                rounded={false}
                                id="initial_payment"
                                className={cn({
                                    "!outline-red-600 !outline-2 !outline !border-transparent": errorPV
                                })}
                                value={formattedInitialPaymentValue}
                                onChange={handleChangeInitialPayment}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Тип платежей">
                            <SelectList
                                onSelectClick={onSelectTypeClick}
                                isOpenSelect={isOpenSelectType}
                                onSelectItemClick={onSelectTypeItemClick}
                                items={[ANUI, DIFF]}
                                selectedItem={type}
                            />
                        </FormFieldWrapper>
                    </div>
                    <div className="ps-[20px] pt-[20px] max-sm:p-[0] max-sm:mt-[20px] relative w-2/3">
                        {!isMounted ? <Loader /> :
                            !errorPercent && !errorCS && !errorPV && isMounted && (
                                <>
                                    {type === DIFF ? <Diff {...diffProps} /> : <Anui {...anuiProps} />}
                                    <div className="text-[#006af3] cursor-pointer font-bold mt-[20px] text-[20px]" onClick={() => setModalIsOpen(true)}>
                                        Скачать график платежей
                                    </div>
                                </>)

                        }
                    </div>
                </div>
            </div>
            <Link href="/credit-calculator" className="bg-blue-50 mt-[15px] px-[15px] py-[5px] rounded inline-block text-black font-bold">
                Кредитный калькулятор
            </Link>
            <Content />
            <ScheduleModal {...scheduleProps} />
        </div>
    );
};
export default MortgageCalculator;
