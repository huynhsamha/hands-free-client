import qs from 'qs';
// import { shuffle } from '../utils/array';
import { parseProductsList } from '../utils/models';

/** Shop Sidebar + Shop Content */

// Products show on grid

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

let brands = [];
let products = [];

const queries = {
  keywords: '',
  brandList: [],
  minPrice: 0,
  maxPrice: 18000000,
  orderType: 'best_sell',
  page: 1
};

const $productGrid = $('.product_grid_items');

// Update Products Count
export const updateProductsCount = (totalProducts) => {
  $('#shop_product_count_value').text(totalProducts);
};


export const updatePagination = (totalProducts, activePage, onePage, totalPage) => {
  const numPages = totalPage;
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


// export function setEventsBrandList() {
//   const $brandsList = $('.sidebar_categories_brand');
//   $brandsList.each((_, ele) => {
//     const brand = $(ele).attr('data-brand');
//     // $(ele).find('input').change(function () {
//     //   if (this.checked) {
//     //     alert(brand);
//     //   } else {
//     //     alert(`${brand} Unchecked`);
//     //   }
//     // });
//   });
// }

export function loadSortOptions() {
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

  // const $brandsList = $('.sidebar_categories_brand');
  // $brandsList.each((_, ele) => {
  //   const brand = $(ele).attr('data-brand');
  //   $(ele).find('input').change(function () {
  //     if (this.checked) {
  //       // alert(brand);
  //     } else {
  //       // alert(`${brand} Unchecked`);
  //     }
  //   });
  // });
}

export const loadSidebarModels = (models, activeBrandName) => {
  const $models = $('.brands_list');
  $models.html('');

  models.filter(i => i.brand == activeBrandName).forEach((item) => {
    $models.append(`<li class="brand"><a href="#">${item.model}</a></li>`);
  });
};

export function loadSidebarBrands() {
  const $brands = $('.sidebar_categories');
  $brands.html('');

  const api = '/api/brand/get.php';
  $.get(`http://localhost/hands-free${api}`, (data) => {
    // console.log(data);
    brands = data;
    brands.forEach((item) => {
      $brands.append(`
        <li>
          <div class="form-check sidebar_categories_brand" data-brand="${item.id}">
            <input class="form-check-input" type="checkbox" checked="checked">
            <label class="form-check-label">
              ${item.name}
            </label>
          </div>
        </li>`);
    });

    // setEventsBrandList();
    // loadSortOptions();
    // initPriceSlider();

  }).fail(err => console.log(err));
}


/** Load Products */
export const loadProducts = () => {
  const api = `/api/product/search.php?${qs.stringify(queries)}`;
  console.log(api);
  $.get(`http://localhost/hands-free${api}`, (response) => {
    console.log(response);
    const { total, page, onePage, totalPage, offset, data } = response;
    products = parseProductsList(data);
    // $productGrid.html('');
    $productGrid.isotope('getItemElements').forEach((ele) => {
      $productGrid.isotope('remove', ele);
    });
    products.forEach((item) => {
      const newElement = $(ShopProductItem(item));
      $productGrid.append(newElement)
        .isotope('appended', newElement)
        .isotope('layout');
    });
    // initIsotope();
    // $productGrid.isotope('insert', $productGrid.find('.product_item'));
    updateProductsCount(total);
    updatePagination(total, page, onePage, totalPage);

  }).fail(err => console.log(err));
};

export function setEventBtnSearch() {
  $('#btn-search').click(() => {
    // Keywords
    queries.keywords = $('#input-keywords').val();

    // Brand IDs list
    queries.brandList = [];
    $('.sidebar_categories_brand').each((_, ele) => {
      const brandId = $(ele).attr('data-brand');
      if ($(ele).find('input').is(':checked')) queries.brandList.push(brandId);
    });

    const $sorts = $('.sidebar_sort_options');
    $sorts.find('li input').each((_, ele) => {
      if ($(ele).is(':checked')) queries.orderType = $(ele).attr('value');
    });

    console.log(queries);

    loadProducts();
  });
}

/* Isotope*/

export function initIsotope() {
  var sortingButtons = $('.shop_sorting_button');

  $productGrid.isotope({
    itemSelector: '.product_item',
    getSortData: {
      price(itemElement) {
        let priceEle = $(itemElement).find('.product_price').attr('data-price');
        if (priceEle == 'null') priceEle = '9999999999999';
        return parseInt(priceEle, 10);
      },
      negPrice(itemElement) {
        let priceEle = $(itemElement).find('.product_price').attr('data-price');
        if (priceEle == 'null') priceEle = '9999999999999';
        return -parseInt(priceEle, 10);
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
      $productGrid.isotope(option);
    });
  });
}


/* Price Slider*/

export function initPriceSlider() {
  if ($('#slider-range').length) {
    const ONE_MILLION = 1000000;

    // Config Slider
    $('#slider-range').slider({
      range: true,
      min: 1,
      max: 60,
      step: 0.5,
      values: [queries.minPrice / 1000000, queries.maxPrice / 1000000],
      slide(event, ui) {
        $('#amount').val(`${ui.values[0]} triệu - ${ui.values[1]} triệu`);
        queries.minPrice = ui.values[0] * 1000000;
        queries.maxPrice = ui.values[1] * 1000000;
      }
    });

    // Default Slider
    const defaultPriceMin = $('#slider-range').slider('values', 0);
    const defaultPriceMax = $('#slider-range').slider('values', 1);
    $('#amount').val(`${defaultPriceMin} triệu - ${defaultPriceMax} triệu`);

    // $('.ui-slider-handle').on('mouseup', () => {
    //   $productGrid.isotope({
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
