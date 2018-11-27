import { parseProductsList } from '../utils/models';

/* Deals Slider */

export const DealProduct = item => `
  <div class="owl-item deals_item">
    <div class="deals_image">
      <img src="${item.thumbnail}" alt="${item.name}" />
    </div>
    <div class="deals_content">
      <div class="deals_info_line d-flex flex-row justify-content-start">
        <div class="deals_item_category"><a href="#">${item.brandName}</a></div>
        <div class="deals_item_price_a ml-auto">${item.ceilPriceText}</div>
      </div>
      <div class="deals_info_line d-flex flex-row justify-content-start">
        <div class="deals_item_name">${item.name}</div>
        <div class="deals_item_price ml-auto">${item.priceText} đ</div>
      </div>
    </div>
  </div>
`;

let products = [];

export function loadDealProducts() {
  const $dealsSlider = $('.deals_slider');

  const api = '/api/product/getHotDeal.php';
  $.get(`http://localhost/hands-free${api}`, (data) => {
    // console.log(data);

    products = parseProductsList(data);
    products.forEach((item) => {
      $dealsSlider.append(DealProduct(item));
    });

    initDealsSlider();
  })
    .fail(err => console.log(err));
}


export function initDealsSlider() {
  if ($('.deals_slider').length) {
    var dealsSlider = $('.deals_slider');
    dealsSlider.owlCarousel({
      items: 1,
      loop: true,
      navClass: ['deals_slider_prev', 'deals_slider_next'],
      nav: false,
      dots: false,
      smartSpeed: 1200,
      margin: 30,
      autoplay: true,
      autoplaySpeed: 400,
      autoplayTimeout: 2500
    });

    if ($('.deals_slider_prev').length) {
      var prev = $('.deals_slider_prev');
      prev.on('click', () => {
        dealsSlider.trigger('prev.owl.carousel');
      });
    }

    if ($('.deals_slider_next').length) {
      var next = $('.deals_slider_next');
      next.on('click', () => {
        dealsSlider.trigger('next.owl.carousel');
      });
    }
  }
}
