import { addCart, addWishlist } from '../utils/shareData';
import { parseProductsList } from '../utils/models';
import { convertPriceToText } from '../utils/price';

/* Arrivals Slider */

export const ArrivalsSliderShortProduct = item => `
<div class="arrivals_slider_item" data-item-name="${item.name}">
  <div class="border_active"></div>
  <div class="product_item is_new d-flex flex-column align-items-center justify-content-center text-center">
    <div class="product_image d-flex flex-column align-items-center justify-content-center">
      <img src="${item.thumbnail}" alt="${item.name}">
    </div>
    <div class="product_content">
      <div class="product_price">${item.priceText}</div>
      <div class="product_name">
        <div><a href="product.html?id=${item.id}">${item.name}</a></div>
      </div>
      <div class="product_extras">

        <button class="product_cart_button">Thêm vào giỏ</button>
      </div>
    </div>
    <div class="product_fav"><i class="fas fa-heart"></i></div>
    <ul class="product_marks">
      <li class="product_mark product_new">new</li>
    </ul>
  </div>
</div>
`;

/**
<div class="product_color">
  <input type="radio" checked name="product_color" style="background:#b19c83">
  <input type="radio" name="product_color" style="background:#000000">
  <input type="radio" name="product_color" style="background:#999999">
</div>
*/

let products = [];

export const loadWishlistProduct = (products) => {
  const listItems = $('.arrivals_slider_item');
  // TODO
};


export const loadArrivalSingle = () => {
  const $product = $('.arrivals_single');
  $product.find('.arrivals_single_button').click(() => {
    const item = {
      brand: $product.find('.arrivals_single_category').find('a').text(),
      name: $product.find('.arrivals_single_name').find('a').text(),
      price: parseInt($product.attr('data-item-price'), 10)
    };
    console.log(item);
    addCart(item);
  });
};

export function loadArrivalsProducts() {
  loadArrivalSingle();
  const $hotNewApple = $('.hot-new-apple');
  const $hotNewSamsung = $('.hot-new-samsung');
  const $hotNewXiaomiOPPO = $('.hot-new-xiaomi-oppo');

  const api = '/api/product/getHotNew.php';
  $.get(`http://localhost/hands-free${api}`, (data) => {
    // console.log(data);

    products = parseProductsList(data);

    products.filter(item => item.hotNew && item.brandName == 'Apple')
      .sort((a, b) => b.price - a.price).forEach((item) => {
        $hotNewApple.append(ArrivalsSliderShortProduct(item));
      });

    products.filter(item => item.hotNew && item.brandName == 'Samsung')
      .sort((a, b) => b.price - a.price).forEach((item) => {
        $hotNewSamsung.append(ArrivalsSliderShortProduct(item));
      });

    products.filter(item => item.hotNew && (item.brandName == 'Xiaomi' || item.brandName == 'OPPO'))
      .sort((a, b) => b.price - a.price).forEach((item) => {
        $hotNewXiaomiOPPO.append(ArrivalsSliderShortProduct(item));
      });


    const listItems = $('.arrivals_slider_item');
    listItems.each((_, ele) => {
      $(ele).find('.product_cart_button').click(() => {
        const itemName = $(ele).attr('data-item-name');
        const item = products.filter(i => i.name == itemName)[0];
        addCart(item);
      });

      initArrivalsSlider();
      setArrivalsSliderZIndex();
    });

  }).fail(err => console.log(err));

  // loadWishlistProduct(products);
}


export function initArrivalsSlider() {
  if ($('.arrivals_slider').length) {
    var arrivalsSliders = $('.arrivals_slider');
    arrivalsSliders.each(function () {
      var arrivalsSlider = $(this);
      initASlider(arrivalsSlider);
    });
  }
}

export function initASlider(as) {
  var arrivalsSlider = as;
  arrivalsSlider.on('init', () => {
    var activeItems = arrivalsSlider.find('.slick-slide.slick-active');
    for (var x = 0; x < activeItems.length - 1; x++) {
      var item = $(activeItems[x]);
      item.find('.border_active').removeClass('active');
      if (item.hasClass('slick-active')) {
        item.find('.border_active').addClass('active');
      }
    }
  }).on(
    {
      afterChange(event, slick, current_slide_index, next_slide_index) {
        var activeItems = arrivalsSlider.find('.slick-slide.slick-active');
        activeItems.find('.border_active').removeClass('active');
        for (var x = 0; x < activeItems.length - 1; x++) {
          var item = $(activeItems[x]);
          item.find('.border_active').removeClass('active');
          if (item.hasClass('slick-active')) {
            item.find('.border_active').addClass('active');
          }
        }
      }
    }
  )
    .slick({
      rows: 2,
      slidesToShow: 5,
      slidesToScroll: 5,
      infinite: false,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768, settings:
              {
                rows: 2,
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
              }
        },
        {
          breakpoint: 575, settings:
              {
                rows: 2,
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false
              }
        },
        {
          breakpoint: 480, settings:
              {
                rows: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
              }
        }
      ]
    });
}

/* Init Arrivals Slider ZIndex */

export function setArrivalsSliderZIndex() {
  // Hide slider dots on item hover
  var items = document.getElementsByClassName('arrivals_slider_item');

  for (var x = 0; x < items.length; x++) {
    var item = items[x];
    item.addEventListener('mouseenter', () => {
      $('.arrivals_slider .slick-dots').css('display', 'none');
    });

    item.addEventListener('mouseleave', () => {
      $('.arrivals_slider .slick-dots').css('display', 'block');
    });
  }
}
