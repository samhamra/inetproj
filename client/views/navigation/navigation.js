Template.navigation.events({
  'click .logout': function(event) {
    Meteor.logout();
    Router.go('main');
  }
})
