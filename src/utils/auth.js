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
