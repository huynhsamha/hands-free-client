import '../scss/cart.scss';
import '../scss/responsive/cart.scss';
import qs from 'qs';
import { getUser, getToken, updateUser, isLogined, isLoginedSync } from './utils/auth';

import './_common';
import { handleError, showLoading, hideLoading, handleErrorJQuery } from './utils/loading';
import { success } from './utils/confirm';
import { config } from './config';
import { checkPassword } from './utils/regex';

(() => {

  let user = {};

  if (isLoginedSync() == false) {
    window.location.pathname = '';
  }

  const renderProfile = () => {
    user = getUser();
    $('#email').val(user.email);
    $('#firstName').val(user.firstName);
    $('#lastName').val(user.lastName);
    $('#tel').val(user.tel);
    $('#address').val(user.address);
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
  }).fail(err => handleError(err));

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

})();
