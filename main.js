// NPM packages
var fs = require("fs");
var inquirer = require('inquirer');
// Constructor links
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
//Handles the game starting to select basic or cloze
var startFlash = function() {

	//Inquire to select which flash
	inquirer.prompt([

	{
		name: "start",
		message: "Select a Quiz Type",
		type: "list",
		choices: ["Take a Basic Quiz", "Take a Cloze Quiz"]
	}

	]).then(function (answers) {

		// console.log("you got to startflash promise");
		// console.log(answers.start);

		//switch to handle what is selected
		switch (answers.start) {

			case "Take a Basic Quiz":
				basicFlash(0);
				break;

			case "Take a Cloze Quiz":
				clozeFlash(0);
				break;

			default:
				console.log("Opps, you broke it");	
		}

		// Used to clear terminal window
		console.log('\033[2J');

	});

};

var basicFlash = function (count) {

	fs.readFile("./basic.json", "utf8", function(error, data) {

		if (error) throw error;
		var score = 0;
		var test = JSON.parse(data);
		if (count < test.length) {

			inquirer.prompt([

			{
				name: "question",
				message: test[count].front + "\nAnswer:",
				type: "input",
			}

			]).then(function(answers) {

				if (answers.question.toLowerCase() === test[count].back.toLowerCase()) {
					console.log("--------------------------------------------------------------");
					console.log("You are correct!");
					console.log("--------------------------------------------------------------");
					count++;
					score++
					basicFlash(count);
				} else {
					console.log("--------------------------------------------------------------");
					console.log("Incorrect! The answer is '" + test[count].back + "'");
					console.log("--------------------------------------------------------------");
					count++;
					basicFlash(count);
				}
			});

		} else if (count == test.length) {

			console.log("Game Over!");
			console.log("You got " + score + " out of " + test.length + " correct.");

			inquirer.prompt([

			{
				name: "playAgain",
				message: "Play Again?",
				type: "input",
			}

			]).then(function(answers) {

				// if yes then run startflash
				// else exit

			});



		} else {

			console.log("TBD");

		}
	});
};


var clozeFlash = function (count) {

	fs.readFile("./cloze.json", "utf8", function(error, data) {

		if (error) throw error;
		var test = JSON.parse(data);
		if (count < test.length) {

			var newClozeCard = new ClozeCard(test[count].text, test[count].cloze);

			inquirer.prompt([

			{
				name: "question",
				message: newClozeCard.dotText(),
				type: "input"
			}

			]).then(function(answers) {

				if (answers.question.toLowerCase() === newClozeCard.cloze.toLowerCase()) {
					console.log("-------------------------------");
					console.log("Correct");
					console.log("-------------------------------");
					count++;
					clozeFlash(count);
				} else {
					console.log("-------------------------------");
					console.log("Incorrect");
					console.log("-------------------------------");
					count++;
					clozeFlash(count);
				}
			});
		}
	});
};

startFlash();