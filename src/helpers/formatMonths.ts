export function formatMonths(months: any) {
    if (months <= 12) {
        return `${Math.round(months)} месяцев`;
    }

    let years = Math.floor(months / 12);
    let remainingMonths = Math.round(months % 12);

    // Если остаток равен 12 месяцев, добавляем год
    if (remainingMonths === 12) {
        years += 1;
        remainingMonths = 0;
    }

    let result = `${years} ${years === 1 ? "год" : years >= 2 && years <= 4 ? "года" : "лет"}`;

    if (remainingMonths > 0) {
        result += ` ${remainingMonths} ${remainingMonths === 1 ? "месяц" : remainingMonths >= 2 && remainingMonths <= 4 ? "месяца" : "месяцев"}`;
    }

    return result;
}
