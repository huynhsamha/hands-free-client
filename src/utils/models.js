export const parseProduct = (product) => {
  product.galleryImages = JSON.parse(product.galleryImages);
  product.technicalInfo = JSON.parse(product.technicalInfo);
  return product;
};

export const parseProductsList = products => products.map(u => parseProduct(u));
