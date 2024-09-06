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
import { formatYearsText } from "helpers/formatMonths";
import { formatRublesText } from "helpers/formatRublesText";
import YandexAd from "app/adds";

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
    paymentValue?: number;
    isCreditTime?: boolean;
    h1?: string;
    percent?: number;
    isMonthlyPayment?: boolean;
    isAutoCredit?: boolean;
}

const CreditCalculator = (props: Props) => {
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

    const [errorPercent, setErrorPercent] = useState(false);

    const [errorCreditSumZero, setErrorCreditSumZero] = useState(false);
    const [errorIsMonthlyPaymentNotCover, setErrorIsMonthlyPaymentNotCover] = useState(false);
    const [errorCreditSumLessMonthlyPayment, setErrorCreditSumLessMonthlyPayment] = useState(false);
    const [errorPercentTooBig, setErrorPercentTooBig] = useState(false);
    const [errorCreditTimeTooBig, setErrorCreditTimeTooBig] = useState(false);

    const [type, setType] = useState<any>(ANUI);
    const [creditType, setCreditType] = useState<any>(props.isCreditTime ? CREDIT_TIME : MONTHLY_PAYMENT);

    const initialState = {
        creditSum: props.creditSum,
        years: `${props.years} ${formatYearsText(props.years)}`,
        paymentValue: props.paymentValue || 10000,
        percent: props.percent || 5
    };

    const [creditSumValue, setCreditSumValue] = useState<any>(initialState.creditSum);
    const [monthlyPaymentInputValue, setMonthlyPaymentInputValue] = useState<any>(initialState.paymentValue);
    const [percent, setPercent] = useState<any>(initialState.percent);
    const [creditTerm, setCreditTerm] = useState<any>(initialState.years);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChangeCreditSum = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        setCreditSumValue(sanitized);
    };

    const handleChangeMonthlyPayment = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        setMonthlyPaymentInputValue(sanitized);
    };

    const handlePercentChange = (value: any) => {
        const sanitized = sanitizePercents(value);
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
        setType(value);
        setIsOpenSelectType(false);
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

    const defaultProps = {
        percent,
        creditSumValue,
        setPaymentSchedule,
        setErrorPercentTooBig,
        setErrorPercent,
        errorPercentTooBig,
        errorPercent
    };

    const anuiProps = {
        ...defaultProps,
        creditTerm,
        setMonthlyPayment,
        type,
        monthlyPayment,
        setErrorCreditSumZero,
        errorCreditSumZero
    };

    const diffProps = {
        ...defaultProps,
        creditTerm,
        setMonthlyPayment,
        type,
        monthlyPayment,
        diffOverPaid,
        setDiffOverPaid,
        setErrorCreditSumZero,
        errorCreditSumZero
    };

    const creditTimeProps = {
        ...defaultProps,
        monthlyPaymentInputValue,
        setCreditTime,
        creditTime,
        creditType,
        setErrorIsMonthlyPaymentNotCover,
        setErrorCreditSumLessMonthlyPayment,
        setErrorCreditTimeTooBig,
        errorCreditSumLessMonthlyPayment,
        errorCreditTimeTooBig,
        errorIsMonthlyPaymentNotCover
    };

    const scheduleProps = { modalIsOpen, csvData, setModalIsOpen, paymentSchedule, type };

    const renderErrorCS = () => {
        if (creditType === MONTHLY_PAYMENT) {
            if (errorCreditSumZero) return <ErrorBadge text="СК не может быть равной 0" />;
        }
        if (creditType === CREDIT_TIME) {
            if (errorCreditSumLessMonthlyPayment) return <ErrorBadge text="СК не может быть меньше/равен ЕП" />;
            if (errorCreditTimeTooBig) return <ErrorBadge text="Срок кредита превышает 50 лет" />;
        }
        return null;
    };

    const renderErrorMP = () => {
        if (errorCreditSumLessMonthlyPayment) return <ErrorBadge text="ЕП не может быть больше/равен СК" />;
        if (errorIsMonthlyPaymentNotCover) return <ErrorBadge text="ЕП не покрывает проценты по кредиту" />;
        return null;
    };

    const renderErrorPercent = () => {
        if (errorPercent) return <ErrorBadge text="Процент не может быть 0" />;
        if (errorPercentTooBig) return <ErrorBadge text="Процент не может быть больше 99" />;
        return null;
    };

    const renderHeading = () => {
        if (props.h1) return props.h1;
        if (!props.isMainPage)
            return `Рассчитать кредит ${formatPrice(creditSumValue, false)} ${formatRublesText(creditSumValue)} ${`на ${creditTerm}`}`;
        return "Кредитный калькулятор";
    };

    const renderDownloadBtn = () => {
        if (
            errorCreditTimeTooBig ||
            errorPercentTooBig ||
            errorPercent ||
            errorCreditSumZero ||
            errorIsMonthlyPaymentNotCover ||
            errorCreditSumLessMonthlyPayment
        ) {
            return null;
        }
        return (
            <div className="text-[#006af3] cursor-pointer font-bold mt-[20px] text-[20px]" onClick={() => setModalIsOpen(true)}>
                Скачать график платежей
            </div>
        );
    };

    const renderCreditTypeSelect = () => {
        const creditTypeItemsArray = props.isMainPage ? [MONTHLY_PAYMENT, CREDIT_TIME] : [];
        if (!creditTypeItemsArray.length) return null;

        const onSelectCreditTypeClick = (value: any) => {
            setIsOpenSelectCreditType((prev: any) => !prev);
            setIsOpenSelect(false);
            setIsOpenSelectType(false);
        };
        const onSelectCreditTypeItemClick = (value: any) => {
            setCreditType(value);
            setIsOpenSelectCreditType(false);
            setIsOpenSelect(false);
        };

        return (
            <FormFieldWrapper label="Способ расчета">
                <SelectList
                    onSelectClick={onSelectCreditTypeClick}
                    isOpenSelect={isOpenSelectCreditType}
                    onSelectItemClick={onSelectCreditTypeItemClick}
                    items={creditTypeItemsArray}
                    selectedItem={creditType}
                />
            </FormFieldWrapper>
        );
    };

    return (
        <>
            <YandexAd className="max-w-[430px] h-[70px] mx-auto mt-[20px] px-[10px] max-sm:mt-[0]" />
            <div className="pt-[60px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[1000px] px-[20px]">
                <div className="bg-[#f7f7f7] p-[40px] max-lg:p-[20px] rounded">
                    <h1 className="text-center text-[24px] mb-[20px] font-bold max-sm:text-[20px]">{renderHeading()}</h1>
                    <div className="flex justify-between max-sm:flex-col">
                        <div className="flex flex-col w-1/2 max-sm:w-full">
                            {renderCreditTypeSelect()}
                            <FormFieldWrapper label="Сумма кредита" htmlFor="credit_sum">
                                {renderErrorCS()}
                                <Input
                                    ref={refCreditSum}
                                    rounded={false}
                                    id="credit_sum"
                                    value={formatPrice(creditSumValue, false)}
                                    onChange={handleChangeCreditSum}
                                />
                            </FormFieldWrapper>
                            {creditType === CREDIT_TIME && (
                                <FormFieldWrapper label="Ежемесячный платеж" htmlFor="monthly_payment">
                                    {renderErrorMP()}
                                    <Input
                                        ref={refMonthlyPayment}
                                        rounded={false}
                                        id="monthly_payment"
                                        value={formatPrice(monthlyPaymentInputValue, false)}
                                        onChange={handleChangeMonthlyPayment}
                                    />
                                </FormFieldWrapper>
                            )}
                            <FormFieldWrapper label="Процентная ставка" htmlFor="percent">
                                {renderErrorPercent()}
                                <Input
                                    className={cn("")}
                                    ref={refPercent}
                                    rounded={false}
                                    id="percent"
                                    value={percent}
                                    onChange={handlePercentChange}
                                />
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
                                <>
                                    {creditType === MONTHLY_PAYMENT && type === DIFF ? (
                                        <Diff {...diffProps} />
                                    ) : creditType === MONTHLY_PAYMENT && type === ANUI ? (
                                        <Anui {...anuiProps} />
                                    ) : (
                                        <CreditTime {...creditTimeProps} />
                                    )}
                                    {renderDownloadBtn()}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Link href="/mortgage-calculator" className="bg-[#f7f7f7] mt-[15px] px-[15px] py-[5px] rounded inline-block text-black font-bold">
                    Калькулятор ипотеки
                </Link>
                <Content
                    isMonthlyPayment={props.isMonthlyPayment}
                    years={creditTerm}
                    creditSum={creditSumValue}
                    isMainPage={props.isMainPage}
                    isCreditTime={props.isCreditTime}
                    isAutoCredit={props.isAutoCredit}
                />
                <ScheduleModal {...scheduleProps} />
            </div>
        </>
    );
};
export default CreditCalculator;
