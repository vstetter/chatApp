$(document).ready(function(){
  chitChatApp.init();

});


var chitChatApp = {

  init: function(){
    chitChatApp.initEvents();
    chitChatApp.initStyling();
    setInterval(chitChatApp.renderUser, 1000);
  },
  initStyling: function(){
    chitChatApp.renderUser();
    chitChatApp.renderMessage();

    // chitChatApp.renderMessage();
  },
  initEvents: function(){


    $('#createNewMessage').on('.newMessage', function (event) {
      event.preventDefault();
      var newChatMessage = {
        userName: userInfo.username,
        message: $(this).find('input[name="newMessage"]').val()

      };

      chitChatApp.createMessage();

    });

},
config: {
  url: 'http://tiy-fee-rest.herokuapp.com/collections/chitChat5'
},



renderMessage: function () {
  $.ajax({
    url: chitChatApp.config.url,
    type: 'GET',
    success: function (message) {
      console.log(message);
      var template= _.template(templates.messageTmpl);
      var markup = "";
      message.forEach(function (item, idx, arr) {
        markup += template(item);
      });
      console.log('MESSAGE..', markup);
      $('.chatArea').html(markup);
    },
    error: function (err) {
      console.log(err);
    }
  });
},


createMessage: function (newMessage) {
  $.ajax({
    url: chitChatApp.config.url, //after url + '/' + id,   ??
    data: newMessage, //msg
    type: 'POST',  //PUT?
    success: function (data) {
      console.log(data);
      chitChatApp.renderMessage();
    },
    error: function (err) {
      console.log(err);
    }
  });
}




};
