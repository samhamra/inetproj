import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  Meteor.users.remove({});
  var uid = Accounts.createUser({
    username: 'admin',
    password: 'admin',
    profile: {name: 'GOD'}
  })
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
  }
});
