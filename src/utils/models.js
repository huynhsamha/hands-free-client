import { convertPriceToText } from './price';

export const parseProduct = (product) => {
  product.price = Number.parseInt(product.price, 10);
  product.priceText = convertPriceToText(product.price);
  if (product.ceilPrice) {
    product.ceilPrice = Number.parseInt(product.ceilPrice, 10);
    product.ceilPriceText = convertPriceToText(product.ceilPrice);
  }
  product.galleryImages = JSON.parse(product.galleryImages);
  product.technicalInfo = JSON.parse(product.technicalInfo);
  return product;
};

export const parseProductsList = products => products.map(u => parseProduct(u));
