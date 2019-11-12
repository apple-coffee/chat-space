$(function(){
  function buildHTML(message){
    let text = message.text ? `${message.text}` : "";
    let image = message.image ? `<img src= ${message.image}>` : "";
    let html = `<div class="message">
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
  $('#new_comment').on('submit', function(e){
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
      scrollBottom();

      function scrollBottom() {
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
});