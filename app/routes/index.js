'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');
var OptHandler = require(path + '/app/controllers/optHandler.server.js');
var PublicHandler = require(path + '/app/controllers/publicHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	function publicInfo (req, res, next) {
		//if (req.isAuthenticated()) {
			return next();
		//} else {
		//	res.redirect('/login');
		//}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	var optHandler = new OptHandler();
	var publicHandler = new PublicHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/:id/polls')
		.get(isLoggedIn, pollHandler.getPolls);
		
	app.route('/api/:id/polls/add/*')
		.post(isLoggedIn, pollHandler.addPoll);

	app.route('/api/:id/polls/del/*')
		.delete(isLoggedIn, pollHandler.resetPolls);
	
		
	app.route('/api/:id/pollsopt')
		.get(isLoggedIn, optHandler.getPolls);
		
	app.route('/api/:id/pollsopt/addopt/*/*')
		.post(isLoggedIn, optHandler.addOpt);

	app.route('/api/:id/pollsopt/delopt/*/*')
		.delete(isLoggedIn, optHandler.resetOpt);
		
	app.route('/api/:id/pollsopt/onlypoll/*')
		.get(isLoggedIn, optHandler.getOptsOnlyPoll);
		
		
	app.route('/api/:id/public')
		.get(publicInfo, publicHandler.getPolls);
		
	app.route('/api/:id/publicopt/*')
		.get(publicInfo, publicHandler.getOpts);
		
	app.route('/api/:id/public/vote')
		.post(publicInfo, publicHandler.getPolls);
		
	app.route('/public/chart/')
		//.post(publicInfo, publicHandler.getPolls);
		.get(publicInfo,function (req, res) {
			//res.sendFile(path + '/public/chart.html');
			res.sendFile(path + '/public/chartpie.html');
			//res.sendFile(path + '/node_modules/chart.js/samples/charts/pie.html');
		});
};
