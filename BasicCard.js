var inquirer = require('inquirer');

function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

var question1 = new BasicCard("Who was the 7th president of the United States?", "Andrew Jackson");
var question2 = new BasicCard("Who was the 30th president of the United States?", "Calvin Coolidge");
var question3 = new BasicCard("Who was the 40th president of the United States?", "Ronald Reagan");

inquirer.prompt([

		{
			type: "list",
			message: question1.front,
			choices: ["James Madison", "Zachary Taylor", "Andrew Jackson"],
			name: "q1"
		}, 
		{
			type: "list",
			message: question2.front,
			choices: ["Theodore Roosevelt", "Calvin Coolidge", "Herbert Hoover"],
			name: "q2"
		}, 
		{
			type: "list",
			message: question3.front,
			choices: ["Ronald Reagan", "George Bush", "Richard Nixon"],
			name: "q3"
		}, 

]).then(function(answers) {

    if (answers.q1 === question1.back) {
    	console.log("Yes, Andrew Jackson was the 7th president");
    } else {
    	console.log("No, Andrew Jackson was the 7th president");
    }

    if (answers.q2 === question2.back) {
    	console.log("Yes, Calvin Coolidge was the 30th president");
    } else {
    	console.log("No, Calvin Coolidge was the 30th president");
    } 

    if (answers.q3 === question3.back) {
    	console.log("Yes, Ronald Reagan was the 40th president");
    } else {
    	console.log("No, Ronald Reagan was the 40th president");
    }

});


module.exports = BasicCard;