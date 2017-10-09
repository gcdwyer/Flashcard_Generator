// NPM packages
var fs = require("fs");
var inquirer = require('inquirer');
// Constructor links
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
// tracks correct answers
var score = 0;

//Handles the game starting to select basic or cloze
var startFlash = function() {

	// Used to clear terminal window
	console.log('\033[2J');

	//Inquire to select which flash
	inquirer.prompt([

	{
		name: "start",
		message: "Select a Quiz Type",
		type: "list",
		choices: ["Take a Basic Quiz", "Take a Cloze Quiz"]
	}

	]).then(function (answers) {

		//switch to handle what is selected
		switch (answers.start) {
			// runs basic flash cards
			case "Take a Basic Quiz":
				basicFlash(0);
				break;
			// runs cloze flash cards
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
// Handles when basic flash is selected
var basicFlash = function (count) {
	// reads the JSON file
	fs.readFile("./basic.json", "utf8", function(error, data) {

		if (error) throw error;
		
		var questionInfo = JSON.parse(data);
		// if current quesiton is less than total
		if (count < questionInfo.length) {
			// prompt user to answer questions
			inquirer.prompt([

			{
				name: "question",
				message: questionInfo[count].front + "\nAnswer:",
				type: "input",
			}

			]).then(function(answers) {
				// if user input = answer score +1
				if (answers.question.toLowerCase() === questionInfo[count].back.toLowerCase()) {
					console.log("--------------------------------------------------------------");
					console.log("You are correct!");
					console.log("--------------------------------------------------------------");
					count++;
					score++
					basicFlash(count);
				} else {
					console.log("--------------------------------------------------------------");
					console.log("Incorrect! The answer is '" + questionInfo[count].back + "'");
					console.log("--------------------------------------------------------------");
					count++;
					basicFlash(count);
				}
			});
		// if last question, ask to play again and show score	
		} else if (count == questionInfo.length) {

			console.log("Game Over!");
			console.log("You got " + score + " out of " + questionInfo.length + " correct.");

			inquirer.prompt([

			{
				name: "again",
				message: "Play Again?",
				type: "confirm" // confirm returns a boolean
			}

			]).then(function(answers) {
				
				if (answers.again === true) {
					score = 0;
					startFlash();
				} else {
					process.exit()
				}

			});

		} else {
			// Failover incase game gets in weird state
			startFlash();
		}
	});
};

// Handles when cloze flash is selected
var clozeFlash = function (count) {
	// reads the JSON file
	fs.readFile("./cloze.json", "utf8", function(error, data) {

		if (error) throw error;
		var questionInfo = JSON.parse(data);
		// if current quesiton is less than total
		if (count < questionInfo.length) {
			// new object created from the clozecard constructor
			var newClozeCard = new ClozeCard(questionInfo[count].text, questionInfo[count].cloze);
			// prompt user to answer questions
			inquirer.prompt([

			{
				name: "question",
				message: newClozeCard.dotText() + "\nAnswer:",
				type: "input"
			}

			]).then(function(answers) {
				// if user input = answer score +1
				if (answers.question.toLowerCase() === newClozeCard.cloze.toLowerCase()) {
					console.log("--------------------------------------------------------------");
					console.log("You are correct!");
					console.log("--------------------------------------------------------------");
					count++;
					score++
					clozeFlash(count);
				} else {
					console.log("==============================================================");
					console.log("Incorrect! The answer is '" + newClozeCard.cloze + "'");
					console.log("==============================================================");
					count++;
					clozeFlash(count);
				}
			});
		// if last question, ask to play again and show score
		} else if (count == questionInfo.length) {

			console.log("Game Over!");
			console.log("You got " + score + " out of " + questionInfo.length + " correct.");

			inquirer.prompt([

			{
				name: "again",
				message: "Play Again?",
				type: "confirm" // confirm returns a boolean
			}

			]).then(function(answers) {
				
				if (answers.again === true) {
					score = 0;
					startFlash();
				} else {
					process.exit()
				}

			});

		} else {
			// Failover incase game gets in weird state
			startFlash();
		}
	});
};
// Runs the game
startFlash();