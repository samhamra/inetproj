Meteor.publish('topics', function() {
  return Topics.find();
});
Meteor.publish('topic', function(currentTopic) {
  return Topics.find({_id: currentTopic});
})
Meteor.publish('forum', function() {
  return Meteor.users.find();
})
