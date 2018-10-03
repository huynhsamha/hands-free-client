import { initFSlider } from './FeaturedSlider';
import { initASlider } from './ArrivalsSlider';
import { initBSSlider } from './BestSellersSlider';


/** Tab Lines */

export function initTabLines() {
  if ($('.tabs').length) {
    var tabs = $('.tabs');

    tabs.each(function () {
      var tabsItem = $(this);
      var tabsLine = tabsItem.find('.tabs_line span');
      var tabGroup = tabsItem.find('ul li');

      var posX = $(tabGroup[0]).position().left;
      tabsLine.css({ 'left': posX, 'width': $(tabGroup[0]).width() });
      tabGroup.each(function () {
        var tab = $(this);
        tab.on('click', () => {
          if (!tab.hasClass('active')) {
            tabGroup.removeClass('active');
            tab.toggleClass('active');
            var tabXPos = tab.position().left;
            var tabWidth = tab.width();
            tabsLine.css({ 'left': tabXPos, 'width': tabWidth });
          }
        });
      });
    });
  }
}


/** Tabs */

export function initTabs() {
  if ($('.tabbed_container').length) {
    // Handle tabs switching

    var tabsContainers = $('.tabbed_container');
    tabsContainers.each(function () {
      var tabContainer = $(this);
      var tabs = tabContainer.find('.tabs ul li');
      var panels = tabContainer.find('.panel');
      var sliders = panels.find('.slider');

      tabs.each(function () {
        var tab = $(this);
        tab.on('click', function () {
          panels.removeClass('active');
          var tabIndex = tabs.index(this);
          $($(panels[tabIndex]).addClass('active'));
          sliders.slick('unslick');
          sliders.each(function () {
            var slider = $(this);
            // slider.slick("unslick");
            if (slider.hasClass('bestsellers_slider')) {
              initBSSlider(slider);
            }
            if (slider.hasClass('featured_slider')) {
              initFSlider(slider);
            }
            if (slider.hasClass('arrivals_slider')) {
              initASlider(slider);
            }
          });
        });
      });
    });
  }
}
