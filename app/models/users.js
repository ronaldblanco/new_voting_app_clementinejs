'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
	polls: [{name:String}],
	opts: [{name:String, nameopt:String, vote: Number}],
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);
