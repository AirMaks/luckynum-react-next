export const sanitizeSymbols = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");
    return sanitizedValue === "00" ? 0 : Number(sanitizedValue);
};

export const sanitizePercents = (value: string) => {
    if (value.trim() === "") {
        return "0";
    }

    let sanitizedValue = value.replace(/[^\d.]/g, "");

    let dotIndex = sanitizedValue.indexOf(".");
    if (dotIndex !== -1) {
        sanitizedValue = sanitizedValue.slice(0, dotIndex + 1) + sanitizedValue.slice(dotIndex + 1).replace(/\./g, "");
    }

    if (sanitizedValue.split(".").length - 1 > 1) {
        sanitizedValue = sanitizedValue.replace(/\./g, "");
    }

    sanitizedValue = sanitizedValue.replace(/^0+(\d)/, "$1");

    if (sanitizedValue === "") {
        return "0";
    }

    return sanitizedValue;
};
