import { TERMS } from "const";
import { formatPrice } from "helpers/formatPrice";
import { useEffect } from "react";
import { SummaryItem } from "../SummaryItem";
import { DifferenceBar } from "../DifferenceBar";

export const Diff = (props: any) => {
    const {
        percent,
        creditTerm,
        creditSumValue,
        initialPaymentValue,
        setMonthlyPayment,
        setPaymentSchedule,
        type,
        monthlyPayment,
        setDiffOverPaid,
        diffOverPaid,
        errorPercent,
        errorPercentTooBig,
        errorCS,
        errorPV,
        modalIsOpen,
        setLoadingSchedule
    } = props;

    useEffect(() => {
        calculateMonthlyPayment();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, creditSumValue, initialPaymentValue, percent, creditTerm]);

    useEffect(() => {
        if (modalIsOpen) {
            calculatePaymentSchedule();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalIsOpen]);

    const calculateMonthlyPayment = () => {
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        const interestRate = parseFloat(percent) / 100;
        const monthlyInterestRate = interestRate / 12;
        const principalPayment = (creditSumValue - initialPaymentValue) / totalMonths;
        const payments = [];
        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = (creditSumValue - initialPaymentValue - (i - 1) * principalPayment) * monthlyInterestRate;
            const monthlyPayment = principalPayment + interestPayment;
            payments.push(monthlyPayment);
        }
        const totalSum = payments.reduce((acc, curr) => acc + parseFloat(curr.toFixed(2)), 0);
        setDiffOverPaid(parseFloat((totalSum - creditSumValue + +initialPaymentValue).toFixed(2)));
        setMonthlyPayment(payments);
    };

    const calculatePaymentSchedule = () => {
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
        setLoadingSchedule(false);
        setPaymentSchedule(schedule);
    };

    const totalPayment = +diffOverPaid + +creditSumValue - +initialPaymentValue;

    const calculateWidth = (creditSumValue / totalPayment) * 100;

    const hasErrors = errorPercent || errorPercentTooBig || errorCS || errorPV;
    return (
        <>
            <SummaryItem
                text="Ежемесячный платеж:"
                value={
                    hasErrors
                        ? ""
                        : `${formatPrice(monthlyPayment[0] > 0 ? monthlyPayment[0] : 0)} ... ${formatPrice(monthlyPayment[monthlyPayment.length - 1] > 0 ? monthlyPayment[monthlyPayment.length - 1] : 0)}`
                }
            />
            <SummaryItem text="Общая выплата:" value={hasErrors ? "" : formatPrice(totalPayment > 0 ? totalPayment : 0)} />
            <SummaryItem
                text="Сумма кредита:"
                value={hasErrors ? "" : formatPrice(creditSumValue > 0 ? creditSumValue : 0)}
                className="text-[#0168af]"
            />
            <SummaryItem
                text="Переплата по кредиту:"
                value={hasErrors ? "" : formatPrice(diffOverPaid > 0 ? diffOverPaid : 0)}
                className="text-[#489b00]"
            />
            {!hasErrors && <DifferenceBar width={calculateWidth} />}
        </>
    );
};
