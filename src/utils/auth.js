export function storeAuthentication(user, token, tokenExpire, issuedAt) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpire', tokenExpire);
  localStorage.setItem('issuedAt', issuedAt);
}

export function clearAuthentication() {
  ['user', 'token', 'tokenExpire', 'issuedAt'].forEach((i) => {
    localStorage.removeItem(i);
  });
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function isLogined(cb) {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const tokenExpire = localStorage.getItem('tokenExpire');
  if (!user || !user.email || !token || !tokenExpire || tokenExpire * 1000 < Date.now()) {
    clearAuthentication();
    return cb();
  }
  cb({ user, token });
}
