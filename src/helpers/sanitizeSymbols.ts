export const sanitizeSymbols = (value: string) => Number(value.replace(/\D/g, ""));
