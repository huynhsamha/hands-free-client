const fs = require('fs');
const path = require('path');
const numeral = require('numeral');
let products = require('../database/shortProducts.json');

function convertPriceToText(price, forNull) {
  if (price) return `${numeral(price).format('0,0')} đ`;
  return forNull;
}

function convertTextToPrice(priceText) {
  Number(String(priceText).replace(/[.,\s₫đ]*/g, ''));
}


products = products.map((item) => {
  item.priceText = convertPriceToText(item.price, 'Giá liên hệ');
  item.ceilPriceText = convertPriceToText(item.ceilPrice, null);
  return item;
});

fs.writeFileSync(path.join(__dirname, './database/fixPriceShortProducts.json'),
  JSON.stringify(products, null, 4));
