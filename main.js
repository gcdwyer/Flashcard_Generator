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
				basicFlash();
				break;

			case "Take a Cloze Quiz":
				clozeFlash();
				break;

			default:
				console.log("Opps, you broke it");	
		}

	});

};

var basicFlash = function () {

	console.log("got to basicflash");

	//Read JSON file
	fs.readFile("./basic.json", "utf8", function(error, data) {

		if (error) throw error;

		console.log(data);

		var test = JSON.parse(data);

		console.log(test);

	});

	//Inquire to answer questions

};

var clozeFlash = function() {

	console.log("got to clozeflash");
	//Read JSON file
	//Inquire to answer questions

};

startFlash();