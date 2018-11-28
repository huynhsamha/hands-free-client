import qs from 'qs';

import '../scss/product.scss';
import '../scss/responsive/product.scss';


// import products from '../database/shortProducts.json';
// import detailProducts from '../database/detailProducts.json';

import { setHeader } from './utils';

import { initPageMenu } from './components/Menu';
import { initCustomDropdown } from './components/CustomDropdown';

import { initViewedSlider, loadRecentlyViewedSlider } from './components/RecentlyViewedSlider';

import { initFavs } from './utils/favorites';
import { initCart, initWishlist, addCart } from './utils/shareData';
import { getUrlVars } from './utils/url';
import { parseProduct } from './utils/models';

let product = {};

(() => {

  setHeader();

  initCustomDropdown();
  initPageMenu();

  initCart();
  initWishlist();

  // Recently Viewed Products
  loadRecentlyViewedSlider();
  // initViewedSlider();

  const query = getUrlVars();
  console.log(query);
  const id = query.id;
  if (!id) {
    window.location.href = 'index.html';
  }
  const api = `/api/product/getOne.php?${qs.stringify({ id })}`;
  console.log(api);
  $.get(`http://localhost/hands-free${api}`, (data) => {
    // console.log(data);
    product = parseProduct(data);
    console.log(product);

    product.quantity = 1;

    initQuantity();
    // initColor();

    loadImage();
    initImage();

    loadDescription();

    loadTechicalInfo();

    setEventAddCart();

    initFavs();

  }).fail(err => console.log(err));

  $(window).on('resize', () => {
    setHeader();
  });

  function setEventAddCart() {
    $('#btn-add-cart').click(() => {
      addCart(product, product.quantity);
    });
  }

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
        product.quantity++;
      });

      decButton.on('click', () => {
        originalVal = input.val();
        if (originalVal > 0) {
          endVal = parseFloat(originalVal) - 1;
          input.val(endVal);
          product.quantity--;
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
    $('.product_category').text(`${product.brandName} - ${product.modelName}`);
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
    product.galleryImages = [product.thumbnail, ...product.galleryImages];
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
