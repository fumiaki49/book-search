export function stickBar() {
  $(window).scroll(function() {
    let scroll = $(this).scrollTop();
    let headerBottom = $('header').height();
    if(scroll > headerBottom) {
      $('.search').addClass('stickItem');
    } else {
      $('.search').removeClass('stickItem');
    }
  });
} 