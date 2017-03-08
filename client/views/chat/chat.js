import Streamer from '/imports/stream.js'
var chatMessageCollection = new Meteor.Collection(null);
Template.chat.helpers({
  testing: function() {
    return chatMessageCollection.find();
  }
})
Template.chat.events({
  'submit form': function(event){
    event.preventDefault();
    var message = event.target.message.value;
    event.target.message.value = "";
    Streamer.emit('chat', message, Meteor.user().username);
  },
  'keypress textarea': function(event) {
    if(event.which === 13) {
      console.log("enter");
      $("form[name='sendMessage']").submit();
    }
  }
})

Template.chat.onRendered(function() {
  chatMessageCollection.remove({})

  Streamer.on('chat', function(message, username) {
    var currentRoute = Router.current().route.getName();
    if(currentRoute === 'chat') {
      chatMessageCollection.insert({message: message, username: username})
      console.log("streamed")
      console.log(message);
    }
  })
})
