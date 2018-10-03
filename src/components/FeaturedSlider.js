/** Featured Slider */

export const FeaturedSliderShortProduct = item => `
<div class="featured_slider_item">
  <div class="border_active"></div>
  <div class="product_item discount d-flex flex-column align-items-center justify-content-center text-center">
    <div class="product_image d-flex flex-column align-items-center justify-content-center">
    <img src="${item.thumbnail}" alt=""></div>
    <div class="product_content">
      <div class="product_price discount">${item.priceText}
        ${item.ceilPriceText
    ? `<span>${item.ceilPriceText}</span>` : ''}
      </div>
      <div class="product_name">
        <div><a href="product.html">${item.name}</a></div>
      </div>
      <div class="product_extras">

        <button class="product_cart_button">Add to Cart</button>
      </div>
    </div>
    <div class="product_fav"><i class="fas fa-heart"></i></div>
    <ul class="product_marks">
        ${item.ceilPriceText
    ? `<li class="product_mark product_discount">
        -${Math.ceil((item.ceilPrice - item.price) / item.price * 100)}%
      </li>`
    : ''}
    </ul>
  </div>
</div>
`;

/* <div class="product_color">
  <input type="radio" checked name="product_color" style="background:#b19c83">
  <input type="radio" name="product_color" style="background:#000000">
  <input type="radio" name="product_color" style="background:#999999">
</div> */


export function loadFeaturedProducts(products) {
  const $bestSellProducts = $('.best-sell-products');
  const $bestGiftProducts = $('.best-gift-products');
  const $bestPriceProducts = $('.best-price-products');

  products.filter(item => item.bestSell)
    .sort((a, b) => a.price - b.price).forEach((item) => {
      $bestSellProducts.append(FeaturedSliderShortProduct(item));
    });

  products.filter(item => item.bestGift)
    .sort((a, b) => b.price - a.price).forEach((item) => {
      $bestGiftProducts.append(FeaturedSliderShortProduct(item));
    });

  products.filter(item => item.bestPrice)
    .sort((a, b) => a.price - b.price).forEach((item) => {
      $bestPriceProducts.append(FeaturedSliderShortProduct(item));
    });
}

export function setFeaturedSliderZIndex() {
  // Hide slider dots on item hover
  var items = document.getElementsByClassName('featured_slider_item');

  for (var x = 0; x < items.length; x++) {
    var item = items[x];
    item.addEventListener('mouseenter', () => {
      $('.featured_slider .slick-dots').css('display', 'none');
    });

    item.addEventListener('mouseleave', () => {
      $('.featured_slider .slick-dots').css('display', 'block');
    });
  }
}


export function initFeaturedSlider() {
  if ($('.featured_slider').length) {
    var featuredSliders = $('.featured_slider');
    featuredSliders.each(function () {
      var featuredSlider = $(this);
      initFSlider(featuredSlider);
    });
  }
}

export function initFSlider(fs) {
  var featuredSlider = fs;
  featuredSlider.on('init', () => {
    var activeItems = featuredSlider.find('.slick-slide.slick-active');
    for (var x = 0; x < activeItems.length - 1; x++) {
      var item = $(activeItems[x]);
      item.find('.border_active').removeClass('active');
      if (item.hasClass('slick-active')) {
        item.find('.border_active').addClass('active');
      }
    }
  })
    .on({
      afterChange(event, slick, current_slide_index, next_slide_index) {
        var activeItems = featuredSlider.find('.slick-slide.slick-active');
        activeItems.find('.border_active').removeClass('active');
        for (var x = 0; x < activeItems.length - 1; x++) {
          var item = $(activeItems[x]);
          item.find('.border_active').removeClass('active');
          if (item.hasClass('slick-active')) {
            item.find('.border_active').addClass('active');
          }
        }
      }
    })
    .slick({
      rows: 2,
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            rows: 2,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true
          }
        },
        {
          breakpoint: 575,
          settings: {
            rows: 2,
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            rows: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    });
}
