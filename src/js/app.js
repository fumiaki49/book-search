$(function() {
  //スクロール
  $(window).scroll(function() {
    let scroll = $(this).scrollTop();
    let headerBottom = $('header').height();
    if(scroll > headerBottom) {
      $('.search').addClass('stickItem');
    } else {
      $('.search').removeClass('stickItem');
    }
  });
  
  //モーダル
  $('.modal-show').click(function() {
    $('.modal').fadeIn();
    $('html, body').addClass('no-scroll');
  });
  $('#close-modal-btn').click(function() {
    $('.modal').fadeOut();
    $('html, body').removeClass('no-scroll');
  });
});