import { parseProductsList } from '../utils/models';

/** Recently Viewed Slider */

export const RecentlyViewedProduct = item => `
<div class="owl-item">
<div class="viewed_item d-flex flex-column align-items-center justify-content-center text-center
  ${item.ceilPriceText ? 'discount' : `${item.hotNew ? 'is_new' : ''}`}">

  <div class="viewed_image">
    <img src="${item.thumbnail}" alt="${item.name}">
  </div>

  <div class="viewed_content text-center">
    <div class="viewed_price">${item.priceText}
    ${item.ceilPriceText
    ? `<span>${item.ceilPriceText}</span>` : ''}
    </div>
    <div class="viewed_name"><a href="#">${item.name}</a></div>
  </div>
  <ul class="item_marks">

  ${item.ceilPriceText
    ? `<li class="item_mark item_discount">
          -${Math.ceil((item.ceilPrice - item.price) / item.ceilPrice * 100)}%
        </li>`
    : ''}

    ${item.hotNew
    ? '<li class="item_mark item_new">new</li>'
    : ''}

  </ul>
</div>
</div>
`;

let products = [];

export function loadRecentlyViewedSlider() {
  const $viewedSlider = $('.viewed_slider');

  const api = '/api/product/getHotDeal.php';
  $.get(`http://localhost/hands-free${api}`, (data) => {
    // console.log(data);

    products = parseProductsList(data);
    products.forEach((item) => {
      $viewedSlider.append(RecentlyViewedProduct(item));
    });

    initViewedSlider();
  })
    .fail(err => console.log(err));
}

export function initViewedSlider() {
  if ($('.viewed_slider').length) {
    var viewedSlider = $('.viewed_slider');

    viewedSlider.owlCarousel({
      loop: true,
      margin: 30,
      autoplay: true,
      autoplaySpeed: 600,
      autoplayTimeout: 1500,
      nav: false,
      dots: false,
      responsive: {
        0: { items: 1 },
        575: { items: 2 },
        768: { items: 3 },
        991: { items: 4 },
        1199: { items: 6 }
      }
    });

    if ($('.viewed_prev').length) {
      var prev = $('.viewed_prev');
      prev.on('click', () => {
        viewedSlider.trigger('prev.owl.carousel');
      });
    }

    if ($('.viewed_next').length) {
      var next = $('.viewed_next');
      next.on('click', () => {
        viewedSlider.trigger('next.owl.carousel');
      });
    }
  }
}
