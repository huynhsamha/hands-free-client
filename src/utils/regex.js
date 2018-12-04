export function checkPassword(password) {
  /**
   * Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
   */
  return password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
