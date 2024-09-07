let exclude: number[] = [];

export const getRandomNumber = (min: number, max: number, isExclude: boolean) => {
    const errors = {
        minGreaterMax: min > max ? "Число От должно быть меньше числа До." : false,
        minNegative: min < 0 ? "Число От не должно быть отрицательным." : false,
        maxNegative: max < 0 ? "Число До не должно быть отрицательным." : false,
        noNumberLast: "Не осталось ни одного числа, которое бы не повторилось.",
        minEmpty: min.toString().trim() === "" ? "Введите число От" : false,
        maxEmpty: max.toString().trim() === "" ? "Введите число До" : false
    };

    const errorText: any = [];
    if (errors.minGreaterMax || errors.minNegative || errors.maxNegative || errors.minEmpty || errors.maxEmpty) {
        if (errors.minGreaterMax && !errors.maxEmpty) {
            errorText.push(errors.minGreaterMax);
        }
        if (errors.minNegative && !errors.minEmpty) {
            errorText.push(errors.minNegative);
        }
        if (errors.maxNegative) {
            errorText.push(errors.maxNegative);
        }
        if (errors.minEmpty) {
            errorText.push(errors.minEmpty);
        }
        if (errors.maxEmpty) {
            errorText.push(errors.maxEmpty);
        }
        return errorText;
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
