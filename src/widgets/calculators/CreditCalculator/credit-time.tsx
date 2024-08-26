"use client";

import { formatPrice } from "helpers/formatPrice";
import { useEffect } from "react";
import { SummaryItem } from "../SummaryItem";
import { DifferenceBar } from "../DifferenceBar";
import { formatMonths } from "helpers/formatMonths";

export const CreditTime = (props: any) => {
    const { percent, creditSumValue, monthlyPaymentInputValue, setCreditTime, creditTime, setPaymentSchedule, creditType } = props;

    useEffect(() => {
        calculateCreditTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditSumValue, percent, monthlyPaymentInputValue, creditType]);

    const calculateCreditTime = () => {
        const monthlyInterestRate = percent / 12 / 100;

        const creditTimeInMonths =
            Math.log(monthlyPaymentInputValue / (monthlyPaymentInputValue - creditSumValue * monthlyInterestRate)) /
            Math.log(1 + monthlyInterestRate);

        setCreditTime(creditTimeInMonths);
        calculatePaymentSchedule();
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

    return (
        <>
            <SummaryItem text="Срок кредита:" value={`${formatMonths(creditTime)}`} />
            <SummaryItem text="Общая выплата:" value={formatPrice(totalPayment)} />
            <SummaryItem text="Сумма кредита:" value={formatPrice(creditSumValue)} className="text-[#0168af]" />
            <SummaryItem text="Переплата по кредиту:" value={formatPrice(overPay)} className="text-[#489b00]" />
            <DifferenceBar width={calculateWidth} />
        </>
    );
};
