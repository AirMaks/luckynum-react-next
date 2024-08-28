"use client";

import { TERMS } from "const";
import { formatPrice } from "helpers/formatPrice";
import { useEffect } from "react";
import { SummaryItem } from "../SummaryItem";
import { DifferenceBar } from "../DifferenceBar";

export const Anui = (props: any) => {
    const {
        percent,
        creditTerm,
        creditSumValue,
        setMonthlyPayment,
        setPaymentSchedule,
        type,
        monthlyPayment,
        setErrorCreditSumZero,
        setErrorPercentTooBig,
        setErrorPercent,
        errorPercentTooBig,
        errorPercent,
        errorCreditSumZero
    } = props;

    useEffect(() => {
        calculateMonthlyPayment();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, creditSumValue, percent, creditTerm]);

    const calculateMonthlyPayment = () => {
        calculatePaymentSchedule();
        const newCreditTerm = TERMS[creditTerm];
        const monthlyInterest = percent / 100 / 12;
        const totalPayments = Math.round(newCreditTerm * 12);

        setErrorCreditSumZero(Number(creditSumValue) === 0);
        setErrorPercentTooBig(Number(percent) > 99);
        setErrorPercent(Number(percent) === 0);
        const payment = (creditSumValue * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments));
        setMonthlyPayment(payment);
    };

    const calculatePaymentSchedule = () => {
        const monthlyInterestRate = percent / 12 / 100;
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        const monthlyPayment = (creditSumValue * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        let remainingBalance = creditSumValue;
        const schedule: any = [];

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
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

    const totalPayment = monthlyPayment * Math.round(TERMS[creditTerm] * 12) - +creditSumValue + +creditSumValue;

    const calculateWidth = (creditSumValue / totalPayment) * 100;
    const overPay = monthlyPayment * Math.round(TERMS[creditTerm] * 12) - creditSumValue;

    const hasErrors = errorPercentTooBig || errorPercent || errorCreditSumZero;
    return (
        <>
            <SummaryItem text="Ежемесячный платеж:" value={hasErrors ? "" : formatPrice(monthlyPayment > 0 ? monthlyPayment : 0)} />
            <SummaryItem text="Общая выплата:" value={hasErrors ? "" : formatPrice(totalPayment > 0 ? totalPayment : 0)} />
            <SummaryItem
                text="Сумма кредита:"
                value={hasErrors ? "" : formatPrice(creditSumValue > 0 ? creditSumValue : 0)}
                className="text-[#0168af]"
            />
            <SummaryItem text="Переплата по кредиту:" value={hasErrors ? "" : formatPrice(overPay > 0 ? overPay : 0)} className="text-[#489b00]" />
            {!hasErrors && <DifferenceBar width={calculateWidth} />}
        </>
    );
};
