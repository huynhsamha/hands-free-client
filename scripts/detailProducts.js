const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');
const async = require('async');
const listShortProducts = require('./database/shortProducts.json');

const convertPriceText2Price = priceText => Number(String(priceText).replace(/[.\s₫]*/g, ''));

const getHTML = async (item) => {
  const response = await axios.get(item.detailURL);
  const $ = cheerio.load(response.data);

  const detailProduct = {
    ...item,
    galleryImages: [],
    status: '',
    warranty: '',
    technicalInfo: []
  };

  $('img.gallery-image').each((idx, ele) => {
    detailProduct.galleryImages.push($(ele).attr('src'));
  });

  $('.technical-info').find('tr').each((idx, ele) => {
    detailProduct.technicalInfo.push({
      name: $(ele).find('td').first().text(),
      value: $(ele).find('td').last().text()
    });
  });

  $('.right').find('b').each((idx, ele) => {
    const text = $(ele).text();
    console.log(text);
    if (text == 'Tình trạng') {
      detailProduct.status = $(ele).parent().find('span').text();
      console.log(detailProduct.status);
    } else if (text == 'Bảo hành') {
      detailProduct.warranty = $(ele).parent().find('span').text();
      console.log(detailProduct.warranty);
    }
  });

  return detailProduct;
};

const listDetailProducts = [];

async.eachSeries(listShortProducts, async (item) => {
  console.log(item);
  const detail = await getHTML(item);
  listDetailProducts.push(detail);
  Promise.resolve();

}, (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  fs.writeFileSync('./database/detailProducts.json', JSON.stringify(listDetailProducts, null, 4));
});
