// Fichier de test pour affichage de page et mongoDB

var http = require('http');

//=============== Partie test =====================

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
});

//=============== Partie test =====================


//=============== Partie MongoDB =====================
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//const url = 'mongodb://master015:as12rm5a@obiwan2.univ-brest.fr';
const url = 'mongodb://obiwan2.univ-brest.fr';
const dbName = 'M1_HUSSON_Benjamin';
/*

const findDocuments = function(db, callback){
	const collection = db.collection('oeuvres');

	collection.find({}).toArray((err, items) => {
		console.log(items);
	})
*/
const findDocuments = function(db, callback){
	const collection = db.collection('oeuvres');

	collection.find({}).toArray(function(err, docs){
		assert.equal(err, null);
		console.log("========== Found the following mongoDB records ===========");
		console.log(docs);
		console.log("========== End of \"found the following mongoDB records\" ===========");
		callback(docs);
	});
}


MongoClient.connect(url, function(err, client){
	assert.equal(null, err);
	console.log("connected successfully to sever");
	const db = client.db(dbName);
	
	findDocuments(db, function(){
		client.close();
	});

});
//=============== Partie MongoDB =====================


//=============== Partie Neo4j =====================
var neo4j = require('neo4j');
//var db = new neo4j.GraphDatabase('http://username:password@localhost:7474');
var db = new neo4j.GraphDatabase('http://neo4j:neo4j@127.0.0.1:7687');

db.cypher({
    query: 'MATCH (u:User {email: {email}}) RETURN u',
    params: {
        email: 'alice@example.com',
    },
}, function (err, results) {
    if (err)throw err;
    var result = results[0];
    if (!result) {
        console.log('No user found.');
    } else {
        var user = result['u'];
        console.log(JSON.stringify(user, null, 4));
    }
});

//=============== Partie Neo4j =====================
function test(){
	console.log("coucou");
}

test();

server.listen(8840);
