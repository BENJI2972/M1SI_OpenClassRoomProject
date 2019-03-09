//NON FONCTIONNEL POUR LE MOMENT


/**
 * node.js modules
 */
var assert = require('assert');
var neo4j = require('neo4j-driver').v1;


//connexion UBO
//const driver = neo4j.driver("bolt://obiwan2.univ-brest.fr:7687");

//Connection localhost
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "neo5j"));

/**
 * this class handles the CRUD basic operations to the neo4j database
 */
 
var Neo4jDB_Operations = (function () {
    function Neo4jDB_Operations(url) {
        this.url = url;
        console.log(url);
    }
    /**
     * connect to the neo4j database.
     * @param functionToDo is the function to call, it has to be a CRUD function
     * @param TabParam1 is the neo4j query, which is always in json format
     */
    Neo4jDB_Operations.prototype.connectionNeo4jDB = function (functionToDo, TabParam1) {
        var session = driver.session();
		
		// ce truc ne sert à rien il faut vérifier la connection lors d'une transaction
		if (session==null){
			console.log("Authentification failed");
		}else{
			console.log("Authentification succeed");
		}
		
		functionToDo(session, TabParam1, function () {
				console.log("Disconnection in progress");
				session.close();
            }); //miseAJourReact);
    };
    /**
     * read from the neo4j database.
     * @param session is the database reference
     * @param TabParam1 is the neo4j query, which is always in json format
     * @param callback is the callback function, called when this class finished its job
     */
    //Neo4jDB_Operations.prototype.CreerNoeud = function (session, TabParam1, callback, miseAJourReact) {
    Neo4jDB_Operations.prototype.CreerNoeud = function (session, TabParam1, callback) {
        console.log("Create")
		const NodeName=TabParam1[0];
		const param1=TabParam1[1];
		const param2=TabParam1[2];
		console.log("NodeName:"+ NodeName);
		console.log("param1:"+ param1);
		console.log("param2:"+ param2);
		
		try{
			const resultPromise = session.run(	
			'CREATE (n: '+NodeName+' {name:$param1, param2: $param2}) RETURN n',
			{param1:param1,param2:param2}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];
			  const node = singleRecord.get(0);

			  console.log(node);

			  // on application exit:
			  driver.close();
			});
			//console.log(resultPromise);
		}catch(error){
			console.error(error);
		}

	  callback();
      //miseAJourReact(resultPromise);
    };
	Neo4jDB_Operations.prototype.Suivant = function (session, TabParam2, callback) {
		console.log("Suivant")
		const NodeName=TabParam2[0];
		const param1=TabParam2[1];
		const param2=TabParam2[2];
		console.log("NodeName:"+ NodeName);
		console.log("param1:"+ param1);
		console.log("param2:"+ param2);
		
		try{
			const resultPromise = session.run(	
			'MATCH (a) <- [l:Suivant] -(n:'+NodeName+'{name:$param1,param2:$param2}) return n,l,a',
			{param1:param1,param2:param2}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];
			  
			  //On recupere le 3ème élément retourné, soit le noeud suivant
			  const node = singleRecord.get(2);

			  //console.log(node);
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      //miseAJourReact(resultPromise);
    };

	Neo4jDB_Operations.prototype.Creer_Link_Precedent = function (session, TabParam4, callback) {
		console.log("Creer_Precedent")
		const NodeName=TabParam4[0];
		const param1=TabParam4[1];
		const param2=TabParam4[2];
		console.log("NodeName:"+ NodeName);
		console.log("param1:"+ param1);
		
		try{
			const resultPromise = session.run(	
			'MATCH (n:'+NodeName+'),(m:'+NodeName+') WHERE n.id_Node=$param1 AND m.id_Node=$param2 CREATE(n)-[l:Precedent]->(m) RETURN n,m,l',
			{param1:param1,param2:param2}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];
			  
			  //On recupere le 3ème élément retourné, soit le link
			  const node = singleRecord.get(2);

			  //console.log(node);
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      //miseAJourReact(resultPromise);
    };
	
	Neo4jDB_Operations.prototype.Creer_Link_Suivant = function (session, TabParam5, callback) {
		console.log("Creer_Suivant")
		const NodeName=TabParam5[0];
		const param1=TabParam5[1];
		const param2=TabParam5[2];
		console.log("NodeName:"+ NodeName);
		console.log("param1:"+ param1);
		
		try{
			const resultPromise = session.run(	
			'MATCH (n:'+NodeName+'),(m:'+NodeName+') WHERE n.id_Node=$param1 AND m.id_Node=$param2 CREATE (n)-[l:Suivant]->(m) RETURN n,m,l',
			{param1:param1,param2:param2}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];
			  
			  //On recupere le 3ème élément retourné, soit le link
			  const node = singleRecord.get(2);

			  //console.log(node);
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      //miseAJourReact(resultPromise);
    };
	
	Neo4jDB_Operations.prototype.Precedent = function (session, TabParam2, callback) {
		console.log("Precedent")
		const NodeName=TabParam3[0];
		const param1=TabParam3[1];
		const param2=TabParam3[2];
		console.log("NodeName:"+ NodeName);
		console.log("param1:"+ param1);
		console.log("param2:"+ param2);
		
		try{
			const resultPromise = session.run(	
			'MATCH (n:'+NodeName+'{name:$param1,param2:$param2}) <- [l:Precedent] -(a) return n,l,a',
			{param1:param1,param2:param2}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];
			  
			  //On recupere le 3ème élément retourné, soit le noeud Precedent
			  const node = singleRecord.get(2);

			  //console.log(node);
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      //miseAJourReact(resultPromise);
    };
	
	
    return Neo4jDB_Operations;
}());
exports.Neo4jDB_Operations = Neo4jDB_Operations;

function Create_Node(){
	//let url ="bolt://obiwan2.univ-brest.fr:7474";
	let url ="bolt://localhost:7687";
	
	console.log("fonction Create_Node")

    let neo4jDB_Operations = new Neo4jDB_Operations(url);
	TabParam1=["Noeud_OK","Pablo","18"];
	//TabParam2=["Noeud_OK","Jojo","18"];
	//TabParam3=["Noeud_OK","Jojo","18"];
	TabParam4=["monNode","JS_C3","JS_C2"]; // le premier noeud est celui d'où part le lien
	TabParam5=["monNode","JS_C2","JS_C3"];


	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.CreerNoeud, TabParam1);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Suivant, TabParam2);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Precedent, TabParam3);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Creer_Link_Precedent, TabParam4);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Creer_Link_Suivant, TabParam5);
}
function Creer_Suivant(){
	let url ="bolt://localhost:7687";
	let neo4jDB_Operations = new Neo4jDB_Operations(url);

	TabParam5=["monNode","JS_C2","JS_C3"];
	neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Creer_Link_Suivant, TabParam5);

}

//test1();
Creer_Suivant();
