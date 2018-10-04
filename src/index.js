import '../scss/index.scss';
import '../scss/responsive/index.scss';

import products from '../database/shortProducts.json';

import { setHeader } from './utils';

import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';

import { initTrendsSlider } from './components/TrendSlider';
import { initReviewsSlider } from './components/ReviewSlider';
import { initViewedSlider } from './components/RecentlyViewedSlider';
import { initBrandsSlider } from './components/BrandSlider';
import { initBanner2Slider } from './components/Banner2Slider';
import { initPopularSlider } from './components/PopularSlider';

import { initTabLines, initTabs } from './components/Tab';

import { initDealsSlider, loadDealProducts } from './components/DealProduct';
import { initArrivalsSlider, setArrivalsSliderZIndex, loadArrivalsProducts } from './components/ArrivalsSlider';
import { initFeaturedSlider, loadFeaturedProducts, setFeaturedSliderZIndex } from './components/FeaturedSlider';
import { initBestsellersSlider } from './components/BestSellersSlider';


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
17. Init Reviews Slider
18. Init Recently Viewed Slider
19. Init Brands Slider
20. Init Timer
******************************/

(() => {

  // var menuActive = false;

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


  initPopularSlider();
  initBanner2Slider();


  initFavs();


  // Hot New Arrivals Products
  loadArrivalsProducts(products);
  initArrivalsSlider();
  setArrivalsSliderZIndex();


  initBestsellersSlider();


  initTabs();


  initTrendsSlider();
  initReviewsSlider();
  initViewedSlider();
  initBrandsSlider();


  $(window).on('resize', () => {
    setHeader();
    setFeaturedSliderZIndex();
    initTabLines();
  });


  /* Favorites */

  function initFavs() {
  // Handle Favorites
    var items = document.getElementsByClassName('product_fav');
    for (var x = 0; x < items.length; x++) {
      var item = items[x];
      item.addEventListener('click', (fn) => {
        fn.target.classList.toggle('active');
      });
    }
  }

})();
