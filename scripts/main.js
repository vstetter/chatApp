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

};
