$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    return html;
  }

  function appendErrMsgToHTML(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    appendUser(user);
    var error = appendUser(user)
    $("#user-search-result").append(user);
    return html;
  }

  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#member_search_result").append(html);
  }

  $('#user-search-field').on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
          var user = appendUser(user)
          $("#user-search-result").append(user);
        });
      }
      else {
        appendErrMsgToHTML('一致するユーザーはいません');
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", '.user-search-add', function() {
    var name = $(this).attr("data-user-name");
    var user_id = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendMembers(name, user_id);
  });

  $(document).on("click", '.user-search-remove', function() {
    $(this).parent().remove();
  });
});