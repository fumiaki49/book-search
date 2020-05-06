$(function() {
  //スクロール
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    var headerBottom = $('header').height();
    if(scroll > headerBottom) {
      $('.search').addClass('stickItem');
    } else {
      $('.search').removeClass('stickItem');
    }
  });
  
  //モーダル
  $('.modal-show').click(function() {
    $('.modal').fadeIn();
  });
  $('#close-modal-btn').click(function() {
    $('.modal').fadeOut();
  })
});