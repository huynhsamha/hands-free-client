import { shuffle } from '../utils/array';

/** Shop Sidebar + Shop Content */

// Products show on grid
export const PRODUCT_PER_PAGE = 30;

// Components
export const ShopProductItem = item => `
<div class="product_item ${item.ceilPriceText ? 'discount' : `${item.hotNew ? 'is_new' : ''}`}">
  <div class="product_border"></div>
  <div class="product_image d-flex flex-column align-items-center justify-content-center">
    <img src="${item.thumbnail}" alt="${item.name}">
  </div>
  <div class="product_content">
    <div class="product_price" data-price=${item.price}>${item.priceText}
    ${item.ceilPriceText
    ? `<span>${item.ceilPriceText}</span>` : ''}
    </div>
    <div class="product_name">
      <div><a href="product.html">${item.name}</a></div>
    </div>
  </div>
  <div class="product_fav"><i class="fas fa-heart"></i></div>
  <ul class="product_marks">

  ${item.ceilPriceText
    ? `<li class="product_mark product_discount">
        -${Math.ceil((item.ceilPrice - item.price) / item.ceilPrice * 100)}%
      </li>`
    : ''}

  ${item.hotNew
    ? '<li class="product_mark product_new">new</li>'
    : ''}

  </ul>
</div>`;


// Update Products Count
export const updateProductsCount = (totalProducts) => {
  $('#shop_product_count_value').text(totalProducts);
};


/** Load Products */
export const loadProducts = (products) => {
  const $productGrid = $('.product_grid');
  products = shuffle(products);

  products.slice(0, PRODUCT_PER_PAGE).forEach(item => $productGrid.append(ShopProductItem(item)));
  updateProductsCount(products.length);
};


export const updatePagination = (totalProducts, activePage) => {
  const numPages = Math.ceil(totalProducts / PRODUCT_PER_PAGE);
  const $paginaton = $('.page_nav');
  $paginaton.html('');

  const addLink = i => $paginaton.append(`<li><a href="#">${i}</a></li>`);

  for (let i = 1; i <= Math.min(4, numPages); i++) {
    addLink(i);
  }
  if (numPages < 8) {
    for (let i = 5; i <= numPages; i++) {
      addLink(i);
    }
  } else {
    addLink('...');
    for (let i = numPages - 2; i <= numPages; i++) {
      addLink(i);
    }
  }
};


export const loadSidebarBrands = (brands) => {
  const $brands = $('.sidebar_categories');
  $brands.html('');

  brands.forEach((item) => {
    $brands.append(`
      <li>
        <div class="form-check sidebar_categories_brand" data-brand="${item.brand}">
          <input class="form-check-input" type="checkbox" checked="checked">
          <label class="form-check-label">
            ${item.brand}
          </label>
        </div>
      </li>`);
  });

  const $brandsList = $('.sidebar_categories_brand');
  $brandsList.each((_, ele) => {
    const brand = $(ele).attr('data-brand');
    $(ele).find('input').change(function () {
      if (this.checked) {
        // alert(brand);
      } else {
        // alert(`${brand} Unchecked`);
      }
    });
  });
  // `<li><a href="#" onClick="alert('${item.brand}')">${item.brand}</a></li>`
};

export const loadSortOptions = () => {
  const $sorts = $('.sidebar_sort_options');
  $sorts.html('');

  const sorts = [
    { value: 'best_sell', text: 'Bán chạy nhất' },
    { value: 'price_asc', text: 'Giá tăng dần' },
    { value: 'price_desc', text: 'Giá giảm dần' },
    { value: 'name', text: 'Tên' }
  ];

  sorts.forEach((item) => {
    $sorts.append(`
      <li>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sort" value="${item.value}" ${item.value == 'best_sell' ? 'checked' : ''}>
          <label class="form-check-label">
            ${item.text}
          </label>
        </div>
      </li>`);
  });

  const $brandsList = $('.sidebar_categories_brand');
  $brandsList.each((_, ele) => {
    const brand = $(ele).attr('data-brand');
    $(ele).find('input').change(function () {
      if (this.checked) {
        // alert(brand);
      } else {
        // alert(`${brand} Unchecked`);
      }
    });
  });
};

export const loadSidebarModels = (models, activeBrandName) => {
  const $models = $('.brands_list');
  $models.html('');

  models.filter(i => i.brand == activeBrandName).forEach((item) => {
    $models.append(`<li class="brand"><a href="#">${item.model}</a></li>`);
  });
};

/* Isotope*/

export function initIsotope(brands) {
  var sortingButtons = $('.shop_sorting_button');

  $('.product_grid').isotope({
    itemSelector: '.product_item',
    getSortData: {
      price(itemElement) {
        let priceEle = $(itemElement).find('.product_price').attr('data-price');
        if (priceEle == 'null') priceEle = '9999999999999';
        return parseInt(priceEle, 10);
      },
      name: '.product_name div a'
    },
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    }
  });

  // Sort based on the value from the sorting_type dropdown
  sortingButtons.each(function () {
    $(this).on('click', function () {
      $('.sorting_text span').text($(this).text()); // update sorted shown on UI
      var option = $(this).attr('data-isotope-option');
      option = JSON.parse(option);
      $('.product_grid').isotope(option);
    });
  });
}


/* Price Slider*/

export function initPriceSlider(brands) {
  if ($('#slider-range').length) {
    const ONE_MILLION = 1000000;

    // Config Slider
    $('#slider-range').slider({
      range: true,
      min: 1,
      max: 60,
      step: 0.5,
      values: [1, 18],
      slide(event, ui) {
        $('#amount').val(`${ui.values[0]} triệu - ${ui.values[1]} triệu`);
      }
    });

    // Default Slider
    const defaultPriceMin = $('#slider-range').slider('values', 0);
    const defaultPriceMax = $('#slider-range').slider('values', 1);
    $('#amount').val(`${defaultPriceMin} triệu - ${defaultPriceMax} triệu`);

    // $('.ui-slider-handle').on('mouseup', () => {
    //   $('.product_grid').isotope({
    //     filter() {
    //       const priceRange = $('#amount').val();
    //       let priceMin = parseFloat(priceRange.split('-')[0].replace('triệu', ''));
    //       let priceMax = parseFloat(priceRange.split('-')[1].replace('triệu', ''));

    //       let itemPrice = $(this).find('.product_price').attr('data-price');
    //       if (itemPrice == 'null') itemPrice = '60000000';

    //       itemPrice = parseInt(itemPrice, 10);
    //       priceMin = parseInt(priceMin * ONE_MILLION, 10);
    //       priceMax = parseInt(priceMax * ONE_MILLION, 10);

    //       return (itemPrice >= priceMin) && (itemPrice <= priceMax);
    //     },
    //     animationOptions: {
    //       duration: 750,
    //       easing: 'linear',
    //       queue: false
    //     }
    //   });
    // });
  }
}
