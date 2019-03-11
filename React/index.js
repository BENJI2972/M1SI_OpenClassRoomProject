const express = require('express');
require("amd-loader");
const path = require('path');
const mariaDb_Operations = require('./MariaDb_Operations');
const mariaDb = new mariaDb_Operations.MariaDb_Operations('obiwan2.univ-brest.fr','zfl3-zquillivi', 'zquillivi', 'hcgbhhhb');
const mongoDB_Operations = require('./MongoDB_Operations');

//let url = 'mongodb://localhost:27017'; // alex home
//let dbName = 'alexsi'; // alex home
//let collectionName = "oeuvres"; // alex home
let url = 'mongodb://localhost:27017'; // alex obiwan2
let dbName = 'M1_MAILLIU_Alexandre'; // alex obiwan2
let collectionName = "oeuvres"; // alex obiwan2
let mongodb = new mongoDB_Operations.MongoDB_Operations(url, dbName, collectionName);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));

// List of api's endpoint that returns a short list of items

app.get('/api/getList', (req,res) => {
	let list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

app.post('/connexion', function(req, res) {
    //console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    let listUtilisateur = [21, "oto", "matic", "machine", "pass"];
    mariaDb.connexionMariaDb(mariaDb.listerOneUser, listUtilisateur,
			(list) => {
				console.log(list)
				let tab = list;
				let testConnect = false;
				for (let i = 0; i < tab.length; i++){
					console.log(tab[i]);
					console.log("id : "+tab[i].u_idUtilisateur);
					console.log("username : "+tab[i].u_identifiant);
					console.log("password : "+tab[i].u_password);
					if(tab[i].u_identifiant==req.body.username){
						if(tab[i].u_password==req.body.password){
							res.json("Connexion reussi: Bonjour "+req.body.username);
							console.log("OK");
							testConnect = true;
						}
					}
				}
			if(!testConnect){
				console.log("echec connexion ");
				res.json("echec de la connexion : inconnu au bataillon, soldat");
			}
		});
});

app.get('/user/:id', (req,res,next) => {
    let listUtilisateur = [req.params.id];
	mariaDb.connexionMariaDb(mariaDb.listerOneUser, listUtilisateur,
				(list)=> {
						console.log(list);
						res.json(list);
						console.log('Sent list of items');
				}
				);
});

// lessonList : shows the list of all lesson in a single view
app.get('/lessonlist', (req,res) => {
	mongodb.connectionMongoDB(mongodb.findDocuments, {},
		(list)=> {console.log(list);
		res.json(list);
		console.log('Sent list of items');
	});
});

// lessondetail : shows the lesson detailled view
app.get('/lessondetail/:lesson_id/:chapter_id', (req,res) => {
	mongodb.connectionMongoDB(mongodb.findDocuments, {_id: req.params.lesson_id + ""},
		(list)=> {console.log(list);
		res.json(list);
		console.log('Sent list of items');
	});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 3132;
app.listen(port);

console.log('App is listening on port ' + port);
