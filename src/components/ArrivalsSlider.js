/* Arrivals Slider */

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
    .slick(
      {
        rows: 2,
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        arrows: false,
        dots: true,
        responsive:
          [
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
      }
    );
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
