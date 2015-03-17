if (Meteor.isClient) {
    // This code only runs on the client

    //  Returns a list of the quesitons in the database
    Template.submitQuestions.helpers({
        questions: function () {
            return Questions.find({});
        }
    });

    Template.homePage.events({
        "click .start": function () {
            var firstRecord = Questions.find({}, {sort: {createdAt: 1}, limit:1}).fetch();
            window.location.href = "/quiz/" + firstRecord[0]._id;
        }
    });

    // Helper to submit the questions into the database
    Template.submitQuestions.events({
        "submit .submitted-question": function (e) {
            // This function is called when the question submission form is submitted

            var question = e.target.question.value;
            var answer1 = e.target.answer1.value;
            var answer2 = e.target.answer2.value;
            var answer3 = e.target.answer3.value;
            var answer4 = e.target.answer4.value;

            // Indicating which answer is correct
            var isAnswer1 = false;
            var isAnswer2 = false;
            var isAnswer3 = false;
            var isAnswer4 = false;

            if ($('#isAnswer1').is(':checked')) {isAnswer1 = true;}
            if ($('#isAnswer2').is(':checked')) {isAnswer2 = true;}
            if ($('#isAnswer3').is(':checked')) {isAnswer3 = true;}
            if ($('#isAnswer4').is(':checked')) {isAnswer4 = true;}

            //insert user submitted questions into the database
            Questions.insert({
                question: question,
                answers: [
                    {text: answer1, isAnswer: isAnswer1},
                    {text: answer2, isAnswer: isAnswer2},
                    {text: answer3, isAnswer: isAnswer3},
                    {text: answer4, isAnswer: isAnswer4}
                ],
                createdAt: new Date(),
                owner: Meteor.userId(),           // _id of logged in user
                username: Meteor.user().username  // username of logged in user
            });

            // Clear form
            $('.submitted-question')[0].reset();

            // Prevent default form submit
            return false;
        }
    });

    Template.answerQuestion.events({

        "click .next": function (e) {
            var baseURL = e.target.baseURI;
            var parts = baseURL.split('/');
            var questionID = parts[parts.length-1];
            var current = Questions.findOne(questionID);
            var nextRecord = Questions.find({createdAt: {$gt: current.createdAt}}, {sort: {createdAt: 1}, limit:1}).fetch();
            if (nextRecord.length > 0) {
                window.location.href = "/quiz/" + nextRecord[0]._id;
            } else {
                window.location.href = "/results";
            }
        },

        // "click .back": function (e) {
        //     var baseURL = e.target.baseURI;
        //     var parts = baseURL.split('/');
        //     var questionID = parts[parts.length-1];
        //     var current = Questions.findOne(questionID);
        //     var backRecord = Questions.find({createdAt: {$lt: current.createdAt}}, {sort: {createdAt: -1}, limit:1}).fetch();
        //     if (backRecord.length > 0) {
        //         window.location.href = "/quiz/"+backRecord[0]._id;
        //     } else {
        //         window.location.href = "/done";
        //     }
        // }

        // here i'll want an event handler to be able to check if the answer is correct
        // "click .": function (e) {
        //1. see if answer is correct
        //2. display a message is it's correct
        //3. insert the userId, questionId, and isCorrect into userQuestion collection
        "click .answer": function (e) {
            if(this.isAnswer === true) {
            $(".message").html("<h1 style='color: green; font-weight: bold; text-align: center;'>CORRECT!</h1>");
                var baseURL = e.target.baseURI;
                var parts = baseURL.split('/');
                var urlID = parts[parts.length-1];
                var questionCount = UserAnswers.find({questionID: urlID}).count();  //filter: UserQuestions.find({userID: Meteor.userId}).count();
                if(questionCount === 0) {
                    UserAnswers.insert({
                        userId: Meteor.userId(),
                        questionID: questionID
                    });
                }
            } else {
            $(".message").html("<h1 style='color: red; font-weight: bold; text-align: center;'>WRONG!</h1>");
            }


        // Insert the userId, questionId, and isCorrect into userQuestion collection
        }
    });


}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}