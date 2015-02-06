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
  },
  initEvents: function(){

    $('.login').on('submit', function(event){
      event.preventDefault();
        var userInfo = {
          userName: $(this).find('input[name="newUser"]').val(),
          userId: $(this).closest('li').data('itemid'),
          // userMessages: []

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


};
