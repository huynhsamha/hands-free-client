const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');

const convertPriceText2Price = priceText => Number(String(priceText).replace(/[.\s₫]*/g, ''));

const getHTML = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const listBrands = [];
  $('#narrow-by-list2').find('li').each((idx, ele) => {
    const url = $(ele).find('a').attr('href').trim();
    const brand = $(ele).find('a').text().replace(/(\s\s)]*/g, '')
      .trim();

    listBrands.push({
      brand, url
    });
  });

  fs.writeFileSync('./database/brands.json', JSON.stringify(listBrands, null, 4));
};

getHTML('https://cellphones.com.vn/mobile.html');
