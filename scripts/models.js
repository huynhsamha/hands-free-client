const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');
const async_ = require('async');
const listBrands = require('./database/brands.json');

const getHTML = async (brand, url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  let listModels = [];
  $('#narrow-by-list2').find('li').each((idx, ele) => {
    const url = $(ele).find('a').attr('href').trim();
    const model = $(ele).find('a').text().replace(/(\s\s)]*/g, '')
      .trim();

    listModels.push({
      brand, model, url
    });
  });

  if (listModels.length == 0) listModels = [{ brand, url }];

  return listModels;
};

let listModels = [];

async_.eachSeries(listBrands, async (brand) => {
  console.log(brand);
  const models = await getHTML(brand.brand, brand.url);
  console.log(models);
  listModels = [...listModels, ...models];
  Promise.resolve();

}, (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  fs.writeFileSync('./database/models.json', JSON.stringify(listModels, null, 4));
});
