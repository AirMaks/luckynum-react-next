import cn from "classnames";
import { useTranslation } from "react-i18next";
import cls from "./CalcInfo.module.scss";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import { memo } from "react";
// import CustomScrollbar from "shared/ui/CustomScrollbar/CustomScrollbar";

interface SidebarProps {
    className?: string;
    isOpenCalcInfo?: boolean;
    openCalcInfo?: () => void;
    onClose?: () => void;
}

export const CalcInfo = memo(({ className, isOpenCalcInfo, onClose }: SidebarProps) => {
    const { t } = useTranslation();

    return (
        <Sidebar isOpen={isOpenCalcInfo} className={cn(cls.CalcInfo, { [cls.opened]: isOpenCalcInfo }, [className])}>
            <CloseIcon width={30} height={30} className="fill-stone-800" onClick={onClose} />
            {/* <CustomScrollbar className={cls.overflow}> */}
                <h2>{"Как пользоваться нашим кредитным калькулятором"}</h2>
                <div className={cls.ul}>
                    <ul>
                        <li>
                            <b>1.</b> {t("Введите сумму кредита.")}
                        </li>
                        <li>
                            <b>2.</b>
                            {t("Введите процентную ставку кредита.")}
                        </li>
                        <li>
                            <b>3.</b> {t("Введите срок кредита.")}
                        </li>
                        <li>
                            <b>4.</b> {t("Введите тип платежей АННУИТЕТНЫЕ или ДИФФЕРЕНЦИРОВАННЫЕ.")}
                        </li>
                        <li>
                            <b>5.</b> {t("Нажмите кнопку РАССЧИТАТЬ КРЕДИТ.")}
                        </li>
                    </ul>
                    <div>
                        <h3>{"В чем отличие между аннуитетным и дифференцированным платежами"}</h3>
                        <p>
                            {
                                "Аннуитетные и дифференцированные типы платежей являются двумя разными способами расчета и возврата кредита. Понимание различий между ними поможет вам выбрать наиболее подходящий тип платежей для ваших финансовых потребностей. Вот краткое объяснение каждого из них:"
                            }
                        </p>
                        <p>
                            {
                                "Аннуитетные платежи представляют собой равные суммы, которые плательщик вносит на протяжении всего срока кредита. В каждом платеже включены как основная сумма кредита, так и проценты. В начале срока кредита большая часть платежа идет на покрытие процентов, а остаток — на погашение основной суммы. По мере уменьшения задолженности основная сумма становится больше, а проценты — меньше. Этот тип платежей обеспечивает постоянную сумму платежа на протяжении всего срока кредита."
                            }
                        </p>
                        <p>
                            {
                                "Дифференцированные платежи представляют собой переменные суммы, которые уменьшаются с течением времени. В начале срока кредита платежи выше, так как они включают как основную сумму, так и проценты. По мере уменьшения задолженности основная сумма становится меньше, и платежи уменьшаются. При использовании дифференцированных платежей проценты рассчитываются на остаток основной суммы, поэтому они также уменьшаются с течением времени."
                            }
                        </p>
                        <h3>{"Отличия между аннуитетными и дифференцированными типами платежей:"}</h3>
                        <ul>
                            <li>
                                <b>1.</b>
                                {
                                    "Структура платежей: В аннуитетных платежах сумма платежа остается постоянной, в то время как в дифференцированных платежах она уменьшается с течением времени."
                                }
                            </li>
                            <li>
                                <b>2.</b>
                                {
                                    "Расчет процентов: В аннуитетных платежах проценты рассчитываются на остаток основной суммы, поэтому их доля уменьшается по мере уменьшения задолженности. В дифференцированных платежах проценты рассчитываются на начальную основную сумму, и их доля остается постоянной на протяжении срока кредита."
                                }
                            </li>
                            <li>
                                <b>3.</b>
                                {
                                    "Планирование бюджета: Аннуитетные платежи обеспечивают более предсказуемый бюджет, так как сумма платежа остается постоянной. В то же время, дифференцированные платежи могут быть выгодными для тех, кто желает снизить сумму платежей в начале срока кредита."
                                }
                            </li>
                        </ul>
                        <p>
                            {
                                "Выбор между аннуитетными и дифференцированными типами платежей зависит от ваших финансовых возможностей, предпочтений и целей. Перед принятием решения рекомендуется провести тщательный анализ и консультацию с финансовыми экспертами, чтобы выбрать наиболее подходящий вариант для вас."
                            }
                        </p>
                    </div>
                </div>
            {/* </CustomScrollbar> */}
        </Sidebar>
    );
});
