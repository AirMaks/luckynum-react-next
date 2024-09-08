let exclude: number[] = [];

export const getRandomNumber = (minValue: number | string, maxValue: number | string, isExclude: boolean) => {
    const errors = {
        noNumberLast: "Не осталось ни одного числа, которое бы не повторилось.",
    };

    const errorText: any = [];
    let min = Number(minValue);
    let max = Number(maxValue);

    // Если min больше max, меняем их местами
    if (min > max) {
        [min, max] = [max, min];
    }

    const array = [];
    let randomNumber: number | boolean;
    for (let i: any = min; i <= max; i++) {
        array.push(i);
    }

    if (isExclude) {
        if (exclude.length < array.length) {
            do {
                randomNumber = Math.floor(Math.random() * (+max - +min + 1)) + +min;
            } while (exclude.includes(randomNumber));

            exclude.push(randomNumber);
            return randomNumber;
        }
        errorText.push(errors.noNumberLast);
        return errorText;
    }

    exclude = [];
    return Math.floor(Math.random() * (+max - +min + 1)) + +min;
};
