import '../scss/shop.scss';
import '../scss/responsive/shop.scss';

// import products from '../database/shortProducts.json';
// import brands from '../database/brands.json';
// import models from '../database/models.json';

import { setHeader } from './utils';
import { initCustomDropdown } from './components/CustomDropdown';
import { initPageMenu } from './components/Menu';
import { initViewedSlider, loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';
import { initFavs } from './utils/favorites';
import { initIsotope, initPriceSlider, loadProducts, loadSidebarBrands, loadSidebarModels, loadSortOptions, setEventBtnSearch, initPaginationNextPrev } from './components/ShopSidebar';
import { initCart, initWishlist } from './utils/shareData';


(() => {

  setHeader();

  initCustomDropdown();
  initPageMenu();

  initCart();
  initWishlist();

  // Recently Viewed Products
  loadRecentlyViewedSlider();
  // initViewedSlider();

  // Init Shop Sidebar
  loadSidebarBrands();
  loadSortOptions();
  // loadSidebarModels(models, 'Apple');
  initPriceSlider();

  initIsotope();
  loadProducts();
  // initIsotope(brands);

  setEventBtnSearch();

  initPaginationNextPrev();

  initFavs();

  $(window).on('resize', () => {
    setHeader();
  });

})();
