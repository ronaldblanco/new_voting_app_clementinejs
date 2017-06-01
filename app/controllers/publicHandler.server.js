'use strict';


//Server side controller
//This controller will query or change our database, and update the API with the results.
//Export clickHandler (db)

var Users = require('../models/users.js');



function PublicHandler () {

	this.getPolls = function (req, res) {
		Users
			.find({}, {})
			.exec(function (err, result) {
				if (err) { throw err; }
				var final = [];
				result.forEach(function(user){
					user.polls.forEach(function(poll){
						final.push({'user': user.github.id,'poll':poll});
					});
					
				});
				//console.log(final);
				//result.polls.push("hola");
				res.json(final);//Array
			});
	};
	
	this.getOpts = function (req, res) {
		var pollName = req.originalUrl.toString().split("/:id/publicopt/")[1].split("_");
		//console.log(pollName);
		Users
			.find({'github.id':pollName[0]}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				var final = [];
				result.forEach(function(user){
					user.opts.forEach(function(opt){
						if(opt.name == pollName[1])final.push({'user': user.github.id,'opt':opt});
					});
					
				});
				//console.log(final);
				//result.polls.push("hola");
				res.json(final);//Array
			});
	};
	
	this.updateOpts = function (req, res) {
		var opt = req.originalUrl.toString().split("/:id/publicoptV/")[1].split("_");
		//console.log(opt);
		Users
			.findOneAndUpdate({ 'github.id': opt[0], 'opts.name': opt[1], 'opts.nameopt': opt[2] }, { $inc: { 'opts.$.vote': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }
					//console.log(result);
					res.json(result);
				}
			);
	};
	
	this.getChart = function (req, res) {
		var pollName = req.originalUrl.toString().split("/publicChart/")[1].split("_");
		//console.log(pollName);
		Users
			.find({'github.id':pollName[0]}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				var final = [];
				result.forEach(function(user){
					user.opts.forEach(function(opt){
						if(opt.name == pollName[1])final.push({'user': user.github.id,'opt':opt});
					});
					
				});
				console.log(final);
				//result.polls.push("hola");
				res.json(final);//Array
			});
	};
	
	/*this.getOptsOnlyPoll = function (req, res) {
		var pollName = req.originalUrl.toString().split("/onlypoll/")[1];
		console.log(pollName);
		//console.log(req);
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				var fresult = [];
				for(var a = 0; a < result.opts.length; a++){
					if(result.opts[a].name == pollName) fresult.push(result.opts[a]);
				}
				//res.json(result.opts);//Array
				res.json(fresult);//Array
			});
	};*/

	/*this.addOpt = function (req, res) {
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var pollName = req.originalUrl.toString().split("/addopt/")[1].split('/')[0];
		var optName = req.originalUrl.toString().split("/addopt/")[1].split('/')[1];
		//console.log(pollName);
		//console.log(optName);
		console.log(req.originalUrl);
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
	};*/

}

module.exports = PublicHandler;
