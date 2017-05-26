'use strict';


//Server side controller
//This controller will query or change our database, and update the API with the results.
//Export clickHandler (db)

var Users = require('../models/users.js');
//var Poll = require('../models/polls.js');


function PollHandler () {

	this.getPolls = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				//console.log(result);
				//result.polls.push("hola");
				res.json(result.polls);//Array
			});
	};

	this.addPoll = function (req, res) {
		console.log(req.originalUrl.toString().split("/add/")[1]);
		var pollName = req.originalUrl.toString().split("/add/")[1];
		
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'polls': { name:pollName, opt:[]} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.polls);
				}
			);
			
	};

	this.resetPolls = function (req, res) {
		console.log(req.originalUrl.toString().split("/del/")[1]);
		var pollName = req.originalUrl.toString().split("/del/")[1];
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: { 'polls': { name:pollName} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.polls);
				}
			);
	};

}

module.exports = PollHandler;
