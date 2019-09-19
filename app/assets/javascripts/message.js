$(function() {
  function buildHTML(message) {
    //functionによって関数の宣言 buildHTMlは関数の名前 messageは引数
    //function 関数名 (引数){関数を定義する文}
    var image = message.image.url ? `<img class="message__image" src=${message.image.url}>` : "";
    var html = `<div class="message" data-id="${message.id}">
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
                    ${image}
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
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      //htmlという変数にcreate.json.jbuilderのデータを代入する
      $('.messages').append(html);
      //appendメソッドとは？→$('セレクタ').append('追加するもの');
      $('.submit-btn').prop('disabled', false);
      //propメソッドとは？→$('セレクタ').prop('プロパティ名');
      //disabled属性をfalseにするとこによってSendボタンが2回目以降も有効になる
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('id');
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        });
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      })
      .fail(function() {
        alert('更新に失敗しました');
      })
    }
  }
  setInterval(reloadMessages, 5000);
});