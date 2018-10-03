/* Best Sellers Slider */

export function initBestsellersSlider() {
  if ($('.bestsellers_slider').length) {
    var bestsellersSliders = $('.bestsellers_slider');
    bestsellersSliders.each(function () {
      var bestsellersSlider = $(this);

      initBSSlider(bestsellersSlider);
    });
  }
}

export function initBSSlider(bss) {
  var bestsellersSlider = bss;

  bestsellersSlider.slick(
    {
      rows: 2,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      responsive:
          [
            {
              breakpoint: 1199, settings:
              {
                rows: 2,
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
              }
            },
            {
              breakpoint: 991, settings:
              {
                rows: 2,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
              }
            },
            {
              breakpoint: 575, settings:
              {
                rows: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
              }
            }
          ]
    }
  );
}
