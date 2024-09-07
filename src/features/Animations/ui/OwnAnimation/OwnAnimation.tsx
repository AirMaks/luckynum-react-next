import cn from "classnames";
import cls from "./OwnAnimation.module.scss";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { animationActions } from "features/Animations/model/slice/animationSlice";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";

interface SidebarProps {
    className?: string;
    isOpenOwnAnimation?: boolean;
    openAnimations?: () => void;
    onClose?: () => void;
}

export const OwnAnimation = ({ className, isOpenOwnAnimation, onClose }: SidebarProps) => {
    const dispatch = useDispatch();
    const srcAnimation = useSelector(getAnimationSrc);
    const onChangeAnimation = useCallback(
        ({ target }: any) => {
            dispatch(animationActions.setSrc(target.value));
        },
        [dispatch]
    );
    return (
        <Sidebar isOpen={isOpenOwnAnimation} lazy className={cn(cls.OwnAnimation, {}, [className])}>
            <CloseIcon width={30} height={30} className="fill-stone-800" onClick={onClose} />
            <div className={cls.items_container}>
                <h3 className={cn(cls.heading, {}, [])}>Вставьте ссылку с расширением gif</h3>
                <input className={cls.input} onChange={onChangeAnimation} value={srcAnimation} />
            </div>
        </Sidebar>
    );
};
