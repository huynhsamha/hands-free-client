import '../scss/blog.scss';
import '../scss/responsive/blog.scss';

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
