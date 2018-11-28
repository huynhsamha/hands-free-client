import validator from 'validator';
import qs from 'qs';

import { showLoading, hideLoading, handleError } from './utils/loading';
import { success } from './utils/confirm';

import { setHeader } from './utils';
import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';
import { initCart, initWishlist } from './utils/shareData';
import { storeAuthentication } from './utils/auth';


/** Forgot password */
$('#btn-modal-forgot').click(() => {
  showLoading();
  setTimeout(() => {
    hideLoading();
    success('Đã gửi đường dẫn thay đổi mật khẩu tới địa chỉ email của bạn. Vui lòng kiểm tra email.', () => {
      $('#js-modal-forgot').modal('hide');
    });
  }, 500);
});


/** Login */
$('#btn-modal-login').click(() => {
  const email = $('#loginEmail').val();
  const password = $('#loginPassword').val();

  if (!validator.isEmail(email)) {
    return alert('Địa chỉ email không hợp lệ');
  }

  const api = '/api/auth/login.php';
  const url = `http://localhost/hands-free${api}`;

  showLoading(() => {
    $.post(url, qs.stringify({ email, password }), (data) => {
      hideLoading();
      console.log(data);
      const { issuedAt, token, tokenExpire, user } = data;
      storeAuthentication(user, token, tokenExpire, issuedAt);
      window.location.reload();
    }).fail(err => handleError(err.responseText));
  });
});


/** Sign Up */
$('#btn-modal-signup').click(() => {
  const email = $('#signUpEmail').val();
  const firstName = $('#signUpFirstName').val();
  const lastName = $('#signUpLastName').val();
  const tel = $('#signUpTel').val();
  const address = $('#signUpAddress').val();
  const password = $('#signUpPassword').val();
  const confirmPassword = $('#signUpConfirm').val();

  if (!validator.isEmail(email)) {
    return alert('Địa chỉ email không hợp lệ.');
  }

  if (password !== confirmPassword) {
    return alert('Mật khẩu không khớp.');
  }

  const api = '/api/auth/signup.php';
  const url = `http://localhost/hands-free${api}`;

  const data = { email, firstName, lastName, tel, address, password };

  showLoading(() => {
    $.post(url, qs.stringify(data), (data) => {
      hideLoading();
      console.log(data);
      success('Đăng kí tài khoản thành công.', () => {
        $('#js-modal-signup').modal('hide');
      });
    }).fail(err => handleError(err.responseText));
  });
});


setHeader();

initCustomDropdown();

initPageMenu();

initCart();

initWishlist();


$(window).on('resize', () => {
  setHeader();
});
