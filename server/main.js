import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Streamer from '/imports/stream.js';
Meteor.startup(() => {
Streamer.allowRead('all');
Streamer.allowWrite('all');
Streamer.allowEmit('all');

  Meteor.users.remove({});
  Topics.remove({});
  var uid = Accounts.createUser({
    username: 'admin',
    password: 'admin',
    profile: {name: 'GOD'}
  })
  ChatRooms.remove({})
  ChatRooms.insert({room: 'main', messages: []})
  ChatRooms.insert({room: 'room72', messages: []})
  Roles.setUserRoles(uid, 'admin');

})

Meteor.methods({
  'createAUser': function(username, password) {
    console.log(username);
    console.log(password);
    var uid = Accounts.createUser({
      username: username,
      password: password,
      profile: {name: username}
    })
    Roles.setUserRoles(uid, 'member')
  },
  'createTopic': function(user, title, message) {
    return Topics.insert({title: title, message: message, author: user, createdAt: new Date(), posts: [], views: 0 })
  },
  'deleteTopic': function(id) {
    Topics.remove(id);
  },
  'editTopic': function(topicId, message) {
    console.log("update topic")
    var hej = Topics.update({_id: topicId}, {$set: {message: message, edited: new Date()}});
    console.log(hej);
  },
  'updateViewCount': function(topicId) {
    Topics.update({_id: topicId}, {$inc: {views: 1}})
  },
  'createPost': function(user, message, topicId) {
    Topics.update({_id: topicId}, {$push: {posts: {_id: Random.id(), message: message, author: user, createdAt: new Date()}}})
  },
  'deletePost': function(topicId, postId) {
    Topics.update({_id: topicId}, {$pull: {posts: {_id: postId}}})
  },
  'editPost': function(topicId, postId, message){
    Topics.update({_id: topicId, 'posts._id': postId}, {$set: {'posts.$.message': message, 'posts.$.edited': new Date()}})
  },
  'sendChatMessage': function(user, room, message) {
    ChatRooms.update({room: 'main'}, {$push: {messages: {_id: Random.id(), message: message, user: user._id, createdAt: new Date()}}})
    console.log("ChatRooms updated")
  }
});
