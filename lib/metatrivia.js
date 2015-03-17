if (Meteor.isClient) {
  // This code only runs on the client

  // Helper to submit the questions into the database
  Template.submitQuestions.events({
    "submit .submitted-question": function (event) {
      // This function is called when the question submission form is submitted

      var question = event.target.question.value;
      var answer1 = event.target.answer1.value;
      var answer2 = event.target.answer2.value;
      var answer3 = event.target.answer3.value;
      var answer4 = event.target.answer4.value;

      // Indicating which answer is correct
      var isAnswer1 = false;
      var isAnswer2 = false;
      var isAnswer3 = false;
      var isAnswer4 = false;

      if ($('#isAnswer1').is(':checked')) {
        isAnswer1 = true;
      }

      if ($('#isAnswer2').is(':checked')) {
        isAnswer2 = true;
      }

      if ($('#isAnswer3').is(':checked')) {
        isAnswer3 = true;
      }

      if ($('#isAnswer4').is(':checked')) {
        isAnswer4 = true;
      }

      //insert user submitted questions into the database
      Questions.insert({
        question: question,
        answers: [
          {text: answer1, isAnswer : isAnswer1},
          {text: answer2, isAnswer : isAnswer2},
          {text: answer3, isAnswer : isAnswer3},
          {text: answer4, isAnswer : isAnswer4}
          ],
        createdAt: new Date(), // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username  // username of logged in user
      });

      // Clear form
      $('.submitted-question')[0].reset();

      // Prevent default form submit
      return false;
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}