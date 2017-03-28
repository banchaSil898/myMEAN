var mongojs = require('mongojs');
var databaseUrl = 'company';
var collections = ['employee'];

var connect = mongojs(databaseUrl,collections);

module.exports = {
	connect:connect
};