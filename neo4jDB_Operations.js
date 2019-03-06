//NON FONCTIONNEL POUR LE MOMENT


/**
 * node.js modules
 */
var assert = require('assert');
var neo4j = require('neo4j-driver').v1;

//connection UBO
//const driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687");

//Connection localhost
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo5j"));
var session = null;	

/*const driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687");
const session = driver.session();	*/
/**
 * this class handles the CRUD basic operations to the neo4j database
 */
 
var Neo4jDB_Operations = (function () {
    function Neo4jDB_Operations(url) {
        this.url = url;
        console.log(url);
    }
    /**
     * connect to the mongo database.
     * @param functionToDo is the function to call, it has to be a CRUD function
     * @param TabParam1 is the mongo query, which is always in json format
     */
    Neo4jDB_Operations.prototype.connectionNeo4jDB = function (functionToDo, TabParam1) {
    //Neo4jDB_Operations.prototype.connectionNeo4jDB = function (functionToDo, TabParam1, miseAJourReact) {
        session = driver.session();
		console.log("Authentification succeed");
		functionToDo(session, TabParam1, function () {
				console.log("Disconnection in progress");
                driver.close();
            }); //miseAJourReact);
    };
    /**
     * read from the mongo database.
     * @param session is the database reference
     * @param TabParam1 is the mongo query, which is always in json format
     * @param callback is the callback function, called when this class finished its job
     */
    //Neo4jDB_Operations.prototype.CreerNoeud = function (session, TabParam1, callback, miseAJourReact) {
    Neo4jDB_Operations.prototype.CreerNoeud = function (session, TabParam1, callback) {
        console.log("Create")
		//On a les deux parametres
		const param0=TabParam1[0];
		const param1=TabParam1[1];
		console.log("param1:"+ param1);
		const resultPromise = session.run(	
		'CREATE (a:Noeud {id:$param1}) RETURN a', //requete pour créer un noeud ayant un nom (en dur ici) et un id: param1 
		{param1:param1}
	  ); 
	  callback();
      //miseAJourReact(resultPromise);
    };
    return Neo4jDB_Operations;
}());
exports.Neo4jDB_Operations = Neo4jDB_Operations;

function test1(){
	let url ="bolt://localhost:7687";
	console.log("fonction Test1")

    let neo4jDB_Operations = new Neo4jDB_Operations(url);
	TabParam1=["Noeud","Romain"];
	console.log(TabParam1[0]);
	console.log(TabParam1[1]);

	neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.CreerNoeud, TabParam1);
}

test1();

