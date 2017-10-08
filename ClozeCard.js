var fs = require("fs");

var ClozeCard = function(text, cloze) {
	this.text = text;
	this.cloze = cloze;
}

module.exports = ClozeCard;