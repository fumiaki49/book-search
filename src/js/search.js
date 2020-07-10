$(function () {
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

  function searchBook(page, keyWord) {
    $.ajax({
      url: 'https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404',
      type: 'GET',
      datatype: 'json',
      data: {
        applicationId: '1041458122876884362',
        booksGenreId: '001',
        keyword: keyWord,
        page: page,
        hits: 20
      },
    }).done(function(data) {
      currentPage = page;
      pageMax = data.pageCount;

      if(data.count > 0) {
        booksList(data.Items);
        showMoreItem();
        confirmationPageNumber(currentPage, pageMax);
      } else {
        $('.lists').append(`<li class="error-message is-align-center is-hide"><span class="circle-item">!</span>検索結果が見つかりませんでした。</li>`);
        $('.error-message').stop().fadeIn();
      }
    }).fail(function(error) {
      $('.lists').empty();
      let errorMessage = '';
      switch(error.status) {
        case 400:
          errorMessage += "キーワードは一文字以上でお願いします。";
          break;
        case 404:
          errorMessage += "商品が見つかりませんでした。別のキーワードをお試しください。";
          break;
        case 429:
          errorMessage += "リクエスト過多です。少し時間を開けてからご利用ください。";
          break;
        case 500:
          errorMessage += "楽天webサービスでエラーが発生しました。時間を開けてからお試しください。";
          break;
        case 503:
          errorMessage += "申し訳ございません、現在メンテナンス中です。";
          break;
        case 0:
          errorMessage += "通信エラーが発生しました。";
          break;
        default:
          errorMessage += "予期せぬエラーが発生しました。";
          break;
      }
      $('.lists').append(`<li class= "error-message is-align-center is-hide" ><span class="circle-item">!</span>${errorMessage}</li>`);
      $('.error-message').stop().fadeIn();
    }).always(function() {
      $('#search-books').prop('disabled', false);
      $('.show-more__btn').prop('disabled', false);
    });
  }

  function booksList(receivedBooks) {
    let template = '';
    $.each(receivedBooks, function(index, product) {
      template += `<li class="lists__item">
                        <a href="${product.Item.itemUrl}" class="lists__item__link" target="_blank">
                          <img src="${product.Item.mediumImageUrl}" alt="${product.Item.title}" class="lists__item__img is-full-width">
                          <div class="lists__item__detail is-align-center"><span>作品名</span><br>${product.Item.title}</div>
                          <div class="lists__item__detail is-align-center"><span>作者</span><br>${product.Item.author}</div>
                        </a>
                    </li>`;
    });
    $('.lists').append(template);
  }

  function showMoreItem() {
    $('.show-more').remove();
    let showMore_template = `<div class="show-more">
                               <button class="show-more__btn btn-default is-full-width">show more books</button>
                             </div>`;
    $('.lists').after(showMore_template);
  }

  function confirmationPageNumber(receivedPage, receivedPageMax) {
    if(receivedPage === 1 && receivedPage === receivedPageMax) {
      $('.show-more__btn').addClass('disabled');
    } else if(receivedPage === receivedPageMax) {
      $('.show-more__btn').addClass('disabled');
    }
  }
});