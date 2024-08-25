"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "shared/ui/Input/Input";
import cn from "classnames";
import { sanitizePercents, sanitizeSymbols } from "helpers/sanitizeSymbols";
import { formatPrice } from "helpers/formatPrice";
import { ANUI, CREDIT_TIME, DIFF, MONTHLY_PAYMENT, TERMS } from "../../../const";
import { Content } from "./content";
import { Anui } from "./anui";
import { Diff } from "./diff";
import { ScheduleModal } from "./scheduleModal";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { SelectList } from "../SelectList";
import { CreditTime } from "./credit-time";
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

const CreditCalculator = () => {
    const [creditSumValue, setCreditSumValue] = useState<any>(1000000);
    const [percent, setPercent] = useState<any>(5);
    const [creditTerm, setCreditTerm] = useState<any>("1 год");
    const [monthlyPayment, setMonthlyPayment] = useState<any>(0);
    const [creditTime, setCreditTime] = useState<any>(0);
    const [diffOverPaid, setDiffOverPaid] = useState<any>(0);
    const [isOpenSelect, setIsOpenSelect] = useState<any>(false);
    const [isOpenSelectType, setIsOpenSelectType] = useState<any>(false);
    const [isOpenSelectCreditType, setIsOpenSelectCreditType] = useState<any>(false);
    const refCreditSum = useRef(null);
    const refPercent = useRef(null);
    const refMonthlyPayment = useRef(null);
    const [paymentSchedule, setPaymentSchedule] = useState<any>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMonthlyPayment, setErrorMonthlyPayment] = useState(false);
    const [errorCS, setErrorCS] = useState(false);
    const [creditTimeError, setCreditTimeError] = useState(false);
    const [errorPercent, setErrorPercent] = useState(false);

    const [monthlyPaymentInputValue, setMonthlyPaymentInputValue] = useState<any>(10000);

    const [type, setType] = useState<any>(ANUI);
    const [creditType, setCreditType] = useState<any>(MONTHLY_PAYMENT);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChangeCreditSum = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        if (creditType === MONTHLY_PAYMENT) {
            setErrorCS(Number(sanitized) === 0);
        }

        if (creditType === CREDIT_TIME) {
            setErrorCS(Number(sanitized) <= Number(monthlyPaymentInputValue));
        }

        setCreditSumValue(sanitized);
    };

    const handleChangeMonthlyPayment = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        setErrorMonthlyPayment(Number(sanitized) >= Number(creditSumValue));

        setMonthlyPaymentInputValue(sanitized);
    };

    const handlePercentChange = (value: any) => {
        const sanitized = sanitizePercents(value);
        setErrorPercent(Number(sanitized) === 0);
        setPercent(sanitized);
    };

    const onSelectClick = () => {
        setIsOpenSelect((prev: any) => !prev);
        setIsOpenSelectType(false);
        setIsOpenSelectCreditType(false);
    };

    const onSelectItemClick = (value: any) => {
        setCreditTerm(value);
        setIsOpenSelect(false);
    };
    const onSelectTypeClick = () => {
        setIsOpenSelectType((prev: any) => !prev);
        setIsOpenSelectCreditType(false);
        setIsOpenSelect(false);
    };
    const onSelectTypeItemClick = (value: any) => {
        // if (value !== type) setMonthlyPayment(0);
        setType(value);
        setIsOpenSelectType(false);
    };

    const onSelectCreditTypeClick = (value: any) => {
        // if (value !== type) {
        //     setErrorMonthlyPayment(false);
        //     setErrorCS(false);
        //     setErrorPercent(false);
        //     setCreditTimeError(false);
        // }
        setIsOpenSelectCreditType((prev: any) => !prev);
        setIsOpenSelect(false);
        setIsOpenSelectType(false);
    };
    const onSelectCreditTypeItemClick = (value: any) => {
        setCreditType(value);
        setIsOpenSelectCreditType(false);
        setIsOpenSelect(false);
    };

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
        setMonthlyPayment,
        setPaymentSchedule,
        type,
        monthlyPayment,
        diffOverPaid,
        setDiffOverPaid,
        setPercent
    };

    const scheduleProps = { modalIsOpen, csvData, setModalIsOpen, paymentSchedule, type };
    const creditTimeProps = {
        percent,
        creditSumValue,
        monthlyPaymentInputValue,
        setCreditTime,
        creditTime,
        setCreditTimeError,
        creditTimeError,
        creditTerm,
        setPaymentSchedule,
        creditType,
        setErrorCS,
        setErrorMonthlyPayment
    };

    return (
        <div className="pt-[60px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[1000px] px-[20px]">
            <div className="bg-blue-50 p-[40px] max-lg:p-[20px] rounded">
                <h1 className="text-center text-[24px] mb-[20px] font-bold">Кредитный калькулятор</h1>
                <div className="flex justify-between max-sm:flex-col">
                    <div className="flex flex-col w-1/2 max-sm:w-full">
                        <FormFieldWrapper label="Способ расчета">
                            <SelectList
                                onSelectClick={onSelectCreditTypeClick}
                                isOpenSelect={isOpenSelectCreditType}
                                onSelectItemClick={onSelectCreditTypeItemClick}
                                items={[MONTHLY_PAYMENT]}
                                selectedItem={creditType}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Сумма кредита" htmlFor="credit_sum">
                            {creditType === MONTHLY_PAYMENT && errorCS && <ErrorBadge text="СК не может быть 0" />}
                            {creditType === CREDIT_TIME && errorCS && <ErrorBadge text="СК не может быть меньше/равен ЕП" />}
                            <Input
                                ref={refCreditSum}
                                rounded={false}
                                className={cn({
                                    "!outline-red-600 !outline-2 !outline !border-transparent": errorCS
                                })}
                                id="credit_sum"
                                value={formatPrice(creditSumValue, false)}
                                onChange={handleChangeCreditSum}
                            />
                        </FormFieldWrapper>
                        {creditType === CREDIT_TIME && (
                            <FormFieldWrapper label="Ежемесячный платеж" htmlFor="monthly_payment">
                                {creditType === CREDIT_TIME && errorMonthlyPayment && <ErrorBadge text="ЕП не может быть больше/равен СК" />}
                                <Input
                                    ref={refMonthlyPayment}
                                    rounded={false}
                                    className={cn({
                                        "!outline-red-600 !outline-2 !outline !border-transparent": errorMonthlyPayment
                                    })}
                                    id="monthly_payment"
                                    value={formatPrice(monthlyPaymentInputValue, false)}
                                    onChange={handleChangeMonthlyPayment}
                                />
                            </FormFieldWrapper>
                        )}
                        <FormFieldWrapper label="Процентная ставка" htmlFor="percent">
                            {creditType === MONTHLY_PAYMENT && errorPercent && <ErrorBadge text="Процент не может быть 0" />}
                            <Input className={cn("")} ref={refPercent} rounded={false} id="percent" value={percent} onChange={handlePercentChange} />
                        </FormFieldWrapper>
                        {creditType === MONTHLY_PAYMENT && (
                            <FormFieldWrapper label="Срок кредита">
                                <SelectList
                                    onSelectClick={onSelectClick}
                                    isOpenSelect={isOpenSelect}
                                    onSelectItemClick={onSelectItemClick}
                                    items={keys}
                                    selectedItem={creditTerm}
                                />
                            </FormFieldWrapper>
                        )}
                        {creditType === MONTHLY_PAYMENT && (
                            <FormFieldWrapper label="Тип платежей">
                                <SelectList
                                    onSelectClick={onSelectTypeClick}
                                    isOpenSelect={isOpenSelectType}
                                    onSelectItemClick={onSelectTypeItemClick}
                                    items={[ANUI, DIFF]}
                                    selectedItem={type}
                                />
                            </FormFieldWrapper>
                        )}
                    </div>
                    <div className="ps-[20px] pt-[20px] max-sm:p-[0] max-sm:mt-[20px] relative w-2/3">
                        {!isMounted ? (
                            <Loader />
                        ) : (
                            !errorMonthlyPayment &&
                            !creditTimeError &&
                            !errorCS &&
                            !errorPercent && (
                                <>
                                    {creditType === MONTHLY_PAYMENT && type === DIFF ? (
                                        <Diff {...diffProps} />
                                    ) : creditType === MONTHLY_PAYMENT && type === ANUI ? (
                                        <Anui {...anuiProps} />
                                    ) : (
                                        <CreditTime {...creditTimeProps} />
                                    )}
                                    <div
                                        className="text-[#006af3] cursor-pointer font-bold mt-[20px] text-[20px]"
                                        onClick={() => setModalIsOpen(true)}>
                                        Скачать график платежей
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
            <Link href="/mortgage-calculator" className="bg-blue-50 mt-[15px] px-[15px] py-[5px] rounded inline-block text-black font-bold">
                Калькулятор ипотеки
            </Link>
            <Content />
            <ScheduleModal {...scheduleProps} />
        </div>
    );
};
export default CreditCalculator;
