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
				clozeFlash();
				break;

			default:
				console.log("Opps, you broke it");	
		}

	});

};

var basicFlash = function (count) {

	// console.log("got to basicflash");

	//Read JSON file
	fs.readFile("./basic.json", "utf8", function(error, data) {

		if (error) throw error;

		// console.log(data);

		var test = JSON.parse(data);
		// console.log(test);
		// console.log(test[count]);
		console.log(test[0].front);	

		console.log("count: " + count);	

		if (count < test.length) {

			console.log("got inside if statment")

			inquirer.prompt([

			{
				name: "question",
				message: test[count].front,
				type: "input"
			}

			]).then(function(answers) {

				console.log("-------------------------------");
				console.log("got inside basicflash promise");
				count++;
				console.log(count);

			});
		}
	});
};










var clozeFlash = function() {

	console.log("got to clozeflash");
	//Read JSON file
	//Inquire to answer questions

};

startFlash();