import '../scss/shop.scss';
import '../scss/responsive/shop.scss';

import { loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';
import { initFavs } from './utils/favorites';
import { initIsotope, initPriceSlider, loadProducts, loadSidebarBrands, loadSortOptions, setEventBtnSearch, initPaginationNextPrev } from './components/ShopSidebar';

import './_common';

(() => {

  // Recently Viewed Products
  loadRecentlyViewedSlider();
  // initViewedSlider();

  // Init Shop Sidebar
  loadSidebarBrands();
  loadSortOptions();
  initPriceSlider();

  initIsotope();
  loadProducts();

  setEventBtnSearch();

  initPaginationNextPrev();

  initFavs();

})();
