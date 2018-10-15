import { convertPriceToText } from './price';


const sumPrice = (cart) => {
  let sumPrice = 0;
  cart.forEach((i) => {
    sumPrice += i.price;
  });
  return sumPrice;
};

const sumPriceText = cart => convertPriceToText(sumPrice(cart));

export const initCart = () => {
  const $cartCount = $('.cart_count span');
  const $cartPrice = $('.cart_price');

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  $cartCount.text(cart.length);
  $cartPrice.text(sumPriceText(cart));
};


export const initWishlist = () => {
  const $wishlistCount = $('.wishlist_count');

  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  $wishlistCount.text(wishlist.length);
};

export const addCart = (product) => {
  const $cartCount = $('.cart_count span');
  const $cartPrice = $('.cart_price');

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const { brand, model, name, price } = product;
  cart.push({ brand, model, name, price });

  $cartCount.text(cart.length);
  $cartPrice.text(sumPriceText(cart));

  localStorage.setItem('cart', JSON.stringify(cart));
};


export const removeCart = (product) => {
  // TODO
};

export const addWishlist = (product) => {
  const $wishlistCount = $('.wishlist_count');

  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

  const { brand, model, name, price } = product;
  wishlist.push({ brand, model, name, price });

  $wishlistCount.text(wishlist.length);

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const removeWishlist = (product) => {

};
