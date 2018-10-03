const ShortProduct = item => `
<div class="featured_slider_item">
  <div class="border_active"></div>
  <div class="product_item discount d-flex flex-column align-items-center justify-content-center text-center">
    <div class="product_image d-flex flex-column align-items-center justify-content-center">
    <img src="${item.thumbnail}" alt=""></div>
    <div class="product_content">
      <div class="product_price discount">${item.priceText}
        ${item.ceilPriceText
    ? `<span>${item.ceilPriceText}</span>` : ''}
      </div>
      <div class="product_name">
        <div><a href="product.html">${item.name}</a></div>
      </div>
      <div class="product_extras">

        <button class="product_cart_button">Add to Cart</button>
      </div>
    </div>
    <div class="product_fav"><i class="fas fa-heart"></i></div>
    <ul class="product_marks">
        ${item.ceilPriceText
    ? `<li class="product_mark product_discount">-${Math.ceil((item.ceilPrice - item.price) / item.price * 100)}%</li>` : ''}
    </ul>
  </div>
</div>
`;

export default ShortProduct;


/* <div class="product_color">
  <input type="radio" checked name="product_color" style="background:#b19c83">
  <input type="radio" name="product_color" style="background:#000000">
  <input type="radio" name="product_color" style="background:#999999">
</div> */
