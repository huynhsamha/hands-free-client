/** Review Slider */

export function initReviewsSlider() {
  if ($('.reviews_slider').length) {
    var reviewsSlider = $('.reviews_slider');

    reviewsSlider.owlCarousel({
      loop: true,
      margin: 30,
      autoplay: true,
      autoplaySpeed: 500,
      autoplayTimeout: 2000,
      nav: false,
      dots: true,
      dotsContainer: '.reviews_dots',
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        991: { items: 3 }
      }
    });
  }
}
