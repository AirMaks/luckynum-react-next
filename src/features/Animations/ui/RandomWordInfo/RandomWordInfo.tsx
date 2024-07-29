import cn from "classnames";
import { useTranslation } from "react-i18next";
import cls from "./RandomWordInfo.module.scss";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import { memo } from "react";
// import CustomScrollbar from "shared/ui/CustomScrollbar/CustomScrollbar";

interface SidebarProps {
    className?: string;
    isOpenRandomWordInfo?: boolean;
    openRandomWordInfo?: () => void;
    onClose?: () => void;
}

export const RandomWordInfo = memo(({ className, isOpenRandomWordInfo, onClose }: SidebarProps) => {
    const { t } = useTranslation();

    return (
        <Sidebar isOpen={isOpenRandomWordInfo} className={cn(cls.RandomWordInfo, { [cls.opened]: isOpenRandomWordInfo }, [className])}>
            <CloseIcon width={30} height={30} className="fill-stone-800" onClick={onClose} />
            {/* <CustomScrollbar className={cls.overflow}> */}
            <h2>{"Как пользоваться нашим генератором случайных слов"}</h2>
            <ul className={cls.ul}>
                <li>
                    <b>1.</b> {t("Введите слова или символы через запятую, например: (апельсин, банан, яблоко) или с переносом строк")}
                </li>
                <li>
                    <b>2.</b>
                    {t(
                        "В поле ВРЕМЯ АНИМАЦИИ введите время в секундах. Нажмите на шестерёнку в левом верхнем углу, затем кликните на пункт АНИМАЦИЯ и выберите анимацию."
                    )}
                </li>
                <li>
                    <b>3.</b>
                    {t(
                        "Также вы можете вставить свою анимацию в пункте СВОЯ АНИМАЦИЯ, вам нужно будет вставить ссылку с расширением .gif, например: "
                    )}
                    <span className={cls.url}>
                        {"https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif"}
                    </span>
                </li>
                <li>
                    <b>4.</b> {t("Нажмите кнопку ИСКЛЮЧИТЬ ПОВТОРЕНИЯ для того, чтобы одно слово не могло появиться больше одного раза.")}
                </li>
                <li>
                    <b>5.</b> {t("Кликните на кнопку ПОЛУЧИТЬ СЛУЧАЙНОЕ СЛОВО, чтобы сгенерировать рандомное слово.")}
                </li>
            </ul>
            {/* </CustomScrollbar> */}
        </Sidebar>
    );
});
