$(document).ready(function(){
  chitChatApp.init();

});


var chitChatApp = {

  //add userProfile {
//   get from localStorage
//   messages
// },


  init: function(){
    chitChatApp.initEvents();
    chitChatApp.initStyling();
  },
  initStyling: function(){

    chitChatApp.renderUser();
    chitChatApp.renderMessage();
  },
  initEvents: function(){


    $('.login').on('submit', function(event){
      event.preventDefault();
      // create object for each user with user info and messages
        var newUser = {
          user: {
                name: $(this).find('input[name="newUser"]').val(),
                // id: cookies, or just use the _id from server? This would later be saved in local storage
                }
        };

      chitChatApp.createUser(newUser);

      //store user info to local storage
      // need to add script
    });


    $('#createNewMessage').on('submit', function (event) {
      event.preventDefault();

      //need to get user profile via itemid (?), so we can add new message into that object


      var newChatMessage = {
        user: {
          name: //check,
          messages: $(this).find('input[name="newMessage"]').val()
        }
      };

      chitChatApp.createMessage(//userid, newChatMessage);

    });


}




  },




    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections/chitChat'
    },

    //do we need renderAllUsers?

    renderUser: function() {
    $.ajax({
      url: chitChatApp.config.url,
      type: 'GET',
      success: function (user) {
        var template = _.template(templates.userList);
        var markup = "";
        user.forEach(function(item, idx, arr){
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
        user.renderUser();
      },
      error: function (err) {
        console.log(err);
      }
    });
    $('input').val('');

  },

//do we need renderAllUsers?

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


  createMessage: function (newMessage) {  //id, msg instead of newMessage?
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
