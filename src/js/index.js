import {stickBar} from './modules/scroll';
import {modalFunction} from './modules/modal';
import {searchBook} from './modules/search';

$(function() {
  stickBar();
  modalFunction();

  let currentPage = null;
  let pageMax = null;
  let keyWord = '';
  let saveKeyword = '';

  $('#search-books').on('click',function() {
    $(this).prop('disabled', true);
    $('.lists').empty();
    $('.show-more').remove();
    keyWord = $('#entered-word').val();
    currentPage = 1;
    searchBook(currentPage, keyWord);
  });
  
  $(document).on('click', '.show-more__btn', function() {
    $(this).prop('disabled', true);
    if($(this).hasClass('disabled')) {
      swal({
        icon: 'warning',
        text: 'これ以上はありません。'
      });
    } else {
      saveKeyword = keyWord;
      currentPage++;
      searchBook(currentPage, saveKeyword);
    }
  });
});