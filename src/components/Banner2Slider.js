/** Banner 2 Slider */

export const Banner2Product = item => `
<div class="owl-item">
  <div class="banner_2_item">
    <div class="container fill_height">
      <div class="row fill_height">
        <div class="col-lg-4 col-md-6 fill_height">
          <div class="banner_2_content">
            <div class="banner_2_category">${item.brand}${item.model ? ` - ${item.model}` : ''}</div>
            <div class="banner_2_title">${item.name}</div>
            <div class="banner_2_text">${item.description}</div>
            <div class="button banner_2_button"><a href="#">Khám phá ngay</a></div>
          </div>

        </div>
        <div class="col-lg-8 col-md-6 fill_height">
          <div class="banner_2_image_container">
            <div class="banner_2_image"><img src="${item.thumbnail}" alt="${item.model}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

/* <div class="rating_r rating_r_4 banner_2_rating"><i></i><i></i><i></i><i></i><i></i></div> */

export const loadBanner2Products = (products) => {
  const $banner2 = $('.banner_2_slider');

  products.forEach((item) => {
    $banner2.append(Banner2Product(item));
  });
};

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
