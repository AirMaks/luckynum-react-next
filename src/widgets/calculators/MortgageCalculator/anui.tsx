"use client";

import { TERMS } from "const";
import { formatPrice } from "helpers/formatPrice";
import { useEffect } from "react";
import { SummaryItem } from "../SummaryItem";
import { DifferenceBar } from "../DifferenceBar";

export const Anui = (props: any) => {
    const { percent, creditTerm, creditSumValue, initialPaymentValue, setMonthlyPayment, setPaymentSchedule, type, monthlyPayment } = props;

    useEffect(() => {
        calculateMonthlyPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, creditSumValue, initialPaymentValue, percent, creditTerm]);

    const calculateMonthlyPayment = () => {
        calculatePaymentSchedule();
        const newCreditTerm = TERMS[creditTerm];
        const monthlyInterest = parseFloat(percent) / 100 / 12;
        const totalPayments = Math.round(newCreditTerm * 12);
        const remainingBalance = creditSumValue - initialPaymentValue;
        const payment = (remainingBalance * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments));
        setMonthlyPayment(payment);
    };

    const calculatePaymentSchedule = () => {
        const monthlyInterestRate = percent / 12 / 100;
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        const monthlyPayment = ((creditSumValue - initialPaymentValue) * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        let remainingBalance = creditSumValue - initialPaymentValue;
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

    const totalPayment =
        monthlyPayment * Math.round(TERMS[creditTerm] * 12) - +creditSumValue + +initialPaymentValue + +creditSumValue - +initialPaymentValue;

    const calculateWidth = (creditSumValue / totalPayment) * 100;
    const overPay = monthlyPayment * (TERMS[creditTerm] * 12) - creditSumValue + +initialPaymentValue;

    return (
        <>
            <SummaryItem text="Ежемесячный платеж:" value={formatPrice(monthlyPayment)} />
            <SummaryItem text="Общая выплата:" value={formatPrice(totalPayment)} />
            <SummaryItem text="Сумма кредита:" value={formatPrice(creditSumValue - initialPaymentValue)} className="text-[#0168af]" />
            <SummaryItem text="Переплата по кредиту:" value={formatPrice(overPay)} className="text-[#489b00]" />
            <DifferenceBar width={calculateWidth} />
        </>
    );
};