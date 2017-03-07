Template.chat.helpers({
  Users: function() {
    return Meteor.users.find({"status.online": true})
  }
})

Template.chat.events({
  'submit form': function(event){
    event.preventDefault();
    console.log(event.target.message.value);

  }
})
