!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";function n(e,t){$.ajax({url:"https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404",type:"GET",datatype:"json",data:{applicationId:"1041458122876884362",booksGenreId:"001",keyword:t,page:e,hits:20}}).done((function(e){var t,s,n,a;e.count>0?(n=e.Items,a="",$.each(n,(function(e,t){a+='<li class="lists__item">\n                      <a href="'.concat(t.Item.itemUrl,'" class="lists__item__link" target="_blank">\n                        <img src="').concat(t.Item.mediumImageUrl,'" alt="').concat(t.Item.title,'" class="lists__item__img is-full-width">\n                        <div class="lists__item__detail is-align-center"><span>作品名</span><br>').concat(t.Item.title,'</div>\n                        <div class="lists__item__detail is-align-center"><span>作者</span><br>').concat(t.Item.author,"</div>\n                      </a>\n                  </li>")})),$(".lists").append(a),function(){$(".show-more").remove();$(".lists").after('<div class="show-more">\n                              <button class="show-more__btn btn-default is-full-width">show more books</button>\n                            </div>')}(),t=e.page,s=e.pageCount,(1===t&&t===s||t===s)&&$(".show-more__btn").addClass("disabled")):($(".lists").append('<li class="error-message is-align-center is-hide"><span class="circle-item">!</span>検索結果が見つかりませんでした。</li>'),$(".error-message").stop().fadeIn())})).fail((function(e){$(".lists").empty();var t="";switch(e.status){case 400:t+="キーワードは一文字以上でお願いします。";break;case 404:t+="商品が見つかりませんでした。別のキーワードをお試しください。";break;case 429:t+="リクエスト過多です。少し時間を開けてからご利用ください。";break;case 500:t+="楽天webサービスでエラーが発生しました。時間を開けてからお試しください。";break;case 503:t+="申し訳ございません、現在メンテナンス中です。";break;case 0:t+="通信エラーが発生しました。";break;default:t+="予期せぬエラーが発生しました。"}$(".lists").append('<li class= "error-message is-align-center is-hide" ><span class="circle-item">!</span>'.concat(t,"</li>")),$(".error-message").stop().fadeIn()})).always((function(){$("#search-books").prop("disabled",!1),$(".show-more__btn").prop("disabled",!1)}))}s.r(t),$((function(){$(window).scroll((function(){$(this).scrollTop()>$("header").height()?$(".search").addClass("stickItem"):$(".search").removeClass("stickItem")})),$((function(){$(".modal-show").click((function(){$(".modal").fadeIn(),$("html, body").addClass("no-scroll")})),$("#close-modal-btn").click((function(){$(".modal").fadeOut(),$("html, body").removeClass("no-scroll")}))}));var e=null,t="";$("#search-books").on("click",(function(){$(this).prop("disabled",!0),$(".lists").empty(),$(".show-more").remove(),t=$("#entered-word").val(),n(e=1,t)})),$(document).on("click",".show-more__btn",(function(){$(this).prop("disabled",!0),$(this).hasClass("disabled")?swal({icon:"warning",text:"これ以上はありません。"}):n(++e,t)}))}))}]);