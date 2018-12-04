import '../scss/cart.scss';
import '../scss/responsive/cart.scss';
import qs from 'qs';
import { getUser, getToken, updateUser } from './utils/auth';

import './_common';
import { handleError, showLoading, hideLoading } from './utils/loading';
import { success } from './utils/confirm';

(() => {

  let user = {};

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
  const url = `http://localhost/hands-free${api}`;

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
    const url = `http://localhost/hands-free${api}`;

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
      }).fail(err => handleError(err));
    });
  });

})();
