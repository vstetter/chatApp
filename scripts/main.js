$(document).ready(function(){
  user.init();

});


var user = {
  init: function(){
    user.initEvents();
    user.initStyling();
  },
  initStyling: function(){
    user.renderUser();
  },
  initEvents: function(){


    $('.login').on('submit', function(event){
      event.preventDefault();
        var newUser = {
          user: $(this).find('input[name="newUser"]').val()
        };
      user.createUser(newUser);
    });
  },

    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections/chitChat'
    },

    renderUser: function() {
    $.ajax({
      url: user.config.url,
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
      url: user.config.url,
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

  }

  // ---start create and render message in .chatArea ---//

  //initStyling:
  initStyling: function () {
    toDoList.rendertoDoListItem();
  },

  //imitEVents:


  $('#createItem').on('submit', function (event) {
    event.preventDefault();
    var newToDoItem = {
      toDoItem: $(this).find('input[name="newItem"]').val()
    };
    toDoList.createtoDoListItem(newToDoItem);

  });




  rendertoDoListItem: function () {
    $.ajax({
      url: toDoList.config.url,
      type: 'GET',
      success: function (toDoList) {
        console.log(toDoList);
        var template= _.template($('#toDoTmpl').html());
        var markup = "";
        toDoList.forEach(function (item, idx, arr) {
          markup += template(item);
        });
        console.log('markup is ...', markup);
        $('.ActualList').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },


  createMessage: function (listItem) {
    $.ajax({
      url: toDoList.config.url,
      data: listItem,
      type: 'POST',
      success: function (data) {
        console.log(data);
        toDoList.rendertoDoListItem();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },




};
