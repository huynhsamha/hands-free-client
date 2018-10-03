/** Custom Dropdown */

export function initCustomDropdown() {
  var placeholder, list;
  if ($('.custom_dropdown_placeholder').length && $('.custom_list').length) {
    placeholder = $('.custom_dropdown_placeholder');
    list = $('.custom_list');
  }


  placeholder.on('click', (ev) => {
    if (list.hasClass('active')) {
      list.removeClass('active');
    } else {
      list.addClass('active');
    }

    $(document).one('click', function closeForm(e) {
      if ($(e.target).hasClass('clc')) {
        $(document).one('click', closeForm);
      } else {
        list.removeClass('active');
      }
    });
  });


  $('.custom_list a').on('click', function (ev) {
    ev.preventDefault();
    var index = $(this).parent().index();

    placeholder.text($(this).text()).css('opacity', '1');

    if (list.hasClass('active')) {
      list.removeClass('active');
    } else {
      list.addClass('active');
    }
  });


  $('select').on('change', function (e) {
    placeholder.text(this.value);

    $(this).animate({ width: `${placeholder.width()}px` });
  });
}
