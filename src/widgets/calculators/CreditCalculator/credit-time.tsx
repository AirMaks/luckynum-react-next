"use client";

import { formatPrice } from "helpers/formatPrice";
import { useEffect } from "react";
import { SummaryItem } from "../SummaryItem";
import { DifferenceBar } from "../DifferenceBar";
import { formatMonths } from "helpers/formatMonths";

export const CreditTime = (props: any) => {
    const {
        percent,
        creditSumValue,
        monthlyPaymentInputValue,
        setCreditTime,
        creditTime,
        setCreditTimeError,
        creditTimeError,
        setPaymentSchedule,
        creditType,
        setErrorCS,
        setErrorMonthlyPayment
    } = props;

    useEffect(() => {
        calculateCreditTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditSumValue, percent, monthlyPaymentInputValue, creditType]);

    const calculateCreditTime = () => {
        calculatePaymentSchedule();
        const monthlyInterestRate = percent / 12 / 100;
        console.log(Number(monthlyPaymentInputValue), creditSumValue * monthlyInterestRate);
        if (Number(creditSumValue) <= monthlyPaymentInputValue) {
            setErrorCS(true);
            setErrorMonthlyPayment(true);
        }
        setCreditTimeError(Number(monthlyPaymentInputValue) <= creditSumValue * monthlyInterestRate);
        if (Number(monthlyPaymentInputValue) <= creditSumValue * monthlyInterestRate)
            console.log("Ежемесячный платеж недостаточен для покрытия процентов по кредиту.");

        const creditTimeInMonths =
            Math.log(monthlyPaymentInputValue / (monthlyPaymentInputValue - creditSumValue * monthlyInterestRate)) /
            Math.log(1 + monthlyInterestRate);

        setCreditTime(creditTimeInMonths);
    };

    const calculatePaymentSchedule = () => {
        const monthlyInterestRate = percent / 12 / 100;
        let remainingBalance = creditSumValue;
        const schedule: any = [];
        let month = 0;

        // Если ежемесячный платеж не покрывает процент
        if (Number(monthlyPaymentInputValue) <= Number(remainingBalance) * Number(monthlyInterestRate)) {
            return;
        }

        while (remainingBalance > 0) {
            month++;
            const interestPayment = parseFloat((remainingBalance * monthlyInterestRate).toFixed(2));
            let principalPayment = parseFloat((monthlyPaymentInputValue - interestPayment).toFixed(2));

            if (principalPayment > remainingBalance) {
                principalPayment = remainingBalance; // Корректировка последнего платежа
            }

            remainingBalance = parseFloat((remainingBalance - principalPayment).toFixed(2));

            const paymentDate = new Date();
            paymentDate.setMonth(paymentDate.getMonth() + month);

            const payment = {
                date: paymentDate.toLocaleDateString("ru-RU"),
                balance: remainingBalance,
                interest: interestPayment,
                principal: principalPayment,
                payment: monthlyPaymentInputValue
            };

            schedule.push(payment);
        }
        setPaymentSchedule(schedule);
    };

    const totalPayment = monthlyPaymentInputValue * creditTime;

    const overPay = totalPayment - creditSumValue;

    const calculateWidth = (creditSumValue / totalPayment) * 100;

    const years = Math.floor(creditTime / 12);

    if (years >= 50) return <div>Срок кредита превышает 50 лет.</div>;
    if (creditTimeError) return <div>Ежемесячный платеж недостаточен для покрытия процентов по кредиту.</div>;

    return (
        <>
            <SummaryItem text="Срок кредита:" value={`${formatMonths(creditTime)}`} />
            <SummaryItem text="Общая выплата:" value={formatPrice(totalPayment > 0 ? totalPayment : 0)} />
            <SummaryItem text="Сумма кредита:" value={formatPrice(creditSumValue > 0 ? creditSumValue : 0)} className="text-[#0168af]" />
            <SummaryItem text="Переплата по кредиту:" value={formatPrice(overPay > 0 ? overPay : 0)} className="text-[#489b00]" />
            <DifferenceBar width={calculateWidth} />
        </>
    );
};
