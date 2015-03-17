Meteor.publish('questions', function() {
	return Questions.find();
});

Meteor.publish('userAnswers', function() {
	return UserAnswers.find();
});