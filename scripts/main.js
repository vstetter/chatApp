$(document).ready(function(){
  chitChatApp.init();


  // to delete bad data uncomment out this line and put in correct id from server
  //  chitChatApp.deleteMessage('54d64ac7ddad9b0300000025');
  //  chitChatApp.deleteMessage('54d64b44ddad9b0300000027');
   //
  //  chitChatApp.deleteMessage('54d64a3cddad9b0300000022');
  //  chitChatApp.deleteMessage('54d6492fddad9b030000001f');
   //



});

// var userMessage = {};

var chitChatApp = {

  init: function(){
    chitChatApp.initEvents();
    chitChatApp.initStyling();
    setInterval(chitChatApp.renderUser, 1000);
  },
  initStyling: function(){
    chitChatApp.renderUser();
    chitChatApp.renderMessage();
  },
  initEvents: function(){

    // var storedLogin = JSON.parse(localStorage.getItem('userInfo'));


    $('.login').on('submit', function(event){
      event.preventDefault();
      var userInfo = {
        userName: $(this).find('input[name="newUser"]').val(),
        userId: $(this).closest('li').data('itemid')
        // userMessage:""

      };

      $(this).css('display', 'none');
      $(this).parent().siblings('.container').addClass('active');
      chitChatApp.createUser(userInfo);

    });


    $('.userList').on('click', '.logout', function (event){
        event.preventDefault();
        var userId = $(this).closest('li').data('itemid');
        chitChatApp.deleteUser(userId);

    });

    $('.newMessage').on('click', function(event){
      event.preventDefault();

      var userNameParse = JSON.parse(localStorage.getItem('userInfo'));
      var newMessage = {
        userMessage : $(this).siblings('input[name="newMessage"]').val(),
        userId: $(this).closest('li').data('itemid'),
        userName: userNameParse.userName

      };
      console.log('new message event worked!');

      chitChatApp.addMessage(newMessage);
    });
  },


    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections'
    },


    renderUser: function() {
    $.ajax({
      url: chitChatApp.config.url + "/chitChatUser",
      type: 'GET',
      success: function (chitChatApp) {
        var template = _.template(templates.userList);
        var markup = "";
        chitChatApp.forEach(function(item, idx, arr){
          markup += template(item);
        });
        console.log('markup is...', markup);
        $('.userList').html(markup);

      },
      error: function (err) {
        console.log(err);
      }
    });
  },

    createUser: function(newUser) {
      $.ajax({
      url: chitChatApp.config.url + "/chitChatUser",
      data: newUser,
      type: 'POST',
      success: function (data) {
        console.log(data, '', 'added!');
        chitChatApp.renderUser();
        var strUserInfo = JSON.stringify(data);
        localStorage.setItem('userInfo', strUserInfo);
      },
      error: function (err) {
        console.log(err);
      }
    });
    $('input').val('');

  },


  deleteUser: function(userId) {
  $.ajax({
    url: chitChatApp.config.url + "/chitChatUser" + "/" + userId,
    type: 'DELETE',
    success: function (data) {
      console.log(data);
      chitChatApp.renderUser();
    },
    error: function (err) {
      console.log(err);
    }
  });
},

  renderMessage: function() {
    $.ajax({
      url: chitChatApp.config.url + "/chitChatMessage",
      type: "GET",
      success: function (message) {
        console.log(message);
        var template = _.template(templates.messageTmpl);
        var markup = "";
        message.forEach(function(item, index, array){
          markup += template(item);
        });
        console.log('IT WORKED!', markup);
        $('.chatArea').prepend().html(markup);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },

  // createMessage: function(message) {
  //   $.ajax({
  //     url: chitChatApp.config.url + "/chitChatMessage",
  //     data: message,
  //     type: 'POST',
  //     success:function(data) {
  //       console.log(data);
  //       chitChatApp.renderMessage();
  //
  //     error: function(err) {
  //       console.log(err);
  //     }
  //   });
  // },

  addMessage: function(userMessage) {
    $.ajax({
      url: chitChatApp.config.url + "/chitChatMessage",
      data: userMessage,
      type: "POST",
      success: function (data) {
        console.log(data);
        chitChatApp.renderMessage();
        var strMessage = JSON.stringify(data);
        localStorage.setItem('newMessage', strMessage);
      },
      error: function(err) {
        console.log(err);
      }
    });
    $('input').val('');

  },

  deleteMessage: function(userId) {
  $.ajax({
    url: chitChatApp.config.url + "/chitChatMessage" + "/" + userId,
    type: 'DELETE',
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
