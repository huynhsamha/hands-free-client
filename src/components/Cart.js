import { retrieveCart } from '../utils/shareData';
import { convertPriceToText, convertTextToPrice } from '../utils/price';

export const CartItem = (item, quantity) => `
<li class="cart_item clearfix">
  <div class="cart_item_image"><img src="${item.thumbnail}" alt="${item.name}"></div>
  <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
    <div class="cart_item_name cart_info_col">
      <div class="cart_item_title">Name</div>
      <div class="cart_item_text">${item.name}</div>
    </div>
    <div class="cart_item_color cart_info_col">
      <div class="cart_item_title">Color</div>
      <div class="cart_item_text"><span style="background-color:#999999;"></span>Silver</div>
    </div>
    <div class="cart_item_quantity cart_info_col">
      <div class="cart_item_title">Quantity</div>
      <div class="cart_item_text">${quantity}</div>
    </div>
    <div class="cart_item_price cart_info_col">
      <div class="cart_item_title">Price</div>
      <div class="cart_item_text">${item.priceText}</div>
    </div>
    <div class="cart_item_total cart_info_col">
      <div class="cart_item_title">Total</div>
      <div class="cart_item_text">${item.priceText}</div>
    </div>
  </div>
</li>
`;


export const loadCartItem = () => {
  const $cartList = $('.cart_list');
  const products = retrieveCart();
  if (products.length == 0) {
    $cartList.find('p').show();
    return;
  }
  $cartList.find('p').hide();
  let sumPrice = 0;
  products.forEach((item) => {
    $cartList.append(CartItem(item, 1));
    sumPrice += item.price;
  });

  $('.order_total_amount').text(convertPriceToText(sumPrice));
};
