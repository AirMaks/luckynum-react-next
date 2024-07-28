// import cn from "classnames";
// import cls from "./SlideInfo.module.scss";
// import { FC, ReactNode, useState } from "react";
// import CloseIcon from "shared/assets/icons/settings/close.svg";
// export enum AppLinkTheme {
//     PRIMARY = "primary",
//     SECONDARY = "secondary"
// }
// interface SlideInfoProps {
//     className?: string;
//     theme?: AppLinkTheme;
//     children?: ReactNode;
//     btnText?: string;
// }
// export const SlideInfo: FC<SlideInfoProps> = props => {
//     const { className, children, theme, btnText, ...otherProps } = props;
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <>
//             <div className={cls.btnInfo} onClick={() => setIsOpen(prev => !prev)}>
//                 {btnText}
//             </div>
//             <div className={cn(cls.SlideInfo, { [cls.isOpen]: isOpen })}>
//                 <CloseIcon width={15} height={15} className="fill-stone-800" onClick={() => setIsOpen(false)} />
//                 <div {...otherProps} className={cn(cls.info, { [cls.infoIsOpen]: isOpen }, [className, cls[theme]])}>
//                     {children}
//                 </div>
//             </div>
//         </>
//     );
// };
