/** Recently Viewed Slider */

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
