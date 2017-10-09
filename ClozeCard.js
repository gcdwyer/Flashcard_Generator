var fs = require("fs");

var ClozeCard = function(text, cloze) {
	this.text = text;
	this.cloze = cloze;

	// this.dotText = function() {

	// 	var clozeText = this.text.replace(this.cloze, "...");

	// };


	//Method to replace answer by ...
	ClozeCard.prototype.dotText = function () {

		return this.text.replace(this.cloze, '...');

	}
}

module.exports = ClozeCard;