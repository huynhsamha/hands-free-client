import '../scss/index.scss';
import '../scss/responsive/index.scss';

import products from '../database/shortProducts.json';
import brands from '../database/brands.json';
import banner2Products from '../database/banner2Products.json';

import { setHeader } from './utils';

import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';

import { initTrendsSlider, laodTrendsSlider } from './components/TrendSlider';
import { initViewedSlider, loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';
import { initBrandsSlider } from './components/BrandSlider';
import { initBanner2Slider, loadBanner2Products } from './components/Banner2Slider';
import { initPopularSlider, loadPopularSlider } from './components/PopularSlider';

import { initTabLines, initTabs } from './components/Tab';

import { initDealsSlider, loadDealProducts } from './components/DealProduct';
import { initArrivalsSlider, setArrivalsSliderZIndex, loadArrivalsProducts } from './components/ArrivalsSlider';
import { initFeaturedSlider, loadFeaturedProducts, setFeaturedSliderZIndex } from './components/FeaturedSlider';
import { initFavs } from './utils/favorites';


/** ****************************
1. Vars and Inits
2. Set Header
3. Init Custom Dropdown
4. Init Page Menu
5. Init Deals Slider
6. Init Tab Lines
7. Init Tabs
8. Init Featured Slider
9. Init Favorites
10. Init ZIndex
11. Init Popular Categories Slider
12. Init Banner 2 Slider
13. Init Arrivals Slider
14. Init Arrivals Slider ZIndex
15. Init Best Sellers Slider
16. Init Trends Slider
18. Init Recently Viewed Slider
19. Init Brands Slider
******************************/

(() => {

  setHeader();


  initCustomDropdown();
  initPageMenu();


  // Deal Products
  loadDealProducts(products);
  initDealsSlider();


  initTabLines();


  // Featured Products
  loadFeaturedProducts(products);
  initFeaturedSlider();
  setFeaturedSliderZIndex();


  // Popular Brands
  loadPopularSlider(brands);
  initPopularSlider();


  // Banner 2
  loadBanner2Products(banner2Products);
  initBanner2Slider();


  initFavs();

  // Hot New Arrivals Products
  loadArrivalsProducts(products);
  initArrivalsSlider();
  setArrivalsSliderZIndex();

  initTabs();


  // Trend Slider Products
  laodTrendsSlider(products);
  initTrendsSlider();


  // Recently Viewed Products
  loadRecentlyViewedSlider(products);
  initViewedSlider();

  initBrandsSlider();


  $(window).on('resize', () => {
    setHeader();
    setFeaturedSliderZIndex();
    initTabLines();
  });

})();
