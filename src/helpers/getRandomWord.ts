// import i18next from "i18next";

let exclude: string[] = [];

export const getRandomWord = (list: any, isExclude: boolean) => {
    const errors = {
        noWordLast: "Не осталось ни одного слова, которое бы не повторилось.",
        noWords: list.trim() === "" ? "Введите слова или символы через запятую или с переносами строк." : false
    };

    const errorText: any = [];
    if (errors.noWords) {
        if (errors.noWords) {
            errorText.push(errors.noWords);
        }
        return errorText;
    }

    const lastCommaIndex = list.lastIndexOf(",");

    if (lastCommaIndex !== -1 && lastCommaIndex === list.length - 1) {
        list = list.slice(0, lastCommaIndex).replace(/,+$/g, "");
    }

    if (list.includes("\n")) {
        list = list
            .replace(/,+/g, "")
            .split("\n")
            .reduce((acc: string[], curr: string) => {
                if (!acc.includes(curr)) {
                    acc.push(curr);
                }
                return acc;
            }, []);
    } else {
        list = list
            .replace(/,+/g, ",")
            .split(",")
            .reduce((acc: string[], curr: string) => {
                if (!acc.includes(curr)) {
                    acc.push(curr);
                }
                return acc;
            }, []);
    }
    let randomWord: any;

    if (isExclude) {
        if (exclude.length < list.length) {
            do {
                const randomIndex = Math.floor(Math.random() * list.length);
                randomWord = list[randomIndex];
            } while (exclude.includes(randomWord));

            exclude.push(randomWord);
            return randomWord;
        }
        errorText.push(errors.noWordLast);
        return errorText;
    }

    exclude = [];

    const randomIndex = Math.floor(Math.random() * list.length);
    randomWord = list[randomIndex];
    return randomWord;
};
