import { retrieveCart } from '../utils/shareData';
import { convertPriceToText, convertTextToPrice } from '../utils/price';

export const CartItem = (item, quantity) => `
<li class="cart_item clearfix">
  <div class="cart_item_image"><img src="${item.thumbnail}" alt="${item.name}"></div>
  <div class="cart_item_info row">
    <div class="cart_item_name col-12 col-md-5">
      <div class="cart_item_text">${item.name}</div>
    </div>
    <div class="cart_item_color col-12 col-md-2 col-sm-3">
      <div class="cart_item_text">
        <span style="background-color:${item.color.hex}; ${item.color.hexBorder ? `border: solid 1px ${item.color.hexBorder};` : ''}"></span>
        ${item.color.text}
      </div>
    </div>
    <div class="cart_item_price col-5 col-md-2 col-sm-4">
      <div class="cart_item_text">${item.priceText}</div>
    </div>
    <div class="cart_item_quantity col-1 col-md-1 col-sm-1">
      <div class="cart_item_text">${quantity}</div>
    </div>
    <div class="cart_item_total col-6 col-md-2 col-sm-4">
      <div class="cart_item_text">${convertPriceToText(item.price * quantity)}</div>
    </div>
  </div>
</li>
`;

/* <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
<div class="cart_item_title">Name</div>
<div class="cart_item_title">Color</div>
<div class="cart_item_title">Price</div>
<div class="cart_item_title">Total</div>
<div class="cart_item_title">Quantity</div> */


export const loadCartItem = () => {
  const $cartList = $('.cart_list');
  let products = retrieveCart();
  if (products.length == 0) {
    $cartList.find('p').show();
    return;
  }
  const colors = [
    { text: 'Gold', hex: '#b19c83' },
    { text: 'Đen', hex: '#000000' },
    { text: 'Silver', hex: '#999999' },
    { text: 'Xanh', hex: '#0e8ce4' },
    { text: 'Đỏ', hex: '#df3b3b' },
    { text: 'Trắng', hex: '#ffffff', hexBorder: '#e1e1e1' }
  ];
  products = products.map((item, idx) => ({ ...item, color: colors[idx % 6] }));

  $cartList.find('p').hide();

  let sumPrice = 0;
  products.forEach((item, idx) => {
    const quantity = idx % 2 + 1;
    $cartList.append(CartItem(item, quantity));
    sumPrice += item.price * quantity;
  });

  $('.order_total_amount').text(convertPriceToText(sumPrice));

  $('.cart_button_checkout').click(() => {
    $.confirm({
      title: 'Thông báo',
      icon: 'fa fa-bell',
      type: 'green',
      content: 'Đơn hàng đang được xét duyệt. Chúng tôi sẽ liên lạc bạn để hoàn tất quá trình mua hàng.',
      // content() {
      //   var self = this;
      //   return setTimeout(() => {
      //     self.setContent('<div>Đơn hàng đang được xét duyệt. Chúng tôi sẽ liên lạc bạn để hoàn tất quá trình mua hàng.</div>');
      //   }, 2000);
      // },
      buttons: {
        ok: {
          text: 'OK',
          btnClass: 'btn-green',
          action() {
            window.location.pathname = '';
          }
        }
      }
    });
  });
};
