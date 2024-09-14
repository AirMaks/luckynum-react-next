let exclude: bigint[] = [];

export const getRandomNumber = (minValue: number | string, maxValue: number | string, isExclude: boolean) => {
    const errors = {
        noNumberLast: "Не осталось числа, которое бы не повторилось."
    };

    const errorText: any = [];
    let min = BigInt(minValue);
    let max = BigInt(maxValue);

    if (min > max) {
        [min, max] = [max, min];
    }

    const rangeSize = BigInt(max - min + BigInt(1));

    if (isExclude && exclude.length >= Number(rangeSize)) {
        errorText.push(errors.noNumberLast);
        return errorText;
    }

    let randomNumber: bigint;
    do {
        randomNumber = BigInt(Math.floor(Math.random() * Number(rangeSize))) + min;
    } while (isExclude && exclude.includes(randomNumber));

    if (isExclude) {
        exclude.push(randomNumber);
    } else {
        exclude = [];
    }

    return Number(randomNumber.toString()); // Возвращаем строку, т.к. число может быть большим например 10000000n
};
