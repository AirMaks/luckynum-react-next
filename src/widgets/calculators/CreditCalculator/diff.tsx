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
        setMonthlyPayment,
        setPaymentSchedule,
        type,
        monthlyPayment,
        setDiffOverPaid,
        diffOverPaid,
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
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        const interestRate = parseFloat(percent) / 100;
        const monthlyInterestRate = interestRate / 12;
        const principalPayment = creditSumValue / totalMonths;

        setErrorCreditSumZero(Number(creditSumValue) === 0);
        setErrorPercentTooBig(Number(percent) > 99);
        setErrorPercent(Number(percent) === 0);

        const payments = [];
        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = (creditSumValue - (i - 1) * principalPayment) * monthlyInterestRate;
            const monthlyPayment = principalPayment + interestPayment;
            payments.push(monthlyPayment);
        }

        const totalSum = payments.reduce((acc, curr) => acc + parseFloat(curr.toFixed(2)), 0);
        setDiffOverPaid(parseFloat((totalSum - creditSumValue).toFixed(2)));
        setMonthlyPayment(payments);
    };

    const calculatePaymentSchedule = () => {
        const monthlyInterestRate = percent / 12 / 100;
        const totalMonths = Math.round(TERMS[creditTerm] * 12);
        let remainingBalance = creditSumValue;
        const schedule = [];

        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = creditSumValue / totalMonths;
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

    const totalPayment = +diffOverPaid + +creditSumValue;

    const calculateWidth = (creditSumValue / totalPayment) * 100;

    const hasErrors = errorPercentTooBig || errorPercent || errorCreditSumZero;

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
