import cn from "classnames";
import cls from "./RandomNumberInfo.module.scss";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import { memo } from "react";

interface SidebarProps {
    className?: string;
    isOpenRandomNumberInfo?: boolean;
    openRandomNumberInfo?: () => void;
    onClose?: () => void;
}

export const RandomNumberInfo = memo(({ className, isOpenRandomNumberInfo, onClose }: SidebarProps) => {
    return (
        <Sidebar isOpen={isOpenRandomNumberInfo} className={cn("border-r", { [cls.opened]: isOpenRandomNumberInfo }, [className])}>
            <CloseIcon width={30} height={30} className="fill-stone-800" onClick={onClose} />
            <h2>{"Как пользоваться нашим генератором случайных чисел"}</h2>
            <div className="overflow-auto">
                <ul className={cls.ul}>
                    <li>
                        <b>1.</b> Введите положительное начальное число в поле ОТ.
                    </li>
                    <li>
                        <b>2.</b> Введите число в поле ДО, которое больше числа ОТ.
                    </li>
                    <li>
                        <b>3.</b> В поле ВРЕМЯ АНИМАЦИИ введите время в секундах. Нажмите на шестерёнку в левом верхнем углу, затем кликните на пункт
                        АНИМАЦИЯ и выберите анимацию.
                    </li>
                    <li>
                        <b>4.</b> Также вы можете вставить свою анимацию в пункте СВОЯ АНИМАЦИЯ, вам нужно будет вставить ссылку с расширением .gif,
                        например:
                        <span className={cls.url}>
                            https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif
                        </span>
                    </li>
                    <li>
                        <b>5.</b> Нажмите кнопку ИСКЛЮЧИТЬ ПОВТОРЕНИЯ для того, чтобы одно число не могло появиться больше одного раза.
                    </li>
                    <li>
                        <b>6.</b> Кликните на кнопку ПОЛУЧИТЬ СЛУЧАЙНОЕ ЧИСЛО, чтобы сгенерировать рандомное число.
                    </li>
                </ul>
            </div>
        </Sidebar>
    );
});
