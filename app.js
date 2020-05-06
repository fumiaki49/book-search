$(function() {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    var headerBottom = $('header').height();
    if(scroll > headerBottom) {
      $('.search').addClass('stickItem');
    } else {
      $('.search').removeClass('stickItem');
    }
  });

  
  $('.modal-show').click(function() {
    $('.modal').fadeIn();
  });
  $('#close-modal-btn, .modal').click(function() {
    $('.modal').fadeOut();
  })
});