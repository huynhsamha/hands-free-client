import numeral from 'numeral';

export function convertPriceToText(price) {
  return `${numeral(price).format('0,0')} đ`;
}


export function convertTextToPrice(priceText) {
  Number(String(priceText).replace(/[.\s₫đ]*/g, ''));
}
