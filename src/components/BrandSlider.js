/** Brands Slider */

export function initBrandsSlider() {
  if ($('.brands_slider').length) {
    var brandsSlider = $('.brands_slider');

    brandsSlider.owlCarousel({
      loop: true,
      autoplay: true,
      autoplaySpeed: 400,
      autoplayTimeout: 2500,
      nav: false,
      dots: false,
      autoWidth: true,
      items: 8,
      margin: 42
    });

    if ($('.brands_prev').length) {
      var prev = $('.brands_prev');
      prev.on('click', () => {
        brandsSlider.trigger('prev.owl.carousel');
      });
    }

    if ($('.brands_next').length) {
      var next = $('.brands_next');
      next.on('click', () => {
        brandsSlider.trigger('next.owl.carousel');
      });
    }
  }
}
