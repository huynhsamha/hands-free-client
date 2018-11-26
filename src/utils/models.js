export const parseProductsList = (products) => {
  products.forEach((u) => {
    u.galleryImages = JSON.parse(u.galleryImages);
    u.technicalInfo = JSON.parse(u.technicalInfo);
  });
  return products;
};
