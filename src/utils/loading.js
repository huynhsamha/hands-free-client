import { error } from './confirm';

export function showLoading(exc = () => {}) {
  $('#loading').css('display', 'block');
  setTimeout(() => exc(), 400);
}

export function hideLoading() {
  $('#loading').css('display', 'none');
}

export function handleError(message) {
  hideLoading();
  setTimeout(() => error(message), 100);
}
