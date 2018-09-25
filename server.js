var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var dbURL = "mongodb://localhost:27017/";

var app = express();

//middle to be able to parse form info.
app.use(bodyParser.urlencoded({extended: false}));

//serve all static pages.
app.use(express.static('./'));

//load thefoodie.html as the main page.
app.get("/", function(req,res){

	res.sendFile(__dirname + "/TheFoodie.html");
});

app.post("/create_food", function(req, res){

	console.log("post req received");

	
	//console.log(req.body.ateInDish + ", " + req.body.ateInInstructions);

	/*
	MongoClient.connect(dbURL, function(err, db){

		if(err) throw err;

		var dbInput = {dish: req.body.ateInDish, instrucion: req.body.ateInInstructions}

		//insert to database
		var dbObj = db.db("foodie");

		dbObj.collection("food").insertOne(dbInput, function(err, res){

			if(err) throw err;

			console.log("inserted!");
			db.close();
		});
	});
	*/

	//console log all database contents
	/*
	MongoClient.connect(dbURL, function(err, db) {
		if (err) throw err;

		var dbo = db.db("foodie");

		dbo.collection("food").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
		});

	});
	*/

	res.end();
});





app.listen(8080);


/*
http.createServer(function(req, res){


	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	var qdata = q.query;

	fs.readFile(filename, function(err, data) {

		if(err){

			res.writeHead(404, {'Content-Type' : 'text/html'});
			return res.end("404 Not Found");
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
  });
}).listen(8080);
*/
