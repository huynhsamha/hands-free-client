import '../scss/product.scss';
import '../scss/responsive/product.scss';


import products from '../database/shortProducts.json';
import detailProducts from '../database/detailProducts.json';

import { setHeader } from './utils';

import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';

import { initViewedSlider, loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';

import { initFavs } from './utils/favorites';

/** ****************************
1. Vars and Inits
2. Set Header
3. Init Custom Dropdown
4. Init Page Menu
5. Init Recently Viewed Slider
6. Init Brands Slider
7. Init Quantity
8. Init Color
9. Init Favorites
10. Init Image
******************************/


(() => {

  setHeader();


  initCustomDropdown();
  initPageMenu();


  // Recently Viewed Products
  loadRecentlyViewedSlider(products);
  initViewedSlider();


  const product = detailProducts[3];

  initQuantity();
  initColor();
  initFavs();

  loadImage();
  initImage();

  loadDescription();

  loadTechicalInfo();

  $(window).on('resize', () => {
    setHeader();
  });


  /* Init Quantity*/

  function initQuantity() {
    // Handle product quantity input
    if ($('.product_quantity').length) {
      var input = $('#quantity_input');
      var incButton = $('#quantity_inc_button');
      var decButton = $('#quantity_dec_button');

      var originalVal;
      var endVal;

      incButton.on('click', () => {
        originalVal = input.val();
        endVal = parseFloat(originalVal) + 1;
        input.val(endVal);
      });

      decButton.on('click', () => {
        originalVal = input.val();
        if (originalVal > 0) {
          endVal = parseFloat(originalVal) - 1;
          input.val(endVal);
        }
      });
    }
  }

  /* Init Color*/

  function initColor() {
    if ($('.product_color').length) {
      var selectedCol = $('#selected_color');
      var colorItems = $('.color_list li .color_mark');
      colorItems.each(function () {
        var colorItem = $(this);
        colorItem.on('click', () => {
          var color = colorItem.css('backgroundColor');
          selectedCol.css('backgroundColor', color);
        });
      });
    }
  }

  /** Description */
  function loadDescription() {
    $('.product_category').text(product.brand);
    $('.product_name').text(product.name);
    $('.product_text.status p').text(product.status);
    $('.product_text.warranty p').text(product.warranty);
    $('.product_price').text(product.priceText);
  }

  /** Technical Info */
  function loadTechicalInfo() {
    const $tbInfo = $('#table-tech-info > tbody');
    product.technicalInfo.forEach(({ name, value }, idx) => {
      $tbInfo.append(`
        <tr class="${idx > 12 ? 'more' : ''}">
          <td width="30%">${name}</td>
          <td>${value}</td>
        </tr>
      `);
    });

    $tbInfo.find('tr.more').each((_, ele) => $(ele).hide());

    const $btnMore = $('.tech-info button');
    $btnMore.click(() => {
      const isAll = $btnMore.attr('data-all');
      if (isAll == '1') {
        $btnMore.text('Xem thêm');
        $btnMore.attr('data-all', '0');
        $tbInfo.find('tr.more').each((_, ele) => $(ele).hide());
      } else { // '0'
        $btnMore.text('Rút gọn');
        $btnMore.attr('data-all', '1');
        $tbInfo.find('tr.more').each((_, ele) => $(ele).show());
      }
    });
  }

  /* Init Image*/

  function loadImage() {
    product.galleryImages.forEach((src) => {
      $('.slider_image_selected').append(`
        <div class="item">
          <img src="${src}" alt="${product.name}">
        </div>
      `);

      $('.slider_image_list').append(`
      <div class="item">
        <img src="${src}" alt="${product.name}">
      </div>
    `);
    });
  }

  function initImage() {

    $('.slider_image_selected').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider_image_list'
    });

    $('.slider_image_list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider_image_selected',
      dots: false,
      centerMode: true,
      focusOnSelect: true
    });

  }

})();
