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
  name: 'account'
})
