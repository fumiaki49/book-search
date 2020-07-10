export function modalFunction() {
  $(function() {
    $('.modal-show').click(function() {
      $('.modal').fadeIn();
      $('html, body').addClass('no-scroll');
    });
    $('#close-modal-btn').click(function() {
      $('.modal').fadeOut();
      $('html, body').removeClass('no-scroll');
    });
  });
}
