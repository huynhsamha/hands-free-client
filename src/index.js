import '../scss/index.scss';
import '../scss/responsive/index.scss';

import banner2Products from '../database/banner2Products.json';

import { loadTrendsSlider } from './components/TrendSlider';
import { loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';
import { initBanner2Slider, loadBanner2Products } from './components/Banner2Slider';
import { loadPopularSlider } from './components/PopularSlider';

import { initTabLines, initTabs } from './components/Tab';

import { loadDealProducts } from './components/DealProduct';
import { loadArrivalsProducts } from './components/ArrivalsSlider';
import { loadFeaturedProducts } from './components/FeaturedSlider';
import { initFavs } from './utils/favorites';

import './_common';

(() => {

  // Deal Products
  loadDealProducts();

  initTabLines();

  // Featured Products
  loadFeaturedProducts();

  // Popular Brands
  loadPopularSlider();

  // Banner 2
  loadBanner2Products(banner2Products);
  initBanner2Slider();

  // Hot New Arrivals Products
  loadArrivalsProducts();

  initTabs();

  // Trend Slider Products
  loadTrendsSlider();

  // Recently Viewed Products
  loadRecentlyViewedSlider();

  initFavs();

  $(window).on('resize', () => {
    initTabLines();
  });

})();
