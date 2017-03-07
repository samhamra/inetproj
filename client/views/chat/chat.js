
Template.chat.helpers({
  testing: function(data) {
    console.log(data);
  }
})
Template.chat.events({
  'submit form': function(event){
    event.preventDefault();
    var message = event.target.message.value;
    console.log(event.target.message.value);
    Meteor.userId();
    Meteor.call('sendChatMessage', Meteor.user(), 'main', message);
    event.target.message.value="";
  }
})
