$(function () {
  var currentPage = null;
  var pageMax = null;
  var keyWord = '';
  var saveKeyword = '';

  $('#search-books').on('click',function() {
    keyWord = $('#entered-word').val();
    currentPage = 1;
    searchBook(currentPage, keyWord);
  });

  $(document).on('click', '.prev', function() {
    saveKeyword = keyWord;
    currentPage--
    searchBook(currentPage, saveKeyword);
  });

  $(document).on('click', '.next', function() {
    saveKeyword = keyWord;
    currentPage++
    searchBook(currentPage, saveKeyword);
  });

  $(document).on('click', '.top-page', function() {
    saveKeyword = keyWord;
    searchBook(1, saveKeyword);
  });

  $(document).on('click', '.last-page', function() {
    saveKeyword = keyWord;
    searchBook(pageMax, saveKeyword);
  });

  function searchBook(page, keyWord) {
    $('.lists, .pagenation').empty();

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
      currentPage = page
      pageMax = data.pageCount

      if(data.count > 0) {
        $.each(data.Items, function() {
          var template = `<li class="lists__item">
                            <div class="lists__item__inner">
                              <a href="${this.Item.itemUrl}" class="lists__item__link" target="_blank">
                                <img src="${this.Item.mediumImageUrl}" alt="${this.Item.title}" class="lists__item__img">
                                <div class="lists__item__detail">作品名：${this.Item.title}</div>
                                <div class="lists__item__detail">作者　：${this.Item.author}</div>
                              </a>
                            </div>
                          </li>`
          $('.lists').append(template);
        });

        pager();
        confirmationPageNumber(currentPage, pageMax);

      } else {
        $('.lists').append(`<li class="error-message"><span>!</span>検索結果が見つかりませんでした。</li>`);
        $('.error-message').stop().fadeIn();
      };
    }).fail(function(error) {
      var errorMessage = '';
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
      };
      $('.lists').append('<li class= "error-message" >' + '<span>!</span>' + errorMessage + '</li>');
      $('.error-message').stop().fadeIn();
    })
  };

  function pager() {
    var pager_templagte = `<div class="pagenation">
                              <ul class="pagenation__inner-box">
                                <li class="pagenation__inner-box__btn top-page"> << </li>
                                <li class="pagenation__inner-box__btn prev">prev</li>
                                <li class="pagenation__inner-box__btn next">next</li>
                                <li class="pagenation__inner-box__btn last-page"> >> </li>
                              </ul>
                           </div>`
    $('.lists').after(pager_templagte);
  };

  function confirmationPageNumber(receivedPage, receivedPageMax) {
    if(receivedPage === 1 && receivedPage === receivedPageMax) {
      $('.prev, .next, .top-page, .last-page').addClass('disabled');
    } else if(receivedPage === 1) {
      $('.prev, .top-page').addClass('disabled');
    } else if(receivedPage === receivedPageMax) {
      $('.next, .last-page').addClass('disabled');
    }
  };
});
