import '../scss/shop.scss';
import '../scss/responsive/shop.scss';

import products from '../database/shortProducts.json';
import brands from '../database/brands.json';
import models from '../database/models.json';

import { setHeader } from './utils';
import { initCustomDropdown } from './components/CustomDropdown';
import { initPageMenu } from './components/Menu';
import { initViewedSlider } from './components/RecentlyViewedSlider';
import { initBrandsSlider } from './components/BrandSlider';
import { initFavs } from './utils/favorites';
import { initIsotope, initPriceSlider, loadProducts, loadSidebarBrands, loadSidebarModels } from './components/ShopSidebar';


/** ****************************
1. Vars and Inits
2. Set Header
3. Init Custom Dropdown
4. Init Page Menu
5. Init Recently Viewed Slider
6. Init Brands Slider
7. Init Isotope
8. Init Price Slider
9. Init Favorites
******************************/

(() => {

  setHeader();


  initCustomDropdown();
  initPageMenu();


  initViewedSlider();
  initBrandsSlider();


  // Init Shop Sidebar
  loadSidebarBrands(brands);
  loadSidebarModels(models, 'Apple');

  loadProducts(products);

  initIsotope(brands);
  initPriceSlider(brands);


  initFavs();


  $(window).on('resize', () => {
    setHeader();
  });

})();
