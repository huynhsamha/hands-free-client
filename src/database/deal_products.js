import numeral from 'numeral';

export const dealProducts = [
  {
    brand: 'Apple',
    name: 'Apple iPhone X 64GB',
    ceilprice: 23700000,
    percent: 15,
    dealprice: 20140000,
    sold: 86,
    avai: 125,
    dealtime: new Date(2018, 9, 1, 20, 30),
    thumbnail: 'https://cellphones.com.vn/media/catalog/product/cache/7/small_image/220x175/9df78eab33525d08d6e5fb8d27136e95/x/-/x-gray.jpg'
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy Note 9 Chính hãng',
    ceilprice: 22990000,
    percent: 10,
    dealprice: 20690000,
    sold: 92,
    avai: 65,
    dealtime: new Date(2018, 9, 1, 23),
    thumbnail: 'https://cellphones.com.vn/media/catalog/product/cache/7/small_image/220x175/9df78eab33525d08d6e5fb8d27136e95/g/a/galaxy-note-9-bronze.jpg'
  },
  {
    brand: 'Xiaomi',
    name: 'Xiaomi Redmi Note 5 32GB Chính hãng',
    ceilprice: 4350000,
    percent: 10,
    dealprice: 3915000,
    sold: 265,
    avai: 136,
    dealtime: new Date(2018, 9, 1, 18),
    thumbnail: 'https://cellphones.com.vn/media/catalog/product/cache/7/small_image/220x175/9df78eab33525d08d6e5fb8d27136e95/r/e/redmi-note-5-pro-black_1.jpg'
  },
  {
    brand: 'Huawei',
    name: 'Huawei nova 3i Chính hãng',
    ceilprice: 7990000,
    percent: 30,
    dealprice: 5593000,
    sold: 356,
    avai: 82,
    dealtime: new Date(2018, 9, 1, 11),
    thumbnail: 'https://cellphones.com.vn/media/catalog/product/cache/7/small_image/220x175/9df78eab33525d08d6e5fb8d27136e95/n/o/nova-3i-white.jpg'
  },
  {
    brand: 'OPPO',
    name: 'OPPO A3s 16GB Chính hãng',
    ceilprice: 3885000,
    percent: 20,
    dealprice: 3108000,
    sold: 202,
    avai: 36,
    dealtime: new Date(2018, 9, 1, 14),
    thumbnail: 'https://cellphones.com.vn/media/catalog/product/cache/7/small_image/220x175/9df78eab33525d08d6e5fb8d27136e95/a/3/a3s-purple.jpg'
  }
];

const toPrice = num => numeral(num).format('0,0');

export const renderDealProducts = item => `
              <div class="owl-item deals_item">
                <div class="deals_image"><img src=${item.thumbnail} alt=""></div>
                <div class="deals_content">
                  <div class="deals_info_line d-flex flex-row justify-content-start">
                    <div class="deals_item_category"><a href="#">${item.brand}</a></div>
                    <div class="deals_item_price_a ml-auto">${toPrice(item.ceilprice)}</div>
                  </div>
                  <div class="deals_info_line d-flex flex-row justify-content-start">
                    <div class="deals_item_name">${item.name}</div>
                    <div class="deals_item_price ml-auto">${toPrice(item.dealprice)}</div>
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
                      <div class="deals_timer_title">Nhanh tay nào</div>
                      <div class="deals_timer_subtitle">Chỉ còn:</div>
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
`;
