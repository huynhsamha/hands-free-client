import '../scss/cart.scss';
import '../scss/responsive/cart.scss';
import { setHeader } from './utils';
import { initCustomDropdown } from './components/CustomDropdown';
import { initPageMenu } from './components/Menu';
import { initCart, initWishlist } from './utils/shareData';

(() => {

  setHeader();

  initCustomDropdown();
  initPageMenu();

  initCart();
  initWishlist();

  $(window).on('resize', () => {
    setHeader();
  });

})();
