import { formatPrice } from "helpers/formatPrice";
import { formatRublesText } from "helpers/formatRublesText";

export const Content = ({ isMainPage, isCountryIpoteka, isItIpoteka, isInitialPaymentIpoteka, creditSum, years, initialPayment, percent }: any) => {
    if (isInitialPaymentIpoteka) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-bold text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали кредит с первоначальным взносом {formatPrice(initialPayment, false)} {formatRublesText(initialPayment)}, с суммой
                    кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Вы можете поменять сумму ипотеки, срок ипотеки, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужную вам ипотеку.
                </p>
            </article>
        );
    }
    if (isCountryIpoteka) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-bold text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали кредит на сельскую ипотеку с процетной ставкой {percent}%, с суммой кредита {formatPrice(creditSum, false)}{" "}
                    {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Процент сельской ипотеки может зависеть от различных факторов, поэтому выберите подходящую для вас процентную ставку. Вы можете
                    поменять сумму ипотеки, срок ипотеки, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы рассчитать
                    нужную вам ипотеку.
                </p>
            </article>
        );
    }

    if (isItIpoteka) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]">
                <h2 className="font-bold text-[24px] max-sm:text-[16px] mb-[10px]">
                    Вы рассчитали кредит на IT ипотеку с процетной ставкой {percent}%, с суммой кредита {formatPrice(creditSum, false)}{" "}
                    {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]">
                    Процент IT ипотеки может меняться, поэтому выберите подходящую для вас процентную ставку. Вы можете поменять сумму ипотеки, срок
                    ипотеки, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы рассчитать нужную вам ипотеку.
                </p>
            </article>
        );
    }

    if (!isMainPage) return null;
    return (
        <article className="mt-[50px] max-sm:mt-[25px]">
            <h2 className="font-bold text-[24px] max-sm:text-[16px] mb-[10px]">Расчет ипотеки онлайн с помощью ипотечного калькулятора</h2>
            <p className="mb-[20px] max-sm:text-[14px]">
                Ипотечный калькулятор — это программа, которая с помощью математических формул рассчитывает ежемесячные платежи, процентные ставки,
                переплату и другие важные параметры кредита. Для получения точных данных пользователю необходимо ввести:
            </p>
            <ul className="ms-[18px] mb-[20px] max-sm:text-[14px]">
                <li className="mb-[5px] list-disc">Сумму кредита</li>
                <li className="mb-[5px] list-disc">Срок кредитования</li>
                <li className="mb-[5px] list-disc">Процентную ставку</li>
                <li className="mb-[5px] list-disc">Тип платежей (аннуитетные или дифференцированные)</li>
            </ul>
        </article>
    );
};
