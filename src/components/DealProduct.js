const DealProduct = item => `
  <div class="owl-item deals_item">
    <div class="deals_image"><img src=${item.thumbnail} alt="" /></div>
    <div class="deals_content">
      <div class="deals_info_line d-flex flex-row justify-content-start">
        <div class="deals_item_category"><a href="#">${item.brand}</a></div>
        <div class="deals_item_price_a ml-auto">${item.ceilPriceText}</div>
      </div>
      <div class="deals_info_line d-flex flex-row justify-content-start">
        <div class="deals_item_name">${item.name}</div>
        <div class="deals_item_price ml-auto">${item.priceText}</div>
      </div>
    </div>
  </div>
`;

export default DealProduct;


/*
<div class="owl-item deals_item">
  <div class="deals_image"><img src=${item.thumbnail} alt=""></div>
  <div class="deals_content">
    <div class="deals_info_line d-flex flex-row justify-content-start">
      <div class="deals_item_category"><a href="#">${item.brand}</a></div>
      <div class="deals_item_price_a ml-auto">${item.ceilPriceText}</div>
    </div>
    <div class="deals_info_line d-flex flex-row justify-content-start">
      <div class="deals_item_name">${item.name}</div>
      <div class="deals_item_price ml-auto">${item.priceText}</div>
    </div>
    <div class="available">
      <div class="available_line d-flex flex-row justify-content-start">
        <div class="available_title">Available: <span>${item.avai}</span></div>
        <div class="sold_title ml-auto">Already sold: <span>${item.sold}</span></div>
      </div>
      <div class="available_bar"><span style="width:${item.avai / (item.sold + item.avai) * 100}%"></span></div>
    </div>
    <div class="deals_timer d-flex flex-row align-items-center justify-content-start">
      <div class="deals_timer_title_container">
        <div class="deals_timer_title">${'Duy nhất'}</div>
        <div class="deals_timer_subtitle">${'Chỉ còn:'}</div>
      </div>
      <div class="deals_timer_content ml-auto">
        <div class="deals_timer_box clearfix" data-target-time="${item.dealtime}">
          <div class="deals_timer_unit">
            <div id="deals_timer1_hr" class="deals_timer_hr"></div>
            <span>hours</span>
          </div>
          <div class="deals_timer_unit">
            <div id="deals_timer1_min" class="deals_timer_min"></div>
            <span>mins</span>
          </div>
          <div class="deals_timer_unit">
            <div id="deals_timer1_sec" class="deals_timer_sec"></div>
            <span>secs</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
*/
