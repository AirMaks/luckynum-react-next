"use client";

import cn from "classnames";
import { useTranslation } from "react-i18next";
import cls from "./Animations.module.scss";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import { animationActions, animationReducer } from "../../model/slice/animationSlice";
import { useDispatch, useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/shared/DynamicModuleLoader/DynamicModuleLoader";
import gif1 from "shared/assets/images/1.gif";
import gif2 from "shared/assets/images/2.gif";
import gif3 from "shared/assets/images/3.gif";
import gif4 from "shared/assets/images/4.gif";
import gif5 from "shared/assets/images/5.gif";
import gif6 from "shared/assets/images/6.gif";
import gif7 from "shared/assets/images/7.gif";
import gif8 from "shared/assets/images/8.gif";
import gif9 from "shared/assets/images/9.gif";
import gif10 from "shared/assets/images/10.gif";
import gif11 from "shared/assets/images/11.gif";
import gif12 from "shared/assets/images/12.gif";
import gif13 from "shared/assets/images/13.gif";
import gif14 from "shared/assets/images/14.gif";
import gif15 from "shared/assets/images/15.gif";
import gif16 from "shared/assets/images/16.gif";
import gif17 from "shared/assets/images/17.gif";
import gif18 from "shared/assets/images/18.gif";
import gif19 from "shared/assets/images/19.gif";
import gif20 from "shared/assets/images/20.gif";
import { memo, useCallback } from "react";
import { getAnimationSrc } from "features/Animations/model/selectors/getAnimationSrc/getAnimationSrc";
// import CustomScrollbar from "shared/ui/CustomScrollbar/CustomScrollbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
    className?: string;
    isOpenAnimations?: boolean;
    openAnimations?: () => void;
    onClose?: () => void;
}

const initialReducers: ReducersList = {
    animation: animationReducer
};

export const Animations = memo(({ className, isOpenAnimations, onClose }: SidebarProps) => {
    const pathname = usePathname();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const srcAnimation = useSelector(getAnimationSrc);
    const onClickAnimation = useCallback(
        ({ target }: any) => {
            dispatch(animationActions.setSrc(target.src));
        },
        [dispatch]
    );
    const src = srcAnimation.replace(`${pathname}`, "") || gif1;

    return (
        // <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <Sidebar isOpen={isOpenAnimations} lazy className={cn(cls.Animations, {}, [className])}>
            <CloseIcon width={30} height={30} className="fill-stone-800" onClick={onClose} />
            <div className={cls.items_container}>
                <h3 className={cn(cls.heading, {}, [])}>{t("Выберите анимацию")}</h3>
                {/* <CustomScrollbar className={cls.items}> */}
                <Image src={gif1} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif1 }, [])} alt="cat gif" />
                <Image src={gif2} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif2 }, [])} alt="rocket gif" />
                <Image src={gif3} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif3 }, [])} alt="dancer girl gif" />
                <Image src={gif4} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif4 }, [])} alt="gatsby gif" />
                <Image src={gif5} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif5 }, [])} alt="dice gif" />
                <Image src={gif6} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif6 }, [])} alt="space gif" />
                <Image src={gif7} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif7 }, [])} alt="world gif" />
                <Image src={gif8} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif8 }, [])} alt="tree gif" />
                <Image src={gif9} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif9 }, [])} alt="rocket gif draw" />
                <Image src={gif10} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif10 }, [])} alt="firework gif" />
                <Image src={gif11} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif11 }, [])} alt="spider man gif" />
                <Image src={gif12} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif12 }, [])} alt="mem gif" />
                <Image src={gif13} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif13 }, [])} alt="dog gif" />
                <Image src={gif14} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif14 }, [])} alt="guitar gif" />
                <Image src={gif15} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif15 }, [])} alt="dancing girl gif" />
                <Image src={gif16} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif16 }, [])} alt="lamp gif" />
                <Image src={gif17} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif17 }, [])} alt="drum gif" />
                <Image src={gif18} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif18 }, [])} alt="rubik gif" />
                <Image src={gif19} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif19 }, [])} alt="banana gif" />
                <Image src={gif20} onClick={onClickAnimation} className={cn("", { [cls.border]: src === gif20 }, [])} alt="kitty gif" />
                {/* </CustomScrollbar> */}
            </div>
        </Sidebar>
        // </DynamicModuleLoader>
    );
});
