'use strict';


//Server side controller
//This controller will query or change our database, and update the API with the results.
//Export clickHandler (db)

var Users = require('../models/users.js');



function OptHandler () {

	this.getPolls = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				//console.log(result.opts);
				//result.polls.push("hola");
				res.json(result.opts);//Array
			});
	};

	this.addOpt = function (req, res) {
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var pollName = req.originalUrl.toString().split("/addopt/")[1].split('/')[0];
		var optName = req.originalUrl.toString().split("/addopt/")[1].split('/')[1];
		console.log(pollName);
		console.log(optName);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'opts': { name:pollName, nameopt:optName, vote:0} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.polls);
				}
			);
			
	};

	this.resetOpt = function (req, res) {
		//console.log(req.originalUrl.toString().split("/del/")[1]);
		var pollName = req.originalUrl.toString().split("/delopt/")[1].split('/')[0];
		var optName = req.originalUrl.toString().split("/delopt/")[1].split('/')[1];
		//console.log(optName);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: { 'opts': { name:pollName, nameopt:optName} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.polls);
				}
			);
	};

}

module.exports = OptHandler;
