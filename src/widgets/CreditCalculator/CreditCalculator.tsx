"use client";

import { useRef, useState } from "react";
import cls from "./CreditCalculator.module.scss";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import cn from "classnames";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { formatPrice } from "helpers/formatPrice";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";
import { TERMS } from "../../const";

const CreditCalculator = () => {
    const [creditSumValue, setCreditSumValue] = useState<any>(1000000);
    const [initialPaymentValue, setInitialPaymentValue] = useState<any>(0);
    const [initialPaymentPercent, setInitialPaymentPercent] = useState<any>(0);
    const [percent, setPercent] = useState<any>(5);
    const [creditTerm, setCreditTerm] = useState<any>("1 год");
    const [monthlyPayment, setMonthlyPayment] = useState<any>(0);
    const [diffOverPaid, setDiffOverPaid] = useState<any>(0);
    const [errorPercent, setErrorPercent] = useState<any>(false);
    const [isOpenSelect, setIsOpenSelect] = useState<any>(false);
    const [isOpenSelectType, setIsOpenSelectType] = useState<any>(false);
    const refCreditSum = useRef(null);
    const refPercent = useRef(null);
    const refInitialPayment = useRef(null);
    const [paymentSchedule, setPaymentSchedule] = useState<any>([]);
    const DIFF = "Дифференцированный тип платежей";
    const ANUI = "Аннуитетный тип платежей";
    const [type, setType] = useState<any>(ANUI);

    const calculatePaymentScheduleAnui = () => {
        const monthlyInterestRate = percent / 12 / 100;
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        const monthlyPayment = ((creditSumValue - initialPaymentValue) * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        let remainingBalance = creditSumValue - initialPaymentValue;
        const schedule: any = [];

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = parseFloat(monthlyPayment.toFixed(2)) - interestPayment;
            remainingBalance -= principalPayment;

            const paymentDate = new Date();
            paymentDate.setMonth(paymentDate.getMonth() + i);

            const payment = {
                date: paymentDate.toLocaleDateString("ru-RU"),
                balance: remainingBalance,
                interest: interestPayment,
                principal: principalPayment,
                payment: monthlyPayment
            };

            schedule.push(payment);
        }
        setPaymentSchedule(schedule);
    };

    const calculatePaymentScheduleDiff = () => {
        const monthlyInterestRate = percent / 12 / 100;
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        let remainingBalance = creditSumValue - initialPaymentValue;
        const schedule = [];

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = (creditSumValue - initialPaymentValue) / totalMonths;
            remainingBalance -= principalPayment;

            const paymentDate = new Date();
            paymentDate.setMonth(paymentDate.getMonth() + i);

            const payment = {
                date: paymentDate.toLocaleDateString("ru-RU"),
                balance: remainingBalance,
                interest: interestPayment,
                principal: principalPayment,
                payment: principalPayment + interestPayment
            };

            schedule.push(payment);
        }
        setPaymentSchedule(schedule);
    };

    const calculateMonthlyPayment = () => {
        if (percent === "0." || percent === "0" || percent === "") {
            setErrorPercent(true);
            return false;
        }
        calculatePaymentScheduleAnui();
        setErrorPercent(false);
        const newCreditTerm = TERMS[creditTerm];
        const monthlyInterest = parseFloat(percent) / 100 / 12;
        const totalPayments = Math.round(newCreditTerm * 12);
        const remainingBalance = creditSumValue - initialPaymentValue;
        const payment = (remainingBalance * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments));
        setMonthlyPayment(parseFloat(payment.toFixed(2)));
    };

    const calculateMonthlyPaymentDiff = () => {
        if (percent === "0." || percent === "0" || percent === "") {
            setErrorPercent(true);
            return false;
        }
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        const interestRate = parseFloat(percent) / 100;
        const monthlyInterestRate = interestRate / 12;
        const principalPayment = (creditSumValue - initialPaymentValue) / totalMonths;
        const payments = [];
        calculatePaymentScheduleDiff();
        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = (creditSumValue - initialPaymentValue - (i - 1) * principalPayment) * monthlyInterestRate;
            const monthlyPayment = principalPayment + interestPayment;
            payments.push(monthlyPayment);
        }
        const totalSum = payments.reduce((acc, curr) => acc + parseFloat(curr.toFixed(2)), 0);
        setDiffOverPaid(parseFloat((totalSum - creditSumValue + +initialPaymentValue).toFixed(2)));
        setMonthlyPayment(payments);
    };

    const handleChangeCreditSum = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        setMonthlyPayment(0);
        setCreditSumValue(sanitized);
        const percent = (+initialPaymentValue / +sanitized) * 100;
        setInitialPaymentPercent(percent);
    };

    const handleChangeInitialPayment = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        setMonthlyPayment(0);
        setInitialPaymentValue(sanitized);
        const percent = (+sanitized / +creditSumValue) * 100;
        setInitialPaymentPercent(percent);
    };

    const handlePercentChange = (value: any) => {
        setMonthlyPayment(0);
        const newValue = value.replace(/[^\d.]/g, "");
        setPercent(newValue);
    };

    const onSelectClick = () => {
        setIsOpenSelect((prev: any) => !prev);
        setIsOpenSelectType(false);
    };

    const onSelectItemClick = (value: any) => {
        if (value !== creditTerm) setMonthlyPayment(0);
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
    const formattedCreditSumValue = formatPrice(creditSumValue);
    const formattedInitialPaymentValue = formatPrice(initialPaymentValue);
    const keys = Object.keys(TERMS);

    return (
        <>
            <div className={cls.Calculator}>
                <h1 className={cls.heading}>Кредитный калькулятор</h1>
                <div className={cn(cls.container, {}, [])}>
                    <div className={cls.Field}>
                        <label htmlFor="credit_sum">Сумма кредита</label>
                        <Input ref={refCreditSum} rounded={false} id="credit_sum" value={formattedCreditSumValue} onChange={handleChangeCreditSum} />
                    </div>
                    <div className={cls.Field}>
                        <label htmlFor="percent">Процентная ставка</label>
                        <Input
                            className={cn("", { [cls.errorPercent]: errorPercent }, [])}
                            ref={refPercent}
                            rounded={false}
                            id="percent"
                            value={percent}
                            onChange={handlePercentChange}
                        />
                    </div>
                    <div className={cls.Field}>
                        <div className={cls.label}>Срок кредита</div>
                        {
                            <div className={cls.Select}>
                                <ArrowIcon className={cls.arrowIcon} />
                                <div onClick={onSelectClick}>{creditTerm}</div>
                                <div className={cn(cls.selectListTerm, { [cls.openSelect]: isOpenSelect }, ["bg-white"])}>
                                    {keys.map((el, i) => {
                                        return (
                                            <div
                                                onClick={() => onSelectItemClick(el)}
                                                className={cn("", { [cls.selected]: el === creditTerm }, [])}
                                                key={i}>
                                                {el}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={cn(cls.container, {}, [])}>
                    <div className={cn(cls.Field, {}, ["w-100"])}>
                        <label htmlFor="initial_payment">
                            Первоначальный взнос
                            {initialPaymentPercent >= 0.01 ? ` = ${Number(parseFloat(initialPaymentPercent).toFixed(2))}%` : ""}
                        </label>
                        <Input
                            ref={refInitialPayment}
                            rounded={false}
                            id="initial_payment"
                            value={formattedInitialPaymentValue}
                            onChange={handleChangeInitialPayment}
                        />
                    </div>
                </div>
                <div className={cls.Field}>
                    <div className={cls.SelectType}>
                        <ArrowIcon className={cls.arrowIcon} />
                        <div onClick={onSelectTypeClick}>{type}</div>
                        <div className={cn(cls.selectList, { [cls.openSelect]: isOpenSelectType }, ["bg-white"])}>
                            <div onClick={() => onSelectTypeItemClick(ANUI)} className={cn("", { [cls.selected]: type === ANUI }, [])}>
                                {ANUI}
                            </div>
                            <div onClick={() => onSelectTypeItemClick(DIFF)} className={cn("", { [cls.selected]: type === DIFF }, [])}>
                                {DIFF}
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    className={cn(cls.Button, {}, ["min-h-[62px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded my-2"])}
                    border
                    onClick={type === DIFF ? calculateMonthlyPaymentDiff : calculateMonthlyPayment}>
                    Рассчитать кредит
                </Button>
                {(monthlyPayment > 0 || monthlyPayment.length > 0) && (
                    <>
                        <div className={cn(cls.finalPayment, {}, [])}>
                            <div className="d-inline-block">
                                <b>Ежемесячный платеж:</b>
                            </div>
                            <span>
                                {type === DIFF
                                    ? `${formatPrice(parseFloat(monthlyPayment[0].toFixed(2)))} ₽ ... ${formatPrice(
                                          parseFloat(monthlyPayment[monthlyPayment.length - 1].toFixed(2))
                                      )} ₽`
                                    : `${formatPrice(parseFloat(monthlyPayment.toFixed(2)))} ₽`}
                            </span>
                        </div>
                        <div className={cn(cls.finalPayment, {}, [])}>
                            <div className="d-inline-block">
                                <b>Переплата по кредиту:</b>
                            </div>
                            <span>
                                {type === DIFF
                                    ? `${formatPrice(diffOverPaid)} ₽`
                                    : `${formatPrice(
                                          parseFloat(
                                              (monthlyPayment * Math.round(TERMS[creditTerm] * 12) - creditSumValue + +initialPaymentValue).toFixed(2)
                                          )
                                      )} ₽`}
                            </span>
                        </div>
                        <div className={cn(cls.finalPayment, {}, [])}>
                            <div className="d-inline-block">
                                <b>Общая выплата:</b>
                            </div>
                            <span>
                                {type === DIFF
                                    ? `${formatPrice(+diffOverPaid + +creditSumValue - +initialPaymentValue)} ₽`
                                    : `${formatPrice(
                                          parseFloat(
                                              (monthlyPayment * Math.round(TERMS[creditTerm] * 12) - creditSumValue + +initialPaymentValue).toFixed(2)
                                          ) +
                                              +creditSumValue -
                                              +initialPaymentValue
                                      )} ₽`}
                            </span>
                        </div>
                        <div className="mb-10">График платежей</div>
                        <div className={cn(cls.paymentTable, {}, ["sm-w-[calc(10vw - 40px)]"])}>
                            {paymentSchedule.length > 0 && (
                                <>
                                    <div className={cls.tableHeader}>
                                        <div>Дата</div>
                                        <div>Платеж</div>
                                        <div>Погашено</div>
                                        <div>Остаток</div>
                                        <div>Проценты</div>
                                    </div>
                                    <div className={cls.tableOverflow}>
                                        {paymentSchedule.map((payment: any, index: number) => (
                                            <div key={index} className={cls.tableRow}>
                                                <div>
                                                    <b>{payment.date}</b>
                                                </div>
                                                <div>
                                                    <b>{formatPrice(parseFloat(payment.payment.toFixed(2)))}</b>
                                                </div>
                                                <div>
                                                    <b>{formatPrice(parseFloat(payment.principal.toFixed(2)))}</b>
                                                </div>
                                                <div>
                                                    {Math.round(payment.balance) >= 0 ? formatPrice(parseFloat(payment.balance.toFixed(2))) : 0}
                                                </div>
                                                <div>{formatPrice(parseFloat(payment.interest.toFixed(2)))}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
export default CreditCalculator;
