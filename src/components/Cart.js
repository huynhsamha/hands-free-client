import qs from 'qs';

import { retrieveCart, sumPriceText, sumPrice, addCart, removeCart, clearCart } from '../utils/shareData';
import { convertPriceToText, convertTextToPrice } from '../utils/price';
import { dangerConfirm, successConfirm, success, warningConfirm, error } from '../utils/confirm';
import { showLoading, hideLoading, handleErrorJQuery } from '../utils/loading';
import { isLogined, getToken } from '../utils/auth';
import { config } from '../config';

let totalPrice = 0;

export const CartItem = item => `
<li class="cart_item clearfix">
  <div class="cart_item_image"><img src="${item.thumbnail}" alt="${item.name}"></div>
  <div class="cart_item_info row">
    <div class="cart_item_name col-12 col-md-5">
      <div class="cart_item_text">${item.name}</div>
    </div>

    <div class="cart_item_price col-5 col-md-2 col-sm-4">
      <div class="cart_item_text">${convertPriceToText(item.price)}</div>
    </div>
    <div class="cart_item_quantity col-1 col-md-2 col-sm-1">
      <div class="product_quantity clearfix">
        <span>x</span>
        <input type="text" pattern="[0-9]*" value="${item.quantity}">
        <div class="quantity_buttons">
          <div class="quantity_inc quantity_control"><i class="fas fa-chevron-up"></i></div>
          <div class="quantity_dec quantity_control"><i class="fas fa-chevron-down"></i></div>
        </div>
      </div>
    </div>
    <div class="cart_item_total col-6 col-md-3 col-sm-4">
      <div class="cart_item_text">${convertPriceToText(item.price * item.quantity)}</div>
    </div>
  </div>
</li>
`;

/**
 * Color HTML
<div class="cart_item_color col-12 col-md-2 col-sm-3">
      <div class="cart_item_text">
        <span style="background-color:${item.color.hex}; ${item.color.hexBorder ? `border: solid 1px ${item.color.hexBorder};` : ''}"></span>
        ${item.color.text}
      </div>
    </div>
 */

/* <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
<div class="cart_item_title">Name</div>
<div class="cart_item_title">Color</div>
<div class="cart_item_title">Price</div>
<div class="cart_item_title">Total</div>
<div class="cart_item_title">Quantity</div> */


export const loadCartItem = () => {
  initPayment();

  const $cartList = $('.cart_list');
  const products = retrieveCart();
  if (products.length == 0) {
    $cartList.find('p').show();
    return;
  }
  // const colors = [
  //   { text: 'Gold', hex: '#b19c83' },
  //   { text: 'Đen', hex: '#000000' },
  //   { text: 'Silver', hex: '#999999' },
  //   { text: 'Xanh', hex: '#0e8ce4' },
  //   { text: 'Đỏ', hex: '#df3b3b' },
  //   { text: 'Trắng', hex: '#ffffff', hexBorder: '#e1e1e1' }
  // ];
  // products = products.map((item, idx) => ({ ...item, color: colors[idx % 6] }));

  $cartList.find('p').hide();

  console.log(products);

  totalPrice = sumPrice(products);
  products.forEach((item) => {
    const $ele = $(CartItem(item));
    $cartList.append($ele);
    initQuantity($ele, item);
  });

  $('.order_total_amount').text(convertPriceToText(totalPrice));
};

function postOrder(cart) {
  const api = '/api/order/create.php';
  const url = `${config.baseUrl}${api}`;
  const data = {
    paymentAddress: $('input[name=payment_address]:checked').val(),
    paymentMethod: $('input[name=payment_method]:checked').val(),
    products: cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price
    }))
  };
  console.log(data);
  $.ajax({
    url,
    type: 'POST',
    data: qs.stringify(data),
    headers: {
      'Authorization': getToken()
    },
    success: (data) => {
      hideLoading();
      console.log(data);
      success(`Đơn hàng đã được chấp nhận và đang chờ xét duyệt. Chúng tôi sẽ liên lạc bạn để hoàn tất đơn hàng này. \n Mã đơn hàng: ${data.order.id}`,
        () => {
          clearCart();
          window.location.pathname = 'profile.html';
        });
    }
  })
    .fail(err => handleErrorJQuery(err));
}

export function initPayment() {
  let logined = false;
  isLogined((data) => {
    if (data) {
      logined = true;
      $('#payment-no-login').css('display', 'none');
    } else {
      logined = false;
    }
  });

  $('.cart_button_checkout').click(() => {
    if (logined) {
      const cart = retrieveCart();
      if (cart.length == 0) {
        error('Giỏ hàng của bạn hiện chưa có sản phẩm nào. Hãy tiếp tục mua sắm trước khi tiến hành thanh toán.');
        return;
      }
      warningConfirm('Đơn hàng của bạn sẽ được thiết lập. Bạn thật sự muốn gửi yêu cầu đơn hàng này?', 'Gửi yêu cầu', 'Hủy',
        () => {
          showLoading(() => postOrder(cart));
        });
    } else {
      error('Vui lòng đăng nhập để tiếp tục.', () => {
        $('#js-modal-login').modal('show');
      });
    }
  });
}

/* Init Quantity*/

function initQuantity($ele, item) {
  // Handle product quantity input
  if ($ele.find('.product_quantity').length) {
    var input = $ele.find('input');
    var incButton = $ele.find('.quantity_inc');
    var decButton = $ele.find('.quantity_dec');

    var originalVal;
    var endVal;

    incButton.on('click', () => {
      originalVal = input.val();
      endVal = parseFloat(originalVal) + 1;
      input.val(endVal);
      addCart(item);
      item.quantity++;
      totalPrice += item.price;
      $ele.find('.cart_item_total > .cart_item_text').text(convertPriceToText(item.price * item.quantity));
      $('.order_total_amount').text(convertPriceToText(totalPrice));
    });

    decButton.on('click', () => {
      originalVal = input.val();
      if (originalVal > 1) {
        endVal = parseFloat(originalVal) - 1;
        input.val(endVal);
        removeCart(item);
        item.quantity--;
        totalPrice -= item.price;
        $ele.find('.cart_item_total > .cart_item_text').text(convertPriceToText(item.price * item.quantity));
        $('.order_total_amount').text(convertPriceToText(totalPrice));
      } else {
        dangerConfirm(`Sản phẩm <i>${item.name}</i> sẽ bị xóa khỏi giỏ hàng. Bạn thật sự muốn xóa sản phẩm này khỏi giỏ hàng?`, 'Xóa khỏi giỏ', 'Bỏ qua', () => {
          removeCart(item);
          totalPrice -= item.price;
          $('.order_total_amount').text(convertPriceToText(totalPrice));
          $ele.remove();
        });
      }
    });
  }
}
