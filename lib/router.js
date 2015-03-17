Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('questions'); }
});

Router.route('/', {name: 'homePage'});
Router.route('/add', {name: 'submitQuestions'});
Router.route('/start', {name: 'quiz'});
Router.route('/quiz/:_id', {
   name: 'answerQuestion',
   data: function() { return Questions.findOne(this.params._id); }
});

// Router.route('/posts/:_id', {
//   name: 'postPage',
//   data: function() { return Posts.findOne(this.params._id); }
// });

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});