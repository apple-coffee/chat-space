$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    let text = message.content ? `${message.content}` : "";
    let image = message.image.url ? `<img src= ${message.image.url} class="lower-message__image">`: "";
    let html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__text">
                      <div>
                      ${text}
                      </div>
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_comment').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $('.messages').append(html);
      $('#new_comment')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  });
  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      let last_message_id = $('.message').last().data("message-id");
      $.ajax({
          //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
          url: "api/messages",
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'GET',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
      })
      .done(function(messages) {
          //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message) {
          if (message.id > last_message_id) {
            insertHTML += buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        });
      })
      .fail(function() {
            alert("エラー");
      });
    } else {
      clearInterval(interval)
    }
  };
  
  setInterval(reloadMessages, 7000);
});