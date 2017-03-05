Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template: 'main',
  name: 'main'
})

Router.route('/register', {
  template: 'register',
  name: 'register'
})
Router.route('/login', {
  template: 'login',
  name: 'login'
})
Router.route('/account', {
  template: 'account',
  name: 'account',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.next();
    } else {
      this.render('login');
    }
  }})
Router.route('/forum', {
  template: 'forum',
  name: 'forum'
})
Router.route('/chat', {
  template: 'chat',
  name: 'chat',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.next();
    } else {
      this.render('login');
    }
}})
