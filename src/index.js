import '../scss/index.scss';
import '../scss/responsive/index.scss';

// import products from '../database/shortProducts.json';
// import brands from '../database/brands.json';
import banner2Products from '../database/banner2Products.json';

import { setHeader } from './utils';

import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';

import { initTrendsSlider, loadTrendsSlider } from './components/TrendSlider';
import { initViewedSlider, loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';
import { initBanner2Slider, loadBanner2Products } from './components/Banner2Slider';
import { initPopularSlider, loadPopularSlider } from './components/PopularSlider';

import { initTabLines, initTabs } from './components/Tab';

import { initDealsSlider, loadDealProducts } from './components/DealProduct';
import { initArrivalsSlider, setArrivalsSliderZIndex, loadArrivalsProducts } from './components/ArrivalsSlider';
import { initFeaturedSlider, loadFeaturedProducts, setFeaturedSliderZIndex } from './components/FeaturedSlider';
import { initFavs } from './utils/favorites';
import { initCart, initWishlist } from './utils/shareData';


(() => {

  setHeader();

  initCustomDropdown();

  initPageMenu();
  initCart();
  initWishlist();

  // Deal Products
  loadDealProducts();
  // initDealsSlider();

  initTabLines();

  // Featured Products
  loadFeaturedProducts();
  // initFeaturedSlider();
  // setFeaturedSliderZIndex();

  // Popular Brands
  loadPopularSlider();
  // initPopularSlider();

  // Banner 2
  loadBanner2Products(banner2Products);
  initBanner2Slider();

  // Hot New Arrivals Products
  loadArrivalsProducts();
  // initArrivalsSlider();
  // setArrivalsSliderZIndex();

  initTabs();

  // Trend Slider Products
  loadTrendsSlider();
  // initTrendsSlider();

  // Recently Viewed Products
  loadRecentlyViewedSlider();
  // initViewedSlider();

  initFavs();

  $(window).on('resize', () => {
    setHeader();
    setFeaturedSliderZIndex();
    initTabLines();
  });

})();
