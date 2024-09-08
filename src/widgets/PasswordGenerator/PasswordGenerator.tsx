"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Button } from "shared/ui/Button/Button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CopyToClipboardButton from "shared/ui/Copy/Copy";

const PasswordGenerator = ({ includeNum, includeSym, len }: any) => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState<any>(len || 8);
    const [includeNumbers, setIncludeNumbers] = useState(!!includeNum);
    const [includeSymbols, setIncludeSymbols] = useState(!!includeSym);

    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generatePassword = () => {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

        let characters = letters;
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex];
        }

        setPassword(generatedPassword);
    };

    return (
        <div className="px-[10px] pb-[40px] select-none">
            <div className={cn("mx-auto mt-[20px] max-sm:mt-[10px] bg-[#f7f7f7] max-w-[430px] rounded p-[20px]")}>
                <h1 className="mb-[20px] text-center text-[24px] font-bold max-sm:text-[17px]">Генератор паролей</h1>
                <div className={cn("flex mt-[10px] mb-[20px] flex-col")}>
                    <div>
                        <h3 className="mb-[10px] text-[20px] max-sm:text-[16px]">
                            Длина пароля: <span className="font-bold">{length}</span>
                        </h3>
                        <Slider
                            trackStyle={{ backgroundColor: "#2569e1" }}
                            handleStyle={{
                                backgroundColor: "#2569e1",
                                borderColor: "#2569e1",
                                opacity: 1,
                                boxShadow: "none",
                                width: "20px",
                                height: "20px",
                                marginTop: "-8px"
                            }}
                            min={1}
                            max={20}
                            className=""
                            value={length}
                            onChange={value => setLength(value)}
                        />
                    </div>
                    <div className="mt-[20px] flex justify-between gap-[10px] max-sm:flex-col max-sm:text-[16px]">
                        <label className="cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers(!includeNumbers)}
                                className="mr-[5px]"
                            />
                            Включить цифры
                        </label>
                        <label className="cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() => setIncludeSymbols(!includeSymbols)}
                                className="mr-[5px]"
                            />
                            Включить символы
                        </label>
                    </div>
                </div>

                <Button
                    className="min-h-[62px] max-sm:min-h-[50px] bg-white-500 hover:bg-stone-800 hover:text-white border border-black rounded mt-2 text-[20px] max-sm:text-[16px]"
                    onClick={generatePassword}>
                    Сгенерировать
                </Button>
            </div>
            <div className="max-w-[430px] mx-auto text-center mt-[30px]">
                <h2 className="text-[26px] max-sm:text-[18px] mb-[10px]">Скопируйте ваш пароль кликом:</h2>
                <div className="text-[30px] max-sm:text-[20px] font-bold cursor-pointer hover:text-[#45a12e] transition-colors hover:transition-colors">
                    {/* <CopyToClipboardButton textToCopy={password} /> */}
                    <div>{password}</div>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
