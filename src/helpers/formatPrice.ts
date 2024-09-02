export const formatPrice = (price: any, showCurrency = true) => {
    let formattedPrice = Number(parseFloat(price)?.toFixed(2))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (["Infinity", "NaN", "-Infinity"].includes(formattedPrice)) {
        formattedPrice = "0";
    }

    return showCurrency ? `${formattedPrice} ₽` : formattedPrice;
};
