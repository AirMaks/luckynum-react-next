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
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";
import { SelectList } from "../SelectList";
import { CreditTime } from "./credit-time";
import Link from "next/link";
import { ErrorBadge } from "../ErrorBadge";
import Loader from "shared/ui/Loader/Loader";
import { formatYearsText } from "helpers/formatMonths";
import { formatRublesText } from "helpers/formatRublesText";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Кредитный калькулятор",
          "url": "https://lucky-num.ru/credit-calculator",
          "description": "Кредитный калькулятор поможет вам рассчитать ежемесячный платеж, срок кредита, а также произвести другие нужные вам расчеты.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

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

    const [loadingSchedule, setLoadingSchedule] = useState(false);

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
    };

    const onSelectItemClick = (value: any) => {
        setCreditTerm(value);
    };
    const onSelectTypeClick = () => {
        setIsOpenSelectType((prev: any) => !prev);
    };
    const onSelectTypeItemClick = (value: any) => {
        setType(value);
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
        errorPercent,
        modalIsOpen,
        setLoadingSchedule
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

    const scheduleProps = { modalIsOpen, csvData, setModalIsOpen, paymentSchedule, type, loadingSchedule };

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
        const handleOpenScheduleModal = () => {
            setLoadingSchedule(true);
            setModalIsOpen(true);
        };
        return (
            <div className="text-[#006af3] cursor-pointer font-medium mt-[20px] text-[20px] max-sm:text-[16px]" onClick={handleOpenScheduleModal}>
                Скачать график платежей
            </div>
        );
    };

    const renderCreditTypeSelect = () => {
        const creditTypeItemsArray = props.isMainPage ? [MONTHLY_PAYMENT, CREDIT_TIME] : [];
        if (!creditTypeItemsArray.length) return null;

        const onSelectCreditTypeClick = () => {
            setIsOpenSelectCreditType((prev: any) => !prev);
        };
        const onSelectCreditTypeItemClick = (value: any) => {
            setCreditType(value);
        };

        return (
            <FormFieldWrapper labelNone>
                <SelectList
                    ariaDescribedby="Выберите тип расчета кредита"
                    onSelectClick={onSelectCreditTypeClick}
                    isOpenSelect={isOpenSelectCreditType}
                    onSelectItemClick={onSelectCreditTypeItemClick}
                    items={creditTypeItemsArray}
                    selectedItem={creditType}
                    className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                />
            </FormFieldWrapper>
        );
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px] ms-auto me-auto max-w-[1000px]">
                <div className="bg-[#f5f5f7] shadow mt-[20px] max-sm:mt-[10px] p-[20px] rounded max-sm:px-[10px]">
                    <h1 className="text-center text-[24px] mb-[20px] font-medium max-sm:text-[17px]">{renderHeading()}</h1>
                    <div className="flex justify-between max-sm:flex-col">
                        <div className="flex flex-col w-1/2 max-sm:w-full gap-[15px]">
                            {renderCreditTypeSelect()}
                            <FormFieldWrapper label="Сумма кредита" htmlFor="credit_sum">
                                {renderErrorCS()}
                                <Input
                                    autofocus
                                    ariaLabel="Введите сумму кредита"
                                    ref={refCreditSum}
                                    rounded={false}
                                    id="credit_sum"
                                    value={formatPrice(creditSumValue, false)}
                                    onChange={handleChangeCreditSum}
                                    className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                />
                            </FormFieldWrapper>
                            {creditType === CREDIT_TIME && (
                                <FormFieldWrapper label="Ежемесячный платеж" htmlFor="monthly_payment">
                                    {renderErrorMP()}
                                    <Input
                                        ariaLabel="Введите ежемесячный платеж"
                                        ref={refMonthlyPayment}
                                        rounded={false}
                                        id="monthly_payment"
                                        value={formatPrice(monthlyPaymentInputValue, false)}
                                        onChange={handleChangeMonthlyPayment}
                                        className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                    />
                                </FormFieldWrapper>
                            )}
                            <FormFieldWrapper label="Процентная ставка" htmlFor="percent">
                                {renderErrorPercent()}
                                <Input
                                    ariaLabel="Введите процентную ставку"
                                    ref={refPercent}
                                    rounded={false}
                                    id="percent"
                                    value={percent}
                                    onChange={handlePercentChange}
                                    className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                />
                            </FormFieldWrapper>
                            {creditType === MONTHLY_PAYMENT && (
                                <FormFieldWrapper labelNone>
                                    <SelectList
                                        ariaDescribedby="Введите срок кредита"
                                        onSelectClick={onSelectClick}
                                        isOpenSelect={isOpenSelect}
                                        onSelectItemClick={onSelectItemClick}
                                        items={keys}
                                        selectedItem={creditTerm}
                                        className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                    />
                                </FormFieldWrapper>
                            )}
                            {creditType === MONTHLY_PAYMENT && (
                                <FormFieldWrapper labelNone>
                                    <SelectList
                                        ariaDescribedby="Введите аннуитетный или дифференцированный тип платежа"
                                        onSelectClick={onSelectTypeClick}
                                        isOpenSelect={isOpenSelectType}
                                        onSelectItemClick={onSelectTypeItemClick}
                                        items={[ANUI, DIFF]}
                                        selectedItem={type}
                                        className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                    />
                                </FormFieldWrapper>
                            )}
                        </div>
                        <div className="ps-[20px] max-sm:ps-[0] max-sm:mt-[20px] relative w-2/3 max-sm:w-full">
                            {!isMounted ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Loader />
                                </div>
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
                <Link
                    aria-label="Перейти на страницу калькулятора ипотеки"
                    href="/mortgage-calculator"
                    className="bg-[#f5f5f7] shadow max-sm:text-[14px] mt-[15px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
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
