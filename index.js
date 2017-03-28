// var users = require('./users'); เลิกใช้ไฟล์ users
var mongojs = require('./db');
var db = mongojs.connect;

var app = require('express')();
var bodyParser = require('body-parser');
var port = process.env.PORT || 7777;

//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req,res){
	res.send('<h1>Hello Node.js</h1>');
});

app.get('/index', function(req,res){
	res.send('<h1>This is index page</h1>');
});

app.get('/user',function(req,res){
	db.employee.find(function(err, docs) {
        res.json(docs);
    });
});

app.get('/user/:username',function(req,res){
	var username = req.params.username;
	console.log('find by user = '+username+'123');
	db.employee.find({username: username}, function(err, docs) {
		res.json(docs);
	});
});

app.post('/newuser',function(req,res){
	var json = req.body;
	db.employee.insert(json, function(err, docs) {
		// insert new data.
		res.send('Add new ' + docs.name + ' Completed!');
	});
});

app.listen(port,function(){
	console.log('Starting node.js on port ' + port);
});