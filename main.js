// NPM packages
var fs = require("fs");
var inquirer = require('inquirer');
// Constructor links
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
//Handles the game starting to select basic or cloze
var startFlash = function() {

	inquirer.prompt([

	{
		name: "start",
		message: "Select a Quiz Type",
		type: "list",
		choices: ["Take a Basic Quiz", "Take a Cloze Quiz"]
	}

	]).then(function (answers) {

		console.log("you got to startflash promise");

		switch (answers.startFlash) {

			//TBD

		}

	});



	//Inquire to select which flash
	//switch to handle what is selected

};

var basicFlash = function () {

	//TBD
	//Read JSON file
	//Inquire to answer questions

};

var clozeFlash = function() {

	//TBD
	//Read JSON file
	//Inquire to answer questions

};

startFlash();