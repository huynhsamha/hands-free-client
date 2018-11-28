// import products from '../../database/shortProducts.json';

import { convertPriceToText } from './price';


export const sumPrice = cart => cart.reduce((sum, ele) => sum + Number.parseInt(ele.price, 10) * ele.quantity, 0);

export const sumPriceText = cart => convertPriceToText(sumPrice(cart));

export const totalProductsInCart = cart => cart.reduce((sum, ele) => sum + ele.quantity, 0);

export const initCart = () => {
  const $cartCount = $('.cart_count span');
  const $cartPrice = $('.cart_price');

  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  $cartCount.text(totalProductsInCart(cart));
  $cartPrice.text(sumPriceText(cart));
  // console.log(cart);
  // console.log(sumPrice(cart));
  // console.log(sumPriceText(cart));
};


export const initWishlist = () => {
  const $wishlistCount = $('.wishlist_count');

  const wishlist = JSON.parse(sessionStorage.getItem('wishlist') || '[]');
  $wishlistCount.text(wishlist.length);
};

export const addCart = (product, quantity = 1) => {
  const $cartCount = $('.cart_count span');
  const $cartPrice = $('.cart_price');

  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

  console.log('Add cart:', product);
  const { id, brandName, modelId, modelName, name, price, thumbnail } = product;
  const idx = cart.findIndex(o => o.id == id);
  if (idx > -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({ quantity, id, brandName, modelId, modelName, name, price, thumbnail });
  }

  $cartCount.text(totalProductsInCart(cart));
  $cartPrice.text(sumPriceText(cart));

  sessionStorage.setItem('cart', JSON.stringify(cart));
};


export const removeCart = (product) => {
  const $cartCount = $('.cart_count span');
  const $cartPrice = $('.cart_price');

  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

  console.log('Remove cart:', product);
  const { id, brandName, modelId, modelName, name, price, thumbnail } = product;
  const idx = cart.findIndex(o => o.id == id);
  if (idx > -1) {
    cart[idx].quantity--;
    if (cart[idx].quantity == 0) {
      cart.splice(idx, 1);
    }
  } else {
    console.log('Item not found');
  }

  $cartCount.text(totalProductsInCart(cart));
  $cartPrice.text(sumPriceText(cart));

  sessionStorage.setItem('cart', JSON.stringify(cart));
};

export const addWishlist = (product) => {
  const $wishlistCount = $('.wishlist_count');

  const wishlist = JSON.parse(sessionStorage.getItem('wishlist') || '[]');

  const { brand, model, name, price } = product;
  wishlist.push({ brand, model, name, price });

  $wishlistCount.text(wishlist.length);

  sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const removeWishlist = (product) => {

};


export const retrieveCart = () => JSON.parse(sessionStorage.getItem('cart') || '[]');


export const clearCart = () => {
  sessionStorage.removeItem('cart');
};
