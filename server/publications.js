Meteor.publish('topics', function() {
  return Topics.find();
});
Meteor.publish('topic', function(currentTopic) {
  return Topics.find({_id: currentTopic});
})
Meteor.publish('onlineUsers', function() {
  return Meteor.users.find({"status.online": true})
})
