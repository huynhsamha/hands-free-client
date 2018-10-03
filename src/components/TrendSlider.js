/** Trends Slider */

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
