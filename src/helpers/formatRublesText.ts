export const formatRublesText = (n: any) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) {
      return "рублей";
    }

    if (n1 > 1 && n1 < 5) {
      return "рубля";
    }

    if (n1 == 1) {
      return "рубль";
    }

    return "рублей";
};
