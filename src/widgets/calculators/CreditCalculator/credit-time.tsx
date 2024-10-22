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
        setPaymentSchedule,
        creditType,
        setErrorIsMonthlyPaymentNotCover,
        setErrorPercentTooBig,
        setErrorPercent,
        setErrorCreditSumLessMonthlyPayment,
        setErrorCreditTimeTooBig,
        errorIsMonthlyPaymentNotCover,
        errorCreditSumLessMonthlyPayment,
        errorPercentTooBig,
        errorPercent,
        errorCreditTimeTooBig,
        modalIsOpen,
        setLoadingSchedule
    } = props;

    useEffect(() => {
        calculateCreditTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditSumValue, percent, monthlyPaymentInputValue, creditType]);

    useEffect(() => {
        if (modalIsOpen) {
            calculatePaymentSchedule();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalIsOpen]);

    const calculateCreditTime = () => {
        const monthlyInterestRate = percent / 12 / 100;

        const creditTimeInMonths =
            Math.log(monthlyPaymentInputValue / (monthlyPaymentInputValue - creditSumValue * monthlyInterestRate)) /
            Math.log(1 + monthlyInterestRate);

        setErrorIsMonthlyPaymentNotCover(Number(monthlyPaymentInputValue) <= Number(creditSumValue) * Number(monthlyInterestRate));
        setErrorCreditSumLessMonthlyPayment(Number(creditSumValue) <= Number(monthlyPaymentInputValue));
        setErrorPercentTooBig(Number(percent) > 99);
        setErrorPercent(Number(percent) === 0);
        setErrorCreditTimeTooBig(Math.floor(creditTimeInMonths / 12) >= 50);

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
        setLoadingSchedule(false);
        setPaymentSchedule(schedule);
    };

    const totalPayment = monthlyPaymentInputValue * creditTime;

    const overPay = totalPayment - creditSumValue;

    const calculateWidth = (creditSumValue / totalPayment) * 100;

    const hasErrors =
        errorIsMonthlyPaymentNotCover || errorCreditSumLessMonthlyPayment || errorPercentTooBig || errorPercent || errorCreditTimeTooBig;

    return (
        <>
            <SummaryItem
                ariaLabel={`Срок кредита: ${hasErrors ? "" : `${formatMonths(creditTime)}`}`}
                text="Срок кредита:"
                value={hasErrors ? "" : `${formatMonths(creditTime)}`}
            />
            <SummaryItem
                ariaLabel={`Общая выплата: ${hasErrors ? "" : formatPrice(totalPayment)}`}
                text="Общая выплата:"
                value={hasErrors ? "" : formatPrice(totalPayment)}
            />
            <SummaryItem
                ariaLabel={`Сумма кредита: ${hasErrors ? "" : formatPrice(creditSumValue)}`}
                text="Сумма кредита:"
                value={hasErrors ? "" : formatPrice(creditSumValue)}
                className="text-[#0168af]"
            />
            <SummaryItem
                ariaLabel={`Переплата по кредиту: ${hasErrors ? "" : formatPrice(overPay)}`}
                text="Переплата по кредиту:"
                value={hasErrors ? "" : formatPrice(overPay)}
                className="text-[#489b00]"
            />
            {!hasErrors && <DifferenceBar width={calculateWidth} />}
        </>
    );
};
