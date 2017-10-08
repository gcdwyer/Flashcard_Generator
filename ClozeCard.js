var inquirer = require('inquirer');

function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze;
}

var question1 = new ClozeCard("... was the 7th president of the United States.", "Andrew Jackson");
var question2 = new ClozeCard("... was the 30th president of the United States.", "Calvin Coolidge");
var question3 = new ClozeCard("... was the 40th president of the United States.", "Ronald Reagan");

inquirer.prompt([

		{
			type: "input",
			message: question1.text,
			name: "q1"
		}, 
		{
			type: "input",
			message: question2.text,
			name: "q2"
		}, 
		{
			type: "input",
			message: question3.text,
			name: "q3"
		}, 

]).then(function(answers) {

    if (answers.q1 === question1.cloze) {
    	console.log("Yes, Andrew Jackson was the 7th president");
    } else {
    	console.log("No, Andrew Jackson was the 7th president");
    }

    if (answers.q2 === question2.cloze) {
    	console.log("Yes, Calvin Coolidge was the 30th president");
    } else {
    	console.log("No, Calvin Coolidge was the 30th president");
    } 

    if (answers.q3 === question3.cloze) {
    	console.log("Yes, Ronald Reagan was the 40th president");
    } else {
    	console.log("No, Ronald Reagan was the 40th president");
    }

});





module.exports = ClozeCard;