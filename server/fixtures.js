// if (Questions.find().count() === 0) {
// // if no Questions in the database, then seed the database

// 	Questions.insert({
//     	question : "Which is correct?",
//     	answers  : [
//     		{text: "!DOCTYPE html",  isAnswer : true},
//        	{text: "DOCTYPE! html",  isAnswer : false},
//        	{text: "DOCTYPE! html!", isAnswer : false},
//         	{text: "DOCTYPE html!",  isAnswer : false}
//     	],
//     	createdAt: new Date(),
//     	//owner    : Meteor.userId(),
//     	//username : Meteor.user().username
//   	});

// 	Questions.insert({
//     	question : "Which HTML element is not a valid tag?",
//     	answers  : [
//         	{text: "html", isAnswer : false},
//         	{text: "d",    isAnswer : true},
//         	{text: "b",    isAnswer : false},
//         	{text: "form", isAnswer : false}
//     	],
//     	createdAt: new Date(),
//     	//owner    : Meteor.userId(),
//     	//username : Meteor.user().username
//   	});

//   	Questions.insert({
//     	question : "What year did Tim Berners-Lee invent HTML?",
//     	answers  : [
//         	{text: "1987", isAnswer : false},
//         	{text: "1989", isAnswer : false},
//         	{text: "1991", isAnswer : true},
//         	{text: "1993", isAnswer : false}
//     	],
//     	createdAt: new Date(),
//     	//owner    : Meteor.userId(),
//     	//username : Meteor.user().username
//   	});

// }