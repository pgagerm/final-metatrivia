Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [
  	Meteor.subscribe('questions'),
  	Meteor.subscribe('userAnswers')
  ]; }
});

Router.route('/', {name: 'homePage'});
Router.route('/add', {name: 'submitQuestions'});
Router.route('/quiz/:_id', {
   name: 'answerQuestion',
   data: function() { return Questions.findOne(this.params._id); }
});
Router.route('/results', {name: 'results'});

var requireLogin = function() {
	if (! Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: 'submitQuestions'});