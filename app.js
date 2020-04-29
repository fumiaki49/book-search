$(function() {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    if(scroll > 100) {
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