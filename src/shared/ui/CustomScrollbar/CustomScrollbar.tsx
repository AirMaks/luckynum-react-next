// "use client";

// import { useRef, useEffect } from "react";
// import cls from "./CustomScrollbar.module.scss";
// import cn from "classnames";

// const CustomScrollbar = ({ children, className }: any) => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const container = containerRef.current;
//         container.addEventListener("scroll", handleScroll);
//         return () => container.removeEventListener("scroll", handleScroll);
//     }, []);

//     const handleScroll = () => {};

//     return (
//         <div className={cn(cls.customScrollbar, {}, [className])} ref={containerRef}>
//             {children}
//         </div>
//     );
// };

// export default CustomScrollbar;
