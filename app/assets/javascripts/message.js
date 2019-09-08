$(function() {
  function buildHTML(message) {
    //functionによって関数の宣言 buildHTMlは関数の名前 messageは引数
    //function 関数名 (引数){関数を定義する文}
    var image = message.image.url ? `<img class="message__image" src=${message.image.url}>` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.content}
                  </p>
                    ${message.image}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    //onメソッドは第一引数にイベント名、第2引数にそのイベントが実行された時に実行されるfunctionを指定できる
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      //応答データをJson形式にするということ
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      //htmlという変数にcreate.json.jbuilderのデータを代入する
      $('.messages').append(html);
      //appendメソッドとは？→$(‘セレクタ’).append(‘追加するもの’);
      $('.submit-btn').prop('disabled', false);
      //propメソッドとは？→$('セレクタ').prop('プロパティ名');
      //disabled属性をfalseにするとこによってSendボタンが2回目以降も有効になる
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.input-box__text').val('')
      $('.input-box__image__file').val('')
    })
    .fail(function(){
      //サーバーエラー(通信に失敗した時)fail関数が呼ばれる
      alert('error');
    })
  })
});