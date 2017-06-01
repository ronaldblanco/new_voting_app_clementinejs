var fs = require('fs');
var _ = require('lodash');
var auth = require('basic-auth');

// Default config
var config = {
    "realm": "ShareIt",
    "port": 3000,
    "root": ".",
    "ssl": { "certificate": "ssl/server.crt", "privateKey": "ssl/server.key"},
    "users": [ { "name": "admin", "pass": "demo" } ],
    "log": { filename: 'shareit.log', json: false, prettyPrint: true }
};
// Create logger
var winston = require('winston');
var logger = new winston.Logger({
    level: 'info',
    transports: [ new (winston.transports.Console)()]
});
// Check configuration file
try{
    config = _.extend(config, JSON.parse(fs.readFileSync('shareit.json', 'utf8')));
    logger.info('Configuration file "shareit.json" found...');
}catch(ex) {
    logger.info('Configuration file not found, use standard config...');
}
// Add file log
if (config.log){
    logger.info('Add log file "' + config.log.filename + '"...');
    logger.add(winston.transports.File, config.log);
}
// Load credentials
try{
    var privateKey  = fs.readFileSync(config.ssl.privateKey, 'utf8');
    var certificate = fs.readFileSync(config.ssl.certificate, 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    logger.info('Credentials for https created...');
}catch(ex) {
    logger.warn('Credentials not found, use http...');
}

var express = require('express');
var app = express();

// auth check on all request
var authCheck = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=' + config.realm);
        return res.sendStatus(401);
    }
    var user = auth(req);
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }
    for (var i = 0; i < config.users.length; i++) {
        if (config.users[i].name.toLowerCase() === user.name.toLowerCase() && config.users[i].pass === user.pass) {
            req.user = config.users[i];
            return next();
        }
    }
    return unauthorized(res);
};
app.all('*', authCheck);
// log on all request
var logRequest = function (req, res, next){
    logger.info(req.user.name + ' GET ' +req.originalUrl);
    next();
};
app.all('*', logRequest);
var absolutePath = require('path').resolve(config.root);
logger.info('Share directory "' + absolutePath + '"...');
// share directory list and sub-dir
app.use('/', require('serve-index')(absolutePath, {'icons': true, 'view': 'details'}));
// share files
app.use('/', express.static(absolutePath, {'index': false }));
// start server
if (credentials){
    logger.info('Start https server on port ' + config.port + '...');
    var https = require('https');
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.port);
}else{
    logger.info('Start http server on port ' + config.port + '...');
    var http = require('http');
    var httpServer = http.createServer(app);
    httpServer.listen(config.port);
}
