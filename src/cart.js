import '../scss/cart.scss';
import '../scss/responsive/cart.scss';
import { setHeader } from './utils';
import { initCustomDropdown } from './components/CustomDropdown';
import { initPageMenu } from './components/Menu';
import { initCart, initWishlist } from './utils/shareData';
import { loadCartItem } from './components/Cart';

(() => {

  setHeader();

  initCustomDropdown();
  initPageMenu();

  initCart();
  initWishlist();

  loadCartItem();

  $(window).on('resize', () => {
    setHeader();
  });

})();
