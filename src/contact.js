import '../scss/contact.scss';
import '../scss/responsive/contact.scss';

import { setHeader } from './utils';

import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';

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
