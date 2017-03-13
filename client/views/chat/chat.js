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
    console.log("emit");
    Streamer.emit('chat', message, Meteor.user().username);
  },
  'keypress textarea': function(event) {
    if(event.which === 13) {
      console.log("enter");
      $("form[name='sendMessage']").submit();
    }
  }
})

Template.chat.onCreated(function() {

  chatMessageCollection.remove({})

  Streamer.on('chat', function(message, username) {
      chatMessageCollection.insert({message: message, username: username})
      console.log("ok")
      var chat = document.getElementById("chatboard");
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  })
  Meteor.call("joinChat", Meteor.userId())
})
Template.chat.onDestroyed(function() {
  Streamer.stop('chat')
  Meteor.call("leaveChat", Meteor.userId())

})

Template.chat.onRendered(function() {
  setInterval(function() {
  var chat = document.getElementById("chatboard");
  console.log("ok")
  var isScrolledToBottom = chat.scrollHeight - chat.clientHeight <= chat.scrollTop;
  console.log(isScrolledToBottom)
  if(isScrolledToBottom)
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }, 500)
})
