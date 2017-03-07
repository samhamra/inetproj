Meteor.publish('topics', function() {
  return Topics.find();
});
Meteor.publish('topic', function(currentTopic) {
  return Topics.find({_id: currentTopic});
})
Meteor.publish('onlineUsers', function() {
  return Meteor.users.find({"status.online": true})
})
Meteor.publish('mainChatRoom', function(date) {
  console.log(date)
  var hej = ChatRooms.aggregate([
    { $match: {'room': 'main'}},
    { $project: {
        list: {$filter: {
            input: '$messages',
            as: 'item',
            cond: {$gt: ['$$item.message.createdAt', date]}
        }}
    }}
])
  console.log(hej);

  return hej;
})
