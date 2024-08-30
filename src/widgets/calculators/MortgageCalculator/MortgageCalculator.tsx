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
import { formatYearsText } from "helpers/formatMonths";

const keys = Object.keys(TERMS);

export const csvDataHeaders = [
    { label: "Дата", key: "date" },
    { label: "Платеж", key: "payment" },
    { label: "Погашено", key: "principal" },
    { label: "Остаток", key: "balance" },
    { label: "Проценты", key: "interest" }
];

interface Props {
    creditSum: number;
    years: number;
    isMainPage?: boolean;
    paymentValue: number;
    isCreditTime?: boolean;
    h1: string;
    percent?: number;
    isCountryIpoteka?: boolean;
    isItIpoteka?: boolean;
    isInitialPaymentIpoteka?: boolean;
}

const MortgageCalculator = (props: Props) => {
    const initialState = {
        creditSum: props.creditSum,
        years: `${props.years} ${formatYearsText(props.years)}`,
        paymentValue: props.paymentValue,
        percent: props.percent || 5
    };

    const [creditSumValue, setCreditSumValue] = useState<any>(initialState.creditSum);
    const [initialPaymentValue, setInitialPaymentValue] = useState<any>(initialState.paymentValue);
    const [percent, setPercent] = useState<any>(initialState.percent);
    const [creditTerm, setCreditTerm] = useState<any>(initialState.years);

    const [initialPaymentPercent, setInitialPaymentPercent] = useState<any>((+initialPaymentValue / +creditSumValue) * 100);
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
    const [errorPercentTooBig, setErrorPercentTooBig] = useState(false);

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
        setErrorPercentTooBig(Number(sanitized) > 99);
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

    const renderErrorPercent = () => {
        if (errorPercent) return <ErrorBadge text="Процент не может быть 0" />;
        if (errorPercentTooBig) return <ErrorBadge text="Процент не может быть больше 99" />;
        return null;
    };

    return (
        <div className="pt-[60px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[1000px] px-[20px]">
            <div className="bg-[#f7f7f7] p-[40px] max-lg:p-[20px] rounded">
                <h1 className="text-center text-[24px] mb-[20px] font-bold max-sm:text-[20px]">{props.h1}</h1>
                <div className="flex justify-between max-sm:flex-col">
                    <div className="flex flex-col w-1/2 max-sm:w-full">
                        <FormFieldWrapper label="Сумма ипотеки" htmlFor="credit_sum">
                            {errorCS && <ErrorBadge text="СИ не может быть меньше/равна ПВ" />}
                            <Input
                                ref={refCreditSum}
                                rounded={false}
                                id="credit_sum"
                                value={formattedCreditSumValue}
                                onChange={handleChangeCreditSum}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper label="Процентная ставка" htmlFor="percent">
                            {renderErrorPercent()}
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
                        {!isMounted ? (
                            <Loader />
                        ) : (
                            !errorPercent &&
                            !errorPercentTooBig &&
                            !errorCS &&
                            !errorPV &&
                            isMounted && (
                                <>
                                    {type === DIFF ? <Diff {...diffProps} /> : <Anui {...anuiProps} />}
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
            <Link href="/credit-calculator" className="bg-[#f7f7f7] mt-[15px] px-[15px] py-[5px] rounded inline-block text-black font-bold">
                Кредитный калькулятор
            </Link>
            <Content
                isMainPage={props.isMainPage}
                isCountryIpoteka={props.isCountryIpoteka}
                years={creditTerm}
                creditSum={creditSumValue}
                isItIpoteka={props.isItIpoteka}
                isInitialPaymentIpoteka={props.isInitialPaymentIpoteka}
                initialPayment={initialPaymentValue}
                percent={percent}
            />
            <ScheduleModal {...scheduleProps} />
        </div>
    );
};
export default MortgageCalculator;
