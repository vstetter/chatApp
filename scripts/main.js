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
    // chitChatApp.renderMessage();

    chitChatApp.renderUser();
  },
  initEvents: function(){

    // var storedLogin = JSON.parse(localStorage.getItem('userInfo'));


    $('.login').on('submit', function(event){
      event.preventDefault();
        var userInfo = {
          userName: $(this).find('input[name="newUser"]').val(),
          userId: $(this).closest('li').data('itemid')
        };
        chitChatApp.createUser(userInfo);
        // $(this).css('display', 'none');
        // $(this).siblings().addClass('active');


    });


  $('.userList').on('click', '.logout', function (event){
      event.preventDefault();
      var userId = $(this).closest('li').data('itemid');
      chitChatApp.deleteUser(userId);

    });



    $('#createNewMessage').on('submit', function (event) {
      event.preventDefault();

      //need to get user profile via itemid (?), so we can add new message into that object


      var newChatMessage = $(this).find('input[name="newMessage"]').val();

      chitChatApp.createMessage();

    });


  },
    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections/chitChat'
    },


    renderUser: function() {
    $.ajax({
      url: chitChatApp.config.url,
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
      url: chitChatApp.config.url,
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
    url: chitChatApp.config.url + "/" + userId,
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
      console.log('markup is ...', markup);
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
