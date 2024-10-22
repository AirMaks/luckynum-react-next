import { formatPrice } from "helpers/formatPrice";
import { formatRublesText } from "helpers/formatRublesText";

export const Content = ({ isMainPage, isCountryIpoteka, isItIpoteka, isInitialPaymentIpoteka, creditSum, years, initialPayment, percent }: any) => {
    if (isInitialPaymentIpoteka) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете ипотеки с первоначальным взносом">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="initial-payment-heading">
                    Вы рассчитали кредит с первоначальным взносом {formatPrice(initialPayment, false)} {formatRublesText(initialPayment)}, с суммой
                    кредита {formatPrice(creditSum, false)} {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="initial-payment-heading">
                    Вы можете поменять сумму ипотеки, срок ипотеки, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы
                    рассчитать нужную вам ипотеку.
                </p>
            </article>
        );
    }
    if (isCountryIpoteka) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете сельской ипотеки">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="country-ipoteka-heading">
                    Вы рассчитали кредит на сельскую ипотеку с процетной ставкой {percent}%, с суммой кредита {formatPrice(creditSum, false)}{" "}
                    {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="country-ipoteka-heading">
                    Процент сельской ипотеки может зависеть от различных факторов, поэтому выберите подходящую для вас процентную ставку. Вы можете
                    поменять сумму ипотеки, срок ипотеки, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы рассчитать
                    нужную вам ипотеку.
                </p>
            </article>
        );
    }

    if (isItIpoteka) {
        return (
            <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете IT ипотеки">
                <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="it-ipoteka-heading">
                    Вы рассчитали кредит на IT ипотеку с процетной ставкой {percent}%, с суммой кредита {formatPrice(creditSum, false)}{" "}
                    {formatRublesText(creditSum)} и сроком на {years}
                </h2>
                <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="it-ipoteka-heading">
                    Процент IT ипотеки может меняться, поэтому выберите подходящую для вас процентную ставку. Вы можете поменять сумму ипотеки, срок
                    ипотеки, процентную ставку или тип платежей (аннуитетный или дифференцированный), чтобы рассчитать нужную вам ипотеку.
                </p>
            </article>
        );
    }

    if (!isMainPage) return null;
    return (
        <article className="mt-[50px] max-sm:mt-[25px]" aria-label="Информация о расчете ипотеки онлайн">
            <h2 className="font-medium text-[24px] max-sm:text-[16px] mb-[10px]" id="main-page-heading">
                Расчет ипотеки онлайн с помощью ипотечного калькулятора
            </h2>
            <p className="mb-[20px] max-sm:text-[14px]" aria-describedby="main-page-heading">
                Онлайн расчет ипотеки с помощью ипотечного калькулятора — это быстрый и удобный способ узнать ключевые параметры вашего кредита.
                Ипотечный калькулятор автоматически рассчитывает ежемесячные платежи, процентную ставку, общую переплату и другие важные детали
                кредита, используя точные математические формулы. Чтобы получить расчет, достаточно указать:
            </p>
            <ul className="ms-[18px] mb-[20px] max-sm:text-[14px]" aria-label="Список необходимых данных для расчета ипотеки">
                <li className="mb-[5px] list-disc">Сумму кредита</li>
                <li className="mb-[5px] list-disc">Срок кредитования</li>
                <li className="mb-[5px] list-disc">Процентную ставку</li>
                <li className="mb-[5px] list-disc">Тип платежей (аннуитетные или дифференцированные)</li>
            </ul>
            <p>Этот инструмент поможет вам спланировать финансовые обязательства и выбрать наиболее выгодные условия для ипотеки.</p>
        </article>
    );
};
