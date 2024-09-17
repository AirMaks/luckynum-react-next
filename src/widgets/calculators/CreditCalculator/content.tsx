import { formatYearsText } from "helpers/formatMonths";
import { formatPrice } from "helpers/formatPrice";
import { formatRublesText } from "helpers/formatRublesText";
import Link from "next/link";

export const Content = ({ isMainPage, creditSum, years, isCreditTime, isMonthlyPayment, isAutoCredit }: any) => {
    if (isCreditTime) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали срок кредита с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}.
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Вы можете поменять сумму кредита, процентную ставку или ежемесячный, чтобы рассчитать другой нужный вам срок кредита. Также вы
                    можете рассчитать{" "}
                    <Link href="/credit-calculator/raschitat-ezhemesyachnyi-platezh-po-kreditu" className="text-blue-700 inline-block font-medium">
                        ежемесячный платеж по кредиту
                    </Link>
                    .
                </p>
            </article>
        );
    }

    if (isMonthlyPayment) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали ежемесячный платеж по кредиту с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и
                    сроком на {years}.
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Вы можете поменять сумму кредита, срок кредита, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужный вам кредит. Также вы можете рассчитать{" "}
                    <Link href="/credit-calculator/raschitat-srok-kredita" className="text-blue-700 inline-block font-medium">
                        срок кредита
                    </Link>
                    .
                </p>
            </article>
        );
    }
    if (isAutoCredit) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали кредит на машину с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Вы можете поменять сумму кредита, срок кредита, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужный вам кредит.
                </p>
            </article>
        );
    }
    if (!isMainPage) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали кредит с суммой кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Вы можете поменять сумму кредита, срок кредита, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужный вам кредит.
                </p>
            </article>
        );
    }
    return (
        <article className="mt-[50px] max-sm:mt-[25px]">
            <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]">Кредитный калькулятор для расчета кредита онлайн</h2>
            <p className="mb-[20px] max-sm:text-[14px]">
                Кредитный калькулятор использует специальные формулы для расчета ключевых параметров кредита, таких как ежемесячный платеж, процентная
                ставка и общая переплата. Для получения точных результатов вам потребуется указать:
            </p>
            <ul className="ms-[18px] mb-[20px] max-sm:text-[14px]">
                <li className="mb-[5px] list-disc">Размер займа</li>
                <li className="mb-[5px] list-disc">Срок кредита</li>
                <li className="mb-[5px] list-disc">Процентную ставку</li>
                <li className="mb-[5px] list-disc">Тип платежей (аннуитетные или дифференцированные)</li>
            </ul>
        </article>
    );
};
