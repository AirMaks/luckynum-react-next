"use client";

import { useEffect, useRef, useState } from "react";
import cls from "./CreditCalculator.module.scss";
import { Input } from "shared/ui/Input/Input";
import cn from "classnames";
import { sanitizeSymbols } from "helpers/sanitizeSymbols";
import { formatPrice } from "helpers/formatPrice";
import ArrowIcon from "shared/assets/icons/arrow-down.svg";
import { TERMS } from "../../const";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import { Modal } from "shared/ui/Modal/Modal";
import Loader from "shared/ui/Loader/Loader";
import { CSVLink, CSVDownload } from "react-csv";
import Image from "next/image";

const DIFF = "Дифференцированный";
const ANUI = "Аннуитетный";

const keys = Object.keys(TERMS);

const csvDataHeaders = [
    { label: "Дата", key: "date" },
    { label: "Платеж", key: "payment" },
    { label: "Погашено", key: "principal" },
    { label: "Остаток", key: "balance" },
    { label: "Проценты", key: "interest" }
];

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
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        setCreditSumValue(sanitized);
        const percent = (+initialPaymentValue / +sanitized) * 100;
        setInitialPaymentPercent(percent);
    };

    const handleChangeInitialPayment = (value: any) => {
        const sanitized = sanitizeSymbols(value).toString();
        setInitialPaymentValue(sanitized);
        const percent = (+sanitized / +creditSumValue) * 100;
        setInitialPaymentPercent(percent);
    };

    const handlePercentChange = (value: any) => {
        const newValue = value.replace(/[^\d.]/g, "");
        setPercent(newValue);
    };

    const onSelectClick = () => {
        setIsOpenSelect((prev: any) => !prev);
        setIsOpenSelectType(false);
    };

    const onSelectItemClick = (value: any) => {
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

    useEffect(() => {
        if (type === DIFF) {
            calculateMonthlyPaymentDiff();
        } else {
            calculateMonthlyPayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, creditSumValue, initialPaymentValue, percent, creditTerm]);

    const csvData = (paymentSchedule || []).reduce((acc: any, curr: any) => {
        acc.push({
            date: curr.date,
            payment: formatPrice(parseFloat(curr.payment.toFixed(2))),
            principal: formatPrice(parseFloat(curr.principal.toFixed(2))),
            balance: Math.round(curr.balance) >= 0 ? formatPrice(parseFloat(curr.balance.toFixed(2))) : 0,
            interest: parseFloat(curr.interest) > 0 ? formatPrice(parseFloat(curr.interest.toFixed(2))) : 0
        });

        return acc;
    }, []);

    return (
        <div className="pt-[60px] pb-[20px] max-sm:pt-[20px] ms-auto me-auto max-w-[1000px] px-[20px]">
            <div className="bg-blue-50 p-[40px] max-lg:p-[20px] rounded">
                <h1 className="text-center text-[24px] mb-[20px] font-bold">Кредитный калькулятор</h1>
                <div className="flex justify-between max-sm:flex-col">
                    <div className="flex flex-col w-1/2 max-sm:w-full">
                        <div className="text-[16px] mb-[10px]">
                            <label htmlFor="credit_sum" className="block mb-[5px]">
                                Сумма кредита
                            </label>
                            <Input
                                ref={refCreditSum}
                                rounded={false}
                                id="credit_sum"
                                value={formattedCreditSumValue}
                                onChange={handleChangeCreditSum}
                            />
                        </div>
                        <div className="text-[16px] mb-[10px]">
                            <label htmlFor="percent" className="block mb-[5px]">
                                Процентная ставка
                            </label>
                            <Input
                                className={cn("", { [cls.errorPercent]: errorPercent }, [])}
                                ref={refPercent}
                                rounded={false}
                                id="percent"
                                value={percent}
                                onChange={handlePercentChange}
                            />
                        </div>
                        <div className="text-[16px] mb-[10px]">
                            <label className="block mb-[5px]">Срок кредита</label>
                            {
                                <div className={cn(cls.Select)}>
                                    <ArrowIcon className={cls.arrowIcon} />
                                    <div onClick={onSelectClick}>{creditTerm}</div>
                                    <div className={cn(cls.selectList, { [cls.openSelect]: isOpenSelect }, ["bg-blue-50"])}>
                                        {keys.map((el, i) => {
                                            return (
                                                <div
                                                    onClick={() => onSelectItemClick(el)}
                                                    className={cn("", { "bg-[#a7e8ff]": el === creditTerm }, [])}
                                                    key={i}>
                                                    {el}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="text-[16px] mb-[10px]">
                            <label htmlFor="initial_payment" className="block mb-[5px]">
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
                        <div className="text-[16px] mb-[10px]">
                            <label htmlFor="initial_payment" className="block mb-[5px]">
                                Тип платежей
                            </label>
                            <div className={cls.Select}>
                                <ArrowIcon className={cls.arrowIcon} />
                                <div onClick={onSelectTypeClick}>{type}</div>
                                <div className={cn(cls.selectList, { [cls.openSelect]: isOpenSelectType }, ["bg-blue-50"])}>
                                    <div onClick={() => onSelectTypeItemClick(ANUI)} className={cn("", { "bg-[#a7e8ff]": type === ANUI }, [])}>
                                        {ANUI}
                                    </div>
                                    <div onClick={() => onSelectTypeItemClick(DIFF)} className={cn("", { "bg-[#a7e8ff]": type === DIFF }, [])}>
                                        {DIFF}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ps-[20px] pt-[20px] max-sm:p-[0] max-sm:mt-[20px] relative w-2/3">
                        {parseFloat(percent) &&
                        (monthlyPayment > 0 || (monthlyPayment.length > 0 && !monthlyPayment?.some((el: any) => parseFloat(el) < 0))) ? (
                            <>
                                <div className="mb-[10px] text-[20px] flex justify-between flex-wrap">
                                    <div className="d-inline-block font-bold me-[20px]">Ежемесячный платеж:</div>
                                    <span>
                                        {type === DIFF
                                            ? `${formatPrice(parseFloat(monthlyPayment[0]?.toFixed(2)))} ₽ ... ${formatPrice(
                                                  parseFloat(monthlyPayment[monthlyPayment.length - 1]?.toFixed(2))
                                              )} ₽`
                                            : `${formatPrice(parseFloat(monthlyPayment?.toFixed(2)))} ₽`}
                                    </span>
                                </div>
                                <div className="mb-[10px] text-[20px] flex justify-between flex-wrap">
                                    <div className="d-inline-block font-bold me-[20px]">Общая выплата:</div>
                                    <span>
                                        {type === DIFF
                                            ? `${formatPrice(parseFloat((+diffOverPaid + +creditSumValue - +initialPaymentValue)?.toFixed(2)))} ₽`
                                            : `${formatPrice(
                                                  parseFloat(
                                                      (
                                                          monthlyPayment * Math.round(TERMS[creditTerm] * 12) -
                                                          creditSumValue +
                                                          +initialPaymentValue
                                                      )?.toFixed(2)
                                                  ) + parseFloat((+creditSumValue - +initialPaymentValue)?.toFixed(2))
                                              )} ₽`}
                                    </span>
                                </div>
                                <div className="mb-[10px] text-[20px] flex justify-between flex-wrap">
                                    <div className="d-inline-block font-bold me-[20px] text-[#0168af]">Сумма кредита:</div>
                                    <span>{`${formattedCreditSumValue} ₽`}</span>
                                </div>
                                <div className="mb-[10px] text-[20px] flex justify-between flex-wrap">
                                    <div className="d-inline-block font-bold me-[20px] text-[#489b00]">Переплата по кредиту:</div>
                                    <span>
                                        {type === DIFF
                                            ? `${formatPrice(diffOverPaid)} ₽`
                                            : `${formatPrice(
                                                  parseFloat(
                                                      (
                                                          monthlyPayment * Math.round(TERMS[creditTerm] * 12) -
                                                          creditSumValue +
                                                          +initialPaymentValue
                                                      )?.toFixed(2)
                                                  )
                                              )} ₽`}
                                    </span>
                                </div>

                                <div className="mt-[10px] flex w-full h-[10px] bg-[#5ac300] rounded">
                                    <div
                                        className="rounded-l"
                                        style={{
                                            width:
                                                type === DIFF
                                                    ? `${(creditSumValue / (+diffOverPaid + +creditSumValue - +initialPaymentValue)) * 100}%`
                                                    : `${
                                                          (creditSumValue /
                                                              (monthlyPayment * Math.round(TERMS[creditTerm] * 12) -
                                                                  creditSumValue +
                                                                  +initialPaymentValue +
                                                                  +creditSumValue -
                                                                  +initialPaymentValue)) *
                                                          100
                                                      }%`,
                                            backgroundColor: "#0168af"
                                        }}></div>
                                </div>
                                <div className="text-[#006af3] cursor-pointer font-bold mt-[20px] text-[20px]" onClick={() => setModalIsOpen(true)}>
                                    Скачать график платежей
                                </div>
                            </>
                        ) : !parseFloat(percent) || parseFloat(creditSumValue) < parseFloat(initialPaymentValue) || !parseFloat(creditSumValue) ? (
                            <div className="text-center text-red-600">Введите корректные данные для расчета.</div>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
            <article className="mt-[100px]">
                <h2 className="font-bold text-[24px] mb-[10px]">Расчет ипотеки онлайн: Удобный и точный способ планирования покупки недвижимости</h2>
                <p className="mb-[20px]">
                    Покупка недвижимости в кредит — важное решение, которое требует тщательной подготовки и анализа финансовых возможностей. Одним из
                    самых полезных инструментов для потенциального заемщика является ипотечный калькулятор. Этот инструмент позволяет рассчитать
                    ежемесячные платежи, определить максимальный размер кредита и понять, какую сумму придется переплатить банку. В этой статье мы
                    подробно рассмотрим, как использовать ипотечный калькулятор и какие преимущества он предоставляет.
                </p>
                <h2 className="font-bold text-[24px] mb-[10px]">Зачем нужен расчет ипотеки онлайн?</h2>
                <p className="mb-[20px]">
                    При намерении приобрести жилье в кредит, важно заранее оценить свои финансовые возможности. С помощью онлайн-калькулятора можно
                    быстро и точно рассчитать все ключевые параметры ипотечного кредита. Это позволяет избежать неприятных сюрпризов в будущем и
                    подготовиться к возможным финансовым нагрузкам.
                </p>
                <h2 className="font-bold text-[24px] mb-[10px]">Как работает ипотечный калькулятор?</h2>
                <p className="mb-[20px]">
                    Ипотечный калькулятор — это программа, которая с помощью математических формул рассчитывает ежемесячные платежи, процентные
                    ставки, переплату и другие важные параметры кредита. Для получения точных данных пользователю необходимо ввести:
                </p>
                <ul className="ms-[18px] mb-[20px]">
                    <li className="mb-[5px] list-disc">Сумму кредита</li>
                    <li className="mb-[5px] list-disc">Срок кредитования</li>
                    <li className="mb-[5px] list-disc">Процентную ставку</li>
                    <li className="mb-[5px] list-disc">Тип платежей (аннуитетные или дифференцированные)</li>
                </ul>
                <h2 className="font-bold text-[24px] mb-[10px]">Основные параметры расчета ипотеки</h2>
                <p className="mb-[5px]">
                    <strong>Процентная ставка</strong>
                </p>
                <p className="mb-[20px]">
                    Процентная ставка является ключевым параметром при расчете ипотеки. Она показывает, какой процент от оставшейся суммы долга
                    начисляется ежегодно. Например, при процентной ставке 12%, за год на долг добавляется 12% от его текущего остатка. Важно
                    учитывать, что банки начисляют проценты ежедневно на оставшуюся сумму долга. Таким образом, размер процентов, начисляемых за
                    каждый день, составляет:
                </p>
                <p className="flex items-center font-bold mb-[20px] sm:text-[12px]">
                    <div className="text-green-800">Процент за день</div>
                    <div className="mx-[5px]">=</div>
                    <div className="me-[10px] text-center">
                        <div className="text-yellow-500">12%</div>
                        <div className="border-t border-gray-700 text-pink-700">12 месяцев</div>
                    </div>
                    <div className="me-[5px]">÷</div>
                    <div className="me-[5px] text-blue-500">30 дней</div>
                    <div className="me-[5px]">≈</div>
                    <div>0.033%</div>
                </p>
                <p className="mb-[5px]">
                    <strong>Фиксированная и плавающая процентная ставка</strong>
                </p>
                <p className="mb-[10px]">
                    <b>Фиксированная процентная ставка</b> остаётся неизменной на весь срок кредита. Она указывается в кредитном договоре и не может
                    быть изменена.
                </p>
                <p className="mb-[20px]">
                    <b>Плавающая процентная ставка</b> изменяется в зависимости от рыночных условий. Обычно она состоит из двух частей: одна часть
                    привязана к рыночному индикатору (например, Mosprime3m или ставке рефинансирования ЦБ), а вторая — фиксированная — остаётся
                    постоянной.
                </p>
                <h2 className="font-bold text-[24px] mb-[10px]">Типы платежей: аннуитетный и дифференцированный</h2>
                <p className="mb-[5px]">
                    <strong>Аннуитетный платеж</strong>
                </p>
                <p className="mb-[10px]">
                    Аннуитетный платеж — это такой тип ежемесячного платежа, при котором сумма выплат остается неизменной на протяжении всего срока
                    кредита. При этом часть платежа идет на погашение основного долга, а другая часть — на оплату процентов.
                </p>
                <p className="mb-[5px]">
                    <strong>Дифференцированный платеж</strong>
                </p>
                <p className="mb-[10px]">
                    Дифференцированный платеж подразумевает, что ежемесячная сумма выплат уменьшается с течением времени. В первые месяцы платежи
                    выше, так как большая часть суммы идет на погашение основного долга, а оставшаяся — на проценты.
                </p>
                <h2 className="font-bold text-[24px] mb-[10px]">Влияние процентной ставки на параметры кредита</h2>
                <p className="mb-[20px]">
                    Процентная ставка существенно влияет на размер ежемесячных платежей и общую переплату по кредиту. Даже небольшое изменение ставки
                    может значительно увеличить или уменьшить сумму переплаты. Рассмотрим пример:
                </p>
                <Image
                    width={0}
                    height={0}
                    sizes="40vw"
                    style={{ width: "700px", height: "auto" }}
                    src="/img/credit-calculator.png"
                    alt="процентная ставка и параметры кредита"
                />
                <h2 className="font-bold text-[24px] mt-[20px] mb-[10px]">Когда лучше обратиться за профессиональной консультацией?</h2>
                <p className="mb-[10px]">
                    Ипотечный калькулятор — это отличный инструмент для предварительного расчета, однако для получения точных данных и консультации по
                    кредиту лучше обратиться в банк. Менеджеры помогут вам учесть все возможные нюансы и выбрать наиболее выгодные условия.
                </p>
                <h2 className="font-bold text-[24px] mb-[10px]">Заключение</h2>
                <p className="mb-[50px]">
                    Расчет ипотеки онлайн с помощью калькулятора — это удобный способ оценить свои финансовые возможности и подготовиться к покупке
                    недвижимости. Этот инструмент позволяет быстро рассчитать ежемесячные платежи, переплату и другие важные параметры кредита.
                    Используя ипотечный калькулятор, вы сможете более осознанно подойти к выбору кредитной программы и избежать финансовых трудностей
                    в будущем.
                </p>
            </article>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className="bg-white p-[20px] rounded shadow">
                    <div className="flex justify-between items-center mb-[20px] font-bold">
                        <CSVLink data={csvData} headers={csvDataHeaders} filename={`График платежей по кредиту (${type})`}>
                            <div className="text-[#006af3] cursor-pointer">Скачать график в формате CSV</div>
                        </CSVLink>
                        <CloseIcon width={30} height={30} onClick={() => setModalIsOpen(false)} className={cn("cursor-pointer fill-stone-800")} />
                    </div>
                    {paymentSchedule.length > 0 && (
                        <div className="border border-black overflow-x-auto">
                            <div className="w-max">
                                <div className="bg-[#b0e5ff] border-b border-b-black flex justify-between font-bold p-[10px] text-center">
                                    <div className="w-[200px]">Дата</div>
                                    <div className="w-[200px]">Платеж</div>
                                    <div className="w-[200px]">Погашено</div>
                                    <div className="w-[200px]">Остаток</div>
                                    <div className="w-[200px]">Проценты</div>
                                </div>
                                <div className="overflow-x-auto max-h-[calc(100vh-220px)]">
                                    {paymentSchedule.map((payment: any, index: number) => (
                                        <div key={index} className="flex py-[5px] text-center border-b border-b-black last:border-0">
                                            <div className="w-[200px]">
                                                <b>{payment.date}</b>
                                            </div>
                                            <div className="w-[200px]">
                                                <b>{formatPrice(parseFloat(payment.payment.toFixed(2)))}</b>
                                            </div>
                                            <div className="w-[200px]">
                                                <b>{formatPrice(parseFloat(payment.principal.toFixed(2)))}</b>
                                            </div>
                                            <div className="w-[200px]">
                                                {Math.round(payment.balance) >= 0 ? formatPrice(parseFloat(payment.balance.toFixed(2))) : 0}
                                            </div>
                                            <div className="w-[200px]">
                                                {parseFloat(payment.interest) > 0 ? formatPrice(parseFloat(payment.interest.toFixed(2))) : 0}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};
export default CreditCalculator;
