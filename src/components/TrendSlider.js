/** Trends Slider */

export const TrendsSliderItem = item => `
<div class="owl-item">
<div class="trends_item ${item.ceilPriceText ? 'discount' : `${item.hotNew ? 'is_new' : ''}`}">
  <div class="trends_image d-flex flex-column align-items-center justify-content-center">
    <img src="${item.thumbnail}" alt="${item.name}">
  </div>
  <div class="trends_content">
    <div class="trends_category"><a href="#">${item.brand}</a></div>
    <div class="trends_info clearfix">
      <div class="trends_name"><a href="product.html">${item.name}</a></div>
      <div class="trends_price">${item.priceText}</div>
    </div>
  </div>
  <ul class="trends_marks">

  ${item.ceilPriceText
    ? `<li class="trends_mark trends_discount">
          -${Math.ceil((item.ceilPrice - item.price) / item.ceilPrice * 100)}%
        </li>`
    : ''}

    ${item.hotNew
    ? '<li class="trends_mark trends_new">new</li>'
    : ''}

  </ul>
  <div class="trends_fav"><i class="fas fa-heart"></i></div>
</div>
</div>
`;

export const laodTrendsSlider = (products) => {
  const $trendsSlider = $('.trends_slider');
  products.filter(item => item.hotNew)
    .sort((a, b) => b.price - a.price).forEach((item) => {
      $trendsSlider.append(TrendsSliderItem(item));
    });
};

export function initTrendsSlider() {
  if ($('.trends_slider').length) {
    var trendsSlider = $('.trends_slider');
    trendsSlider.owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: false,
      autoplayHoverPause: true,
      autoplay: true,
      autoplaySpeed: 400,
      autoplayTimeout: 1500,
      responsive: {
        0: { items: 1 },
        575: { items: 2 },
        991: { items: 3 }
      }
    });

    trendsSlider.on('click', '.trends_fav', (ev) => {
      $(ev.target).toggleClass('active');
    });

    if ($('.trends_prev').length) {
      var prev = $('.trends_prev');
      prev.on('click', () => {
        trendsSlider.trigger('prev.owl.carousel');
      });
    }

    if ($('.trends_next').length) {
      var next = $('.trends_next');
      next.on('click', () => {
        trendsSlider.trigger('next.owl.carousel');
      });
    }
  }
}
