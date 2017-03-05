import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  Meteor.users.remove({});
})

Meteor.methods({
  'createAUser': function(username, password) {
    console.log(username);
    console.log(password);
    Accounts.createUser({
      username: username,
      password: password,
      profile: {name: username}
    })
  }
});
