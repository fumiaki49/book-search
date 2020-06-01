$(function () {
  //検索機能
  function searchBook(page) {
    var keyWord = $('#entered-word').val();
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
      var currentPage = page
      var pageMax = data.pageCount

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
        moveNext(currentPage);
        movePrev(currentPage);

      } else {
        $('.lists').append(`<li class="error-message"><span>!</span>検索結果が見つかりませんでした。</li>`);
        $('.error-message').stop().fadeIn();
      }
    }).fail(function(data, status, xhr) {
      console.log(xhr);
      if(xhr === 'Bad Request') {
        $('.lists').append(`<li class="error-message"><span>!</span>キーワードは一文字以上でお願いします。</li>`)
        $('.error-message').stop().fadeIn();
      } else if(xhr === '429') {
        $('.lists').append(`<li class="error-message"><span>!</span>リクエスト過多です。少し時間を開けて、ご利用ください。</li>`)
        $('.error-message').stop().fadeIn();
      }
    })
  }

  function pager() {
    var pager_templagte = `<div class="pagenation">
                              <ul class="pagenation__inner-box">
                                <li class="pagenation__inner-box__btn prev">prev</li>
                                <li class="pagenation__inner-box__btn next">next</li>
                              </ul>
                           </div>`
    $('.lists').after(pager_templagte);
  }

  function moveNext(receivedPage) {
    $('.next').click(function() {
      receivedPage++
      page = receivedPage
      return searchBook(page);
    });
  }

  function movePrev(receivedPage) {
    $('.prev').click(function() {
      receivedPage--
      page = receivedPage
      return searchBook(page);
    });
  }

  function confirmationPageNumber(receivedPage, receivedPageMax) {
    if(receivedPage === 1 && receivedPage === receivedPageMax) {
      $('.prev, .next').addClass('disabled');
    } else if(receivedPage === 1) {
      $('.prev').addClass('disabled');
    } else if(receivedPage === receivedPageMax) {
      $('.next').addClass('disabled');
    }
  }

  $('#search-books').on('click',function() {
    searchBook(1);
  })
});
