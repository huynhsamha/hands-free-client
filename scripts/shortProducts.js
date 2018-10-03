const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');
const async = require('async');
const listModels = require('./database/models.json');

const convertPriceText2Price = priceText => Number(String(priceText).replace(/[.\s₫]*/g, ''));

const getHTML = async (brand, model, url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const listProducts = [];
  $('li.cate-pro-short').each((idx, ele) => {
    const thumbnail = $(ele).find('.lt-product-group-image > img').attr('src').trim();
    const info = $(ele).find('.lt-product-group-info');
    const name = info.find('h3').text().replace(/(\s\s)]*/g, '').trim();
    const oldPriceText = info.find('.old-price > .price').text();
    const specialPriceText = info.find('.special-price > .price').text();
    const regularPriceText = info.find('.regular-price > .price').text();
    const detailURL = $(ele).find('a.lt-product-group-info-hover').attr('href');

    let ceilPrice, price, ceilPriceText, priceText;

    if (regularPriceText) {
      priceText = regularPriceText;
      ceilPriceText = null;
      price = convertPriceText2Price(priceText);
      ceilPrice = null;
    } else {
      priceText = specialPriceText;
      ceilPriceText = oldPriceText;
      price = convertPriceText2Price(priceText);
      ceilPrice = convertPriceText2Price(ceilPriceText);
    }

    listProducts.push({
      brand, model,
      name, thumbnail,
      price, priceText,
      ceilPrice, ceilPriceText,
      detailURL
    });
  });

  return listProducts;

};

let listShortProducts = [];

async.eachSeries(listModels, async ({ brand, model, url }) => {
  console.log(brand, model, url);
  const ls = await getHTML(brand, model, url);
  listShortProducts = [...listShortProducts, ...ls];
  Promise.resolve();

}, (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  fs.writeFileSync('./database/shortProducts.json', JSON.stringify(listShortProducts, null, 4));
});
