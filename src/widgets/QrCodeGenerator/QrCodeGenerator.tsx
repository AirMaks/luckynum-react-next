"use client";

import { useState } from "react";
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
import cn from "classnames";

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Генератор Qr кода",
          "url": "https://lucky-num.ru/qr-code-generator",
          "description": "Генератор Qr кода помогает получить Qr код.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

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
    const [message, setMessage] = useState<any>("");
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
        const canvas = document.querySelector("canvas");
        if (canvas) {
            toPng(canvas, { backgroundColor: "" })
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
        const canvas = document.querySelector("canvas");
        if (canvas) {
            toSvg(canvas)
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
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={addProductJsonLd()} key="page-jsonld" />
            <div className="px-[10px] pb-[40px] max-w-[430px] mx-auto mt-[20px] max-sm:mt-[10px] select-none">
                <div className="bg-[#f5f5f7] shadow rounded p-[20px] max-sm:px-[10px] mb-[30px]">
                    <h1 className="mb-[15px] text-center text-[24px] font-medium max-sm:text-[17px]" aria-level={1}>
                        QR код генератор
                    </h1>
                    <SelectList
                        onSelectClick={onSelectClick}
                        autofocus
                        isOpenSelect={isOpenSelect}
                        onSelectItemClick={onSelectItemClick}
                        items={["Ссылка", WHATSAPP, TELEGRAM, SMS, WIFI]}
                        selectedItem={qrType}
                        className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] mb-[15px]"
                        ariaDescribedby="Выбор типа QR-кода"
                    />
                    {qrType === "Ссылка" && (
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="https://"
                            className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                            ariaLabel="Введите ссылку"
                        />
                    )}
                    {qrType === TELEGRAM && (
                        <Input
                            type="text"
                            autofocus
                            value={telegramInputValue}
                            onChange={handleTelegramInputChange}
                            placeholder="Введите никнейм"
                            className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                            ariaLabel="Введите никнейм Telegram"
                        />
                    )}
                    {qrType === WIFI && (
                        <>
                            <Input
                                type="text"
                                autofocus
                                value={ssidInputValue}
                                onChange={handleSsidInputChange}
                                placeholder="SSID"
                                className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                ariaLabel="Введите SSID Wi-Fi"
                            />
                            <SelectList
                                onSelectClick={onEncryptSelectClick}
                                isOpenSelect={isOpenEncryptSelect}
                                onSelectItemClick={onEncryptSelectItemClick}
                                items={["WPA/WPA2", "WEP", "nopass"]}
                                selectedItem={encrypt}
                                className="h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] mb-[15px]"
                                ariaDescribedby="Выбор типа шифрования Wi-Fi"
                            />
                            <Input
                                type="text"
                                value={wifiPassword}
                                onChange={handleWifiPasswordChange}
                                placeholder="Пароль"
                                className="w-full mb-[15px] h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px]"
                                ariaLabel="Введите пароль Wi-Fi"
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
                                    className="!w-auto cursor-pointer"
                                    ariaLabel="Скрыть SSID"
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
                            buttonClass="!bg-[#fbfbfb] !border-[#e9e9e9]"
                            dropdownClass="!bg-[#fbfbfb] !border-[#e9e9e9] !rounded"
                            inputClass="!w-full !h-[40px] max-sm:h-[38px] text-[20px] max-sm:text-[16px] !bg-[#fbfbfb] !border-[#e9e9e9]"
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
                                    className="text-[20px] max-sm:text-[16px] block no-underline transition-all w-full outline-none p-[6px] leading-tight min-h-[58px] max-h-[170px] min-w-full overflow-auto text-left"
                                    ariaLabel="Введите сообщение"
                                    onChange={handleTextareaChange}></Textarea>
                            </FormFieldWrapper>
                        </div>
                    )}
                    <div className="flex justify-between flex-wrap mb-[15px]">
                        <Button
                            onClick={downloadPNG}
                            className={cn("bg-yellow-500 px-[5px] py-[2px] text-white", { "opacity-50": !qrValue })}
                            ariaLabel="Скачать QR-код в формате PNG"
                            disabled={!qrValue}>
                            Скачать PNG
                        </Button>
                        <Button
                            onClick={downloadSVG}
                            className={cn("bg-green-500 px-[5px] py-[2px] text-white", { "opacity-50": !qrValue })}
                            ariaLabel="Скачать QR-код в формате SVG"
                            disabled={!qrValue}>
                            Скачать SVG
                        </Button>
                    </div>
                    <Button
                        onClick={generateQrValue}
                        className="leading-[0] min-h-[62px] max-sm:min-h-[48px] shadow bg-blue-500 text-white hover:bg-blue-600 max-sm:hover:bg-blue-600 max-sm:hover:text-inherit border-0 rounded text-[20px] max-sm:text-[16px]"
                        ariaLabel="Сгенерировать QR-код">
                        Создать QR
                    </Button>
                </div>
                <div className="min-h-[256px] flex justify-center">
                    {qrValue && <QRCodeCanvas value={qrValue} size={256} aria-label="Ваш QR-код" />}
                </div>
                <p className="mt-[20px] mx-auto max-w-[430px] text-justify max-sm:px-[10px] mb-[20px]">
                    Генератор QR-кодов — это простой и быстрый способ создать нужный вам QR-код. Хотите поделиться ссылкой на WhatsApp, Telegram или
                    отправить SMS? Просто введите ссылку или номер телефона, а для создания QR-кода для Wi-Fi — укажите данные сети. После генерации
                    вы сможете легко скачать QR-код в формате PNG или SVG и использовать его где угодно.
                </p>
            </div>
        </>
    );
};

export default QRCodeGenerator;
