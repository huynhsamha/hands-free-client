import { openMenu, closeMenu, getMenuActive } from '../utils';

export function initPageMenu() {
  if ($('.page_menu').length && $('.page_menu_content').length) {
    var menu = $('.page_menu');
    var menuContent = $('.page_menu_content');
    var menuTrigger = $('.menu_trigger');

    // Open / close page menu
    menuTrigger.on('click', () => {
      if (!getMenuActive()) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Handle page menu
    if ($('.page_menu_item').length) {
      var items = $('.page_menu_item');
      items.each(function () {
        var item = $(this);
        if (item.hasClass('has-children')) {
          item.on('click', (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            var subItem = item.find('> ul');
            if (subItem.hasClass('active')) {
              subItem.toggleClass('active');
              TweenMax.to(subItem, 0.3, { height: 0 });
            } else {
              subItem.toggleClass('active');
              TweenMax.set(subItem, { height: 'auto' });
              TweenMax.from(subItem, 0.3, { height: 0 });
            }
          });
        }
      });
    }
  }
}
