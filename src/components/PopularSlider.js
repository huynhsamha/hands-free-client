/** Popular Slider */

export const PopularCategoryBrand = item => `
<div class="owl-item">
  <div class="popular_category d-flex flex-column align-items-center justify-content-center">
    <div class="popular_category_image">
      <img src="${item.iconUri}" alt="${item.name}">
    </div>
    <div class="popular_category_text">${item.name}</div>
  </div>
</div>
`;

let brands = [];

export function loadPopularSlider() {
  const $popularSlider = $('.popular_categories_slider');

  const api = '/api/brand/get.php';
  $.get(`http://localhost/hands-free${api}`, (data) => {
    // console.log(data);
    brands = data;
    brands.forEach(item => $popularSlider.append(PopularCategoryBrand(item)));
    initPopularSlider();
  }).fail(err => console.log(err));
}

export function initPopularSlider() {
  if ($('.popular_categories_slider').length) {
    var popularSlider = $('.popular_categories_slider');

    popularSlider.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 400,
      autoplayTimeout: 2500,
      responsive: {
        0: { items: 1 },
        575: { items: 2 },
        640: { items: 3 },
        768: { items: 4 },
        991: { items: 5 }
      }
    });

    if ($('.popular_categories_prev').length) {
      var prev = $('.popular_categories_prev');
      prev.on('click', () => {
        popularSlider.trigger('prev.owl.carousel');
      });
    }

    if ($('.popular_categories_next').length) {
      var next = $('.popular_categories_next');
      next.on('click', () => {
        popularSlider.trigger('next.owl.carousel');
      });
    }
  }
}
