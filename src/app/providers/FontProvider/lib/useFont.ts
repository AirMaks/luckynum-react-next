// "use client";

// import { LOCAL_STORAGE_FONT_KEY, Font, FontContext } from "./FontContext";

// import { useContext } from "react";

// export interface UseFontResult {
//     font: Font;
//     toggleFont: () => void;
// }
// export function useFont(): UseFontResult {
//     const { font, setFont } = useContext(FontContext);

//     const toggleFont = () => {
//         const newFont = font === Font.BOLD ? Font.REGULAR : Font.BOLD;
//         setFont(newFont);
//         localStorage.setItem(LOCAL_STORAGE_FONT_KEY, newFont);
//     };

//     return { font, toggleFont };
// }
