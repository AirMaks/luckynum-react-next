export const formatPrice = (price: any, showCurrency = true) => {
    const formattedPrice = Number(parseFloat(price)?.toFixed(2))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return showCurrency ? `${formattedPrice} ₽` : formattedPrice;
};
