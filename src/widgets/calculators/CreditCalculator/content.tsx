import { formatYearsText } from "helpers/formatMonths";
import { formatPrice } from "helpers/formatPrice";
import { formatRublesText } from "helpers/formatRublesText";
import Link from "next/link";

export const Content = ({ isMainPage, creditSum, years, isCreditTime, isMonthlyPayment, isAutoCredit }: any) => {
    if (isCreditTime) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете срока кредита">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="credit-time-heading">
                    Вы рассчитали срок кредита с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}.
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="credit-time-heading">
                    Вы можете поменять сумму кредита, процентную ставку или ежемесячный, чтобы рассчитать другой нужный вам срок кредита. Также вы
                    можете рассчитать{" "}
                    <Link
                        href="/credit-calculator/raschitat-ezhemesyachnyi-platezh-po-kreditu"
                        className="text-blue-700 inline-block font-medium"
                        aria-label="Рассчитать ежемесячный платеж по кредиту">
                        ежемесячный платеж по кредиту
                    </Link>
                    .
                </p>
            </article>
        );
    }

    if (isMonthlyPayment) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете ежемесячного платежа по кредиту">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="monthly-payment-heading">
                    Вы рассчитали ежемесячный платеж по кредиту с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и
                    сроком на {years}.
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="monthly-payment-heading">
                    Вы можете поменять сумму кредита, срок кредита, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужный вам кредит. Также вы можете рассчитать{" "}
                    <Link
                        href="/credit-calculator/raschitat-srok-kredita"
                        className="text-blue-700 inline-block font-medium"
                        aria-label="Рассчитать срок кредита">
                        срок кредита
                    </Link>
                    .
                </p>
            </article>
        );
    }
    if (isAutoCredit) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете кредита на машину">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="auto-credit-heading">
                    Вы рассчитали кредит на машину с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="auto-credit-heading">
                    Вы можете поменять сумму кредита, срок кредита, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужный вам кредит.
                </p>
            </article>
        );
    }
    if (!isMainPage) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете кредита">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="credit-heading">
                    Вы рассчитали кредит с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="credit-heading">
                    Вы можете поменять сумму кредита, срок кредита, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужный вам кредит.
                </p>
            </article>
        );
    }
    return (
        <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о кредитном калькуляторе">
            <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="main-page-heading">
                Кредитный калькулятор для расчета кредита онлайн
            </h2>
            <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="main-page-heading">
                Кредитный калькулятор использует специальные формулы для расчета ключевых параметров кредита, таких как ежемесячный платеж, процентная
                ставка и общая переплата. Для получения точных результатов вам потребуется указать:
            </p>
            <ul className="ms-[18px] mb-[20px] max-sm:text-[14px]" aria-label="Список необходимых данных для расчета кредита">
                <li className="mb-[5px] list-disc">Размер займа</li>
                <li className="mb-[5px] list-disc">Срок кредита</li>
                <li className="mb-[5px] list-disc">Процентную ставку</li>
                <li className="mb-[5px] list-disc">Тип платежей (аннуитетные или дифференцированные)</li>
            </ul>
        </article>
    );
};
