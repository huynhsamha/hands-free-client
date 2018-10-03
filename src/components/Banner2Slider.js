/** Banner 2 Slider */

export function initBanner2Slider() {
  if ($('.banner_2_slider').length) {
    var banner2Slider = $('.banner_2_slider');
    banner2Slider.owlCarousel(
      {
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        dotsContainer: '.banner_2_dots',
        smartSpeed: 1200,
        autoplay: true,
        autoplaySpeed: 600,
        autoplayTimeout: 3500
      }
    );
  }
}
