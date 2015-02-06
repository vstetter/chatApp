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

          var strUserInfo = JSON.stringify(userInfo);
          localStorage.setItem('userInfo', strUserInfo);
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
    //storing user data locally
    //   profile: {
    //     login: JSON.parse(localStorage.getItem('login')),
    //     messages: []
    // },


    //
    //   /// RETRIVE USERNAME FROM LOCAL STORAGE ////
    //  ////////////////////////////////////////////
    //  var profile = JSON.parse( localStorage.getItem( 'profile' ) );
    //
    //  /// IF USER EXISTS IN LOCAL STORAGE HIDE LOGIN FIELD ////
    // /////////////////////////////////////////////////////////
    //  if(localStorage.getItem('profile')) {
    //    $('.login').html(userProfile.user.name);
    //    $('#enterUserForm').css('display', 'none');
    //    chatApp.renderAllUsers();
    //  }


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

  //
  // // ---start create and render message in .chatArea ---//
  //
  // //initStyling:
  // initStyling: function () {
  //   toDoList.rendertoDoListItem();
  // },
  //
  // //imitEVents:
  //
  //
  // $('#createItem').on('submit', function (event) {
  //   event.preventDefault();
  //   var newToDoItem = {
  //     toDoItem: $(this).find('input[name="newItem"]').val()
  //   };
  //   toDoList.createtoDoListItem(newToDoItem);
  //
  // });
  //
  //
  //
  //
  // rendertoDoListItem: function () {
  //   $.ajax({
  //     url: toDoList.config.url,
  //     type: 'GET',
  //     success: function (toDoList) {
  //       console.log(toDoList);
  //       var template= _.template($('#toDoTmpl').html());
  //       var markup = "";
  //       toDoList.forEach(function (item, idx, arr) {
  //         markup += template(item);
  //       });
  //       console.log('markup is ...', markup);
  //       $('.ActualList').html(markup);
  //     },
  //     error: function (err) {
  //       console.log(err);
  //     }
  //   });
  // },
  //
  //
  // createMessage: function (listItem) {
  //   $.ajax({
  //     url: toDoList.config.url,
  //     data: listItem,
  //     type: 'POST',
  //     success: function (data) {
  //       console.log(data);
  //       toDoList.rendertoDoListItem();
  //     },
  //     error: function (err) {
  //       console.log(err);
  //     }
  //   });
  // },
  //
  //


};
