import '../scss/profile.scss';
import '../scss/responsive/profile.scss';
import qs from 'qs';
import moment from 'moment';
import { getUser, getToken, updateUser, isLogined, isLoginedSync } from './utils/auth';

import './_common';
import { handleError, showLoading, hideLoading, handleErrorJQuery } from './utils/loading';
import { success } from './utils/confirm';
import { config } from './config';
import { checkPassword } from './utils/regex';
import { convertPriceToText } from './utils/price';

(() => {

  let user = {};

  if (isLoginedSync() == false) {
    window.location.pathname = '';
  }

  // Avatar
  const $avatar = $('#user-avatar');
  const $inputAvatar = $('#input-user-avatar');

  $('.form-avatar').attr('action', `${config.baseUrl}/api/upload/avatar.php`);

  const readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $avatar.attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $avatar.click(() => {
    $('#input-user-avatar').click();
  });

  $inputAvatar.on('change', function () {
    readURL(this);
  });


  const renderProfile = () => {
    user = getUser();
    $('#email').val(user.email);
    $('#firstName').val(user.firstName);
    $('#lastName').val(user.lastName);
    $('#tel').val(user.tel);
    $('#address').val(user.address);
    $avatar.attr('src', user.photoUrl);
  };

  renderProfile();

  const api = '/api/user/getProfile.php';
  const url = `${config.baseUrl}${api}`;

  $.ajax({
    url,
    type: 'GET',
    headers: {
      Authorization: getToken()
    },
    success: (user) => {
      console.log(user);
      updateUser(user);
      renderProfile();
    }
  }).fail(err => handleErrorJQuery(err));

  $('#btnUpdateInfo').click(() => {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const tel = $('#tel').val();
    const address = $('#address').val();

    const data = { firstName, lastName, tel, address };

    if (firstName.length == 0 || lastName.length == 0) return alert('Vui lòng điền đầy đủ thông tin họ tên.');
    if (tel.length == 0) return alert('Vui lòng điền thông tin số điện thoại');
    if (address.length == 0) return alert('Vui lòng điền thông tin địa chỉ liên lạc');

    console.log(data);

    const api = '/api/user/updateInfo.php';
    const url = `${config.baseUrl}${api}`;

    showLoading(() => {
      $.ajax({
        url,
        type: 'POST',
        headers: {
          Authorization: getToken()
        },
        data: qs.stringify(data),
        success: (res) => {
          hideLoading();
          console.log(res);
          user.firstName = firstName;
          user.lastName = lastName;
          user.tel = tel;
          user.address = address;
          updateUser(user);
          success('Thông tin của bạn đã được cập nhật');
        }
      }).fail(err => handleErrorJQuery(err));
    });
  });


  $('#btnChangePassword').click(() => {
    const oldPassword = $('#oldPassword').val();
    const newPassword = $('#newPassword').val();
    const confirmNewPassword = $('#confirmNewPassword').val();

    const data = { oldPassword, newPassword };

    if (!checkPassword(newPassword)) return alert('Mật khẩu yêu cầu tối thiểu 8 ki tự, trong đó ít nhất 1 kí tự hoa, 1 kí tự thường, 1 số và 1 kí tự đặc biệt.');
    if (newPassword != confirmNewPassword) return alert('Mật khẩu xác nhận không khớp');

    console.log(data);

    const api = '/api/user/changePassword.php';
    const url = `${config.baseUrl}${api}`;

    showLoading(() => {
      $.ajax({
        url,
        type: 'POST',
        headers: {
          Authorization: getToken()
        },
        data: qs.stringify(data),
        success: (res) => {
          hideLoading();
          console.log(res);
          success('Mật khẩu đã được cập nhật');
        }
      }).fail(err => handleErrorJQuery(err));
    });
  });

  let orders = [];

  function getPaymentAddress(t) {
    if (t == 'shop_hn') return 'Chi nhánh Quận Cầu Giấy, Hà Nội';
    if (t == 'shop_hcm') return 'Trụ sở Quận Tân Bình, TP.HCM';
    return 'Thanh toán tại nhà'; // home
  }

  function getPaymentMethod(t) {
    if (t == 'cash') return 'Dùng tiền mặt';
    if (t == 'bank') return 'Chuyển khoản ngân hàng';
    return 'Sử dụng Master Card'; // mastercard
  }

  function getOrderStatus(t) {
    if (t == 'Order') return 'Đang xử lý';
    if (t == 'Approved') return 'Đã bắt đầu';
    return 'Đã hoàn tất'; // Completed
  }

  function getBadgeOrderStatus(t) {
    let color = 'success';
    if (t == 'Order') color = 'danger';
    if (t == 'Approved') color = 'info';
    return `<span class="badge badge-pill badge-${color}">${getOrderStatus(t)}</span>`;
  }

  const renderOrderList = () => {
    if (orders.length == 0) {
      return $('#emptyOrders').show();
    }
    $('#emptyOrders').hide();
    const $tb = $('#tbOrders tbody');
    orders.forEach((order) => {
      const $ele = $(`
          <tr>
            <td class="text-center text-danger toggle-modal-order" style="cursor: pointer">
              <i class="mr-0 fa fa-link"></i> ${order.id}
            </td>
            <td>${moment(order.orderTime).format('LLL')}</td>
            <td>${getPaymentAddress(order.paymentAddress)}</td>
            <td>${getPaymentMethod(order.paymentMethod)}</td>
            <td class="text-right">${convertPriceToText(order.totalPrice)}</td>
            <td class="text-center">${getBadgeOrderStatus(order.status)}</td>
          </tr>
      `);
      $tb.append($ele);

      $ele.find('.toggle-modal-order').click(() => {
        const data = {
          orderId: order.id
        };
        showLoading(() => {
          $.ajax({
            url: `${config.baseUrl}/api/order/getDetail.php?${qs.stringify(data)}`,
            type: 'GET',
            headers: {
              Authorization: getToken()
            },
            success: (data) => {
              hideLoading();
              console.log(data);
              const products = data;
              const $tb = $('#modalOrderTable > tbody');
              $tb.html('');
              products.forEach(o => $tb.append($(`
              <tr>
                <td class="text-center">
                  <a href="product.html?id=${o.id}" target="_blank">
                    <img src="${o.thumbnail}" alt="Thumbnail" width="100">
                  </a>
                </td>
                <td>
                  <a href="product.html?id=${o.id}" target="_blank">
                    ${o.name}
                  </a>
                </td>
                <td class="text-right">${convertPriceToText(o.price)}</td>
                <td> x ${o.quantity}</td>
                <td class="text-right">${convertPriceToText(o.totalPrice)}</td>
              </tr>`)));
              $tb.append(`
                <tr>
                  <td></td>
                  <th colspan="3">Tổng tiền đơn hàng</th>
                  <th class="text-right">${convertPriceToText(order.totalPrice)}</th>
                </tr>
              `);

              $('#modalOrderID').text(order.id);

              $('#js-modal-order').modal('show');
            }
          }).fail(err => handleErrorJQuery(err));
        });
      });
    });
  };

  $.ajax({
    url: `${config.baseUrl}/api/order/get.php`,
    type: 'GET',
    headers: {
      Authorization: getToken()
    },
    success: (data) => {
      orders = data;
      renderOrderList();
    }
  }).fail(err => handleErrorJQuery(err));


})();
