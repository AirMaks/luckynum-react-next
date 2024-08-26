export function formatMonths(months: any) {
    if (months <= 12) {
        return `${Math.ceil(months)} ${Math.ceil(months) === 1 ? "месяц" : Math.ceil(months) >= 2 && Math.ceil(months) <= 4 ? "месяца" : "месяцев"}`;
    }

    let years = Math.floor(months / 12);
    let remainingMonths = Math.round(months % 12);

    // Если остаток равен 12 месяцев, добавляем год
    if (remainingMonths === 12) {
        years += 1;
        remainingMonths = 0;
    }

    let txt;
    let count = years % 100;
    if (count >= 5 && count <= 20) {
        txt = "лет";
    } else {
        count = count % 10;
        if (count == 1) {
            txt = "год";
        } else if (count >= 2 && count <= 4) {
            txt = "года";
        } else {
            txt = "лет";
        }
    }

    let result = `${years} ${txt}`;

    if (remainingMonths > 0) {
        result += ` ${remainingMonths} ${remainingMonths === 1 ? "месяц" : remainingMonths >= 2 && remainingMonths <= 4 ? "месяца" : "месяцев"}`;
    }

    return result;
}
