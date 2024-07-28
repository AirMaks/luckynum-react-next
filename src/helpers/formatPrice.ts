export const formatPrice = (price: any) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
