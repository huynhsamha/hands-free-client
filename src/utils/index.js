let menuActive = false;

export const getMenuActive = () => menuActive;
export const setMenuActive = (bool) => { menuActive = bool; };

export function setHeader() {
  // pinMainNavToTopPage();

  if (window.innerWidth > 991 && menuActive) {
    closeMenu();
  }
}


export function pinMainNavToTopPage() {
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  var pin = new ScrollMagic.Scene({
    triggerElement: '.main_nav'
  })
    .setPin('.main_nav').addTo(controller);
}


export function openMenu() {
  var menu = $('.page_menu');
  var menuContent = $('.page_menu_content');
  TweenMax.set(menuContent, { height: 'auto' });
  TweenMax.from(menuContent, 0.3, { height: 0 });
  menuActive = true;
}


export function closeMenu() {
  var menu = $('.page_menu');
  var menuContent = $('.page_menu_content');
  TweenMax.to(menuContent, 0.3, { height: 0 });
  menuActive = false;
}
