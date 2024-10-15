"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Input } from "shared/ui/Input/Input";
import { toPng, toSvg } from "html-to-image";
import { Button } from "shared/ui/Button/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { E164Number } from "libphonenumber-js";
import ru from "react-phone-input-2/lang/ru.json";
import { SelectList } from "widgets/calculators/SelectList";
import { Textarea } from "shared/ui/Textarea/Textarea";
import { FormFieldWrapper } from "shared/ui/FormFieldWrapper";

const WHATSAPP = "Whatsapp";
const TELEGRAM = "Telegram";
const SMS = "Sms";
const WIFI = "WI-FI";

const whatsapp = "https://wa.me/";
const telegram = "https://t.me/";
const sms = "sms:+";
const wifi = "WIFI:T:";

const QRCodeGenerator = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<E164Number | null>(null);
    const [qrType, setQrType] = useState("Ссылка");

    const [encrypt, setEncrypt] = useState("nopass");
    const [wiFiHidden, setWiFiHidden] = useState(false);
    const [wifiPassword, setWifiPassword] = useState("");
    const [ssidInputValue, setSsidInputValue] = useState("");

    const [qrValue, setQrValue] = useState("");
    const [telegramInputValue, setTelegramInputValue] = useState("");
    const [message, setMessage] = useState("");
    const qrRef = useRef<HTMLDivElement>(null);
    const [isOpenSelect, setIsOpenSelect] = useState<any>(false);
    const [isOpenEncryptSelect, setIsOpenEncryptSelect] = useState(false);

    const resetState = () => {
        setQrValue("");
        setTelegramInputValue("");
        setInputValue("");
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleSsidInputChange = (value: string) => {
        setSsidInputValue(value);
    };

    const handleTelegramInputChange = (value: string) => {
        setTelegramInputValue(value);
    };

    const handleWifiPasswordChange = (value: string) => {
        setWifiPassword(value);
    };

    const downloadPNG = () => {
        if (qrRef.current) {
            toPng(qrRef.current)
                .then(dataUrl => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "qr-code.png";
                    link.click();
                })
                .catch(err => {
                    console.error("Ошибка при скачивании PNG:", err);
                });
        }
    };

    const downloadSVG = () => {
        if (qrRef.current) {
            toSvg(qrRef.current)
                .then(dataUrl => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "qr-code.svg";
                    link.click();
                })
                .catch(err => {
                    console.error("Ошибка при скачивании SVG:", err);
                });
        }
    };

    const onSelectClick = () => {
        setIsOpenSelect((prev: any) => !prev);
    };

    const onSelectItemClick = (value: any) => {
        if (value !== qrType) {
            resetState();
        }
        setQrType(value);
    };

    const onEncryptSelectClick = () => {
        setIsOpenEncryptSelect((prev: any) => !prev);
    };

    const onEncryptSelectItemClick = (value: any) => {
        setEncrypt(value);
    };

    const handleTextareaChange = (value: any) => {
        setMessage(value);
    };

    const prefix = qrType === WHATSAPP ? whatsapp : qrType === TELEGRAM ? telegram : qrType === SMS ? sms : qrType === WIFI ? wifi : "";
    const generateQrValue = () => {
        const qrValue: any =
            qrType === "Ссылка"
                ? inputValue
                : qrType === SMS
                  ? `${prefix}${phoneNumber}${message && `&body=${encodeURIComponent(message.trim())}`}`
                  : qrType === WIFI
                    ? `${prefix}${encrypt === "WPA/WPA2" ? "WPA" : encrypt};S:${ssidInputValue};P:${wifiPassword};H:${wiFiHidden};`
                    : qrType === TELEGRAM
                      ? `${prefix}${telegramInputValue}${message && `?text=${encodeURIComponent(message.trim())}`}`
                      : `${prefix}${phoneNumber}${message && `?text=${encodeURIComponent(message.trim())}`}`;

        setQrValue(qrValue);
    };

    return (
        <div className="px-[10px] pb-[40px] max-w-[430px] mx-auto mt-[20px] max-sm:mt-[10px] select-none">
            <div className=" bg-[#f7f7f7] shadow rounded p-[20px] max-sm:px-[10px] mb-[30px]">
                <h1 className="mb-[15px] text-center text-[24px] font-medium max-sm:text-[17px]">QR Code генератор</h1>
                <SelectList
                    onSelectClick={onSelectClick}
                    isOpenSelect={isOpenSelect}
                    onSelectItemClick={onSelectItemClick}
                    items={["Ссылка", WHATSAPP, TELEGRAM, SMS, WIFI]}
                    selectedItem={qrType}
                    className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] mb-[15px]"
                />
                {qrType === "Ссылка" && (
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="https://"
                        className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                    />
                )}
                {qrType === TELEGRAM && (
                    <Input
                        type="text"
                        value={telegramInputValue}
                        onChange={handleTelegramInputChange}
                        placeholder="Введите никнейм"
                        className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                    />
                )}
                {qrType === WIFI && (
                    <>
                        <Input
                            type="text"
                            value={ssidInputValue}
                            onChange={handleSsidInputChange}
                            placeholder="SSID"
                            className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                        />
                        <SelectList
                            onSelectClick={onEncryptSelectClick}
                            isOpenSelect={isOpenEncryptSelect}
                            onSelectItemClick={onEncryptSelectItemClick}
                            items={["WPA/WPA2", "WEP", "nopass"]}
                            selectedItem={encrypt}
                            className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] mb-[15px]"
                        />
                        <Input
                            type="text"
                            value={wifiPassword}
                            onChange={handleWifiPasswordChange}
                            placeholder="Пароль"
                            className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                        />
                        <FormFieldWrapper
                            label="Скрыть SSID"
                            htmlFor="wifi_hidden"
                            labelClassName="cursor-pointer !relative left-[unset] top-[unset] p-0 mr-[5px]"
                            className="flex mb-[20px]">
                            <Input
                                id="wifi_hidden"
                                type="checkbox"
                                value={wiFiHidden}
                                onChange={() => setWiFiHidden(prev => !prev)}
                                className="w-auto cursor-pointer"
                            />
                        </FormFieldWrapper>
                    </>
                )}
                {[WHATSAPP, SMS].includes(qrType) && (
                    <PhoneInput
                        country={"ru"}
                        value={phoneNumber}
                        onChange={value => setPhoneNumber(value as E164Number)}
                        localization={ru}
                        inputClass="!w-full !h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                        containerClass="w-full mb-[15px] !h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                        enableSearch={true}
                        placeholder=""
                    />
                )}
                {[WHATSAPP, TELEGRAM, SMS].includes(qrType) && (
                    <div className="mb-[15px] max-sm:mb-[10px]">
                        <FormFieldWrapper label="Сообщение">
                            <Textarea
                                spellcheck={false}
                                id="textarea"
                                className="text-[20px] max-sm:text-[16px] block no-underline bg-transparent transition-all w-full outline-none p-[6px] leading-tight border border-black min-h-[58px] max-h-[170px] min-w-full overflow-auto text-left"
                                onChange={handleTextareaChange}></Textarea>
                        </FormFieldWrapper>
                    </div>
                )}
                <div className="flex justify-between flex-wrap mb-[15px]">
                    <Button onClick={downloadPNG} className="bg-yellow-500 px-[5px] py-[2px] text-white">
                        Скачать PNG
                    </Button>
                    <Button onClick={downloadSVG} className="bg-green-500 px-[5px] py-[2px] text-white">
                        Скачать SVG
                    </Button>
                </div>
                <Button
                    onClick={generateQrValue}
                    className="min-h-[34px] max-sm:min-h-[48px] bg-blue-500 text-white rounded text-[20px] max-sm:text-[16px]">
                    Генерировать
                </Button>
            </div>
            <div className="flex justify-center" ref={qrRef}>
                {qrValue && <QRCodeCanvas value={qrValue} size={256} />}
            </div>
        </div>
    );
};

export default QRCodeGenerator;
