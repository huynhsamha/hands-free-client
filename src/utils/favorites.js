/* Favorites */

export function initFavs() {
  // Handle Favorites
  var items = document.getElementsByClassName('product_fav');
  for (var x = 0; x < items.length; x++) {
    var item = items[x];
    item.addEventListener('click', (fn) => {
      fn.target.classList.toggle('active');
    });
  }
}
