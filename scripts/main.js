$(document).ready(function(){
  user.init();

});


var user = {
  init: function(){
    user.initEvents();
  },
  initStyling: function(){},
  initEvents: function(){


    $('.login').on('submit', function(event){
      event.preventDefault();
        var newUser = {
          title: $(this).find('input[name="newUser"]').val()
        };
      user.createUser(newUser);
    });
  },

    config: {
      url: 'http://tiy-fee-rest.herokuapp.com/collections/chitChat'
    },


    createUser: function(newUser) {
      $.ajax({
      url: user.config.url,
      data: newUser,
      type: 'POST',
      success: function (data) {
        console.log(data, '', 'added!');
        // toDo.renderItem();
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
