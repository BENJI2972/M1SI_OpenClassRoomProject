
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
     * @param TabParam table contains the parameters of the query
     */
    Neo4jDB_Operations.prototype.connectionNeo4jDB = function (functionToDo, TabParam1,miseAJourReact) {
        var session = driver.session();
		
		functionToDo(session, TabParam1, function () {
				console.log("Disconnection in progress");
				session.close();
            }); miseAJourReact);
    };
    /**
     * read from the neo4j database.
     * @param session is the database reference
     * @param TabParam table contains the parameters of the query
     * @param callback is the callback function, called when this class finished its job
     */
    Neo4jDB_Operations.prototype.CreerNoeud = function (session, TabParam, callback,miseAJourReact) {
        console.log("Create")
		const NodeName = TabParam[0];
		const Id_Node = TabParam[1];
		const _Id = TabParam[2];
		
		try{
			const resultPromise = session.run(	
			'CREATE (n: '+NodeName+' {Id_Node:$Id_Node, _Id: $_Id}) RETURN n',
			{Id_Node:Id_Node,_Id:_Id}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];
			  const node = singleRecord.get(0);

			  console.log(node);

			  // on application exit:
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      miseAJourReact(resultPromise);
    };
	
	Neo4jDB_Operations.prototype.Supprimer_Noeud = function (session, TabParam, callback,miseAJourReact) {
        console.log("Supprimer_Noeud")
		const NodeName = TabParam[0];
		const Id_Node = TabParam[1];
		const _Id = TabParam[2];
		console.log(Id_Node);
		console.log(_Id);
		try{
			const resultPromise = session.run(	
			'MATCH (a: '+NodeName+' {Id_Node:$Id_Node, _Id:$_Id}) DETACH DELETE a',
			{Id_Node:Id_Node,_Id:_Id}
			).then(result => {
			  session.close();


			  // on application exit:
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      miseAJourReact(resultPromise);
    };

	
	
	Neo4jDB_Operations.prototype.Creer_Link_Suivant = function (session, TabParam, callback,miseAJourReact) {
		console.log("Creer_Link_Suivant")
		const NodeName = TabParam[0];
		
		const Id_Node1 = TabParam[1];
		const Id_Node2 = TabParam[2];
		
		const _Id1 = TabParam[3];
		const _Id2 = TabParam[4];

		console.log(_Id1);
		try{
			const resultPromise = session.run(	
			'MATCH (n:'+NodeName+'),(m:'+NodeName+') WHERE n.Id_Node=$Id_Node1 AND m.Id_Node=$Id_Node2 AND n._Id=$_Id1 AND m._Id=$_Id2 CREATE (n)-[l:Suivant]->(m) RETURN n,m,l',
			{Id_Node1:Id_Node1,Id_Node2:Id_Node2,_Id1:_Id1,_Id2:_Id2}
			).then(result => {
			  session.close();

			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      miseAJourReact(resultPromise);
    };
	
	
	Neo4jDB_Operations.prototype.Creer_Link_Precedent = function (session, TabParam, callback,miseAJourReact) {
		console.log("Creer_Precedent")
		const NodeName = TabParam[0];
		
		const Id_Node1 = TabParam[1];
		const Id_Node2 = TabParam[2];
		
		const _Id1 = TabParam[3];
		const _Id2 = TabParam[4];

		try{
			const resultPromise = session.run(	
			'MATCH (n:'+NodeName+'),(m:'+NodeName+') WHERE n.Id_Node=$Id_Node1 AND m.Id_Node=$Id_Node2 AND n._Id=$_Id1 AND m._Id=$_Id2 CREATE(n)-[l:Precedent]->(m) RETURN n,m,l',
			{Id_Node1:Id_Node1,Id_Node2:Id_Node2,_Id1:_Id1,_Id2:_Id2}
			).then(result => {
			  session.close();

			driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      miseAJourReact(resultPromise);
    };
	
	
	
	Neo4jDB_Operations.prototype.Trouver_Noeud_Suivant = function (session, TabParam, callback,miseAJourReact) {
		console.log("Trouver_Noeud_Suivant")
		const NodeName = TabParam[0];
		
		const Id_Node = TabParam[1];
		
		const _Id = TabParam[2];
		
		try{
			const resultPromise = session.run(	
			'MATCH (a) <- [l:Suivant] -(n:'+NodeName+'{Id_Node:$Id_Node,_Id:$_Id}) return a',			
			{Id_Node:Id_Node,_Id:_Id}
			).then(result => {
			  session.close();

			 const singleRecord = result.records[0];
			 const node = singleRecord.get(0);

			  console.log(node);
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      miseAJourReact(resultPromise);
    };

	
	
	
	
	Neo4jDB_Operations.prototype.Trouver_Noeud_Precedent = function (session, TabParam, callback,miseAJourReact) {
		console.log("Trouver_Noeud_Precedent")
		const NodeName = TabParam[0];
		
		const Id_Node = TabParam[1];
		
		const _Id = TabParam[2];

		
		try{
			const resultPromise = session.run(	
			'MATCH (n:'+NodeName+'{Id_Node:$Id_Node,_Id:$_Id})- [l:Precedent] ->(a) return a',
			{Id_Node:Id_Node,_Id:_Id}
			).then(result => {
			  session.close();

			  const singleRecord = result.records[0];		  
			  const node = singleRecord.get(0);

			  console.log(node);
			  driver.close();
			});
		}catch(error){
			console.error(error);
		}

	  callback();
      miseAJourReact(resultPromise);
    };
	
	
    return Neo4jDB_Operations;
}());
exports.Neo4jDB_Operations = Neo4jDB_Operations;

function test1(){
	//let url ="bolt://obiwan2.univ-brest.fr:7474";
	let url ="bolt://localhost:7687";
	
    let neo4jDB_Operations = new Neo4jDB_Operations(url);
	
	//Creer_Noeud
	TabParam1=["brav_NodE","typescript_c1","1"];
	TabParam2=["brav_NodE","typescript_c2","1"];
	TabParam3=["brav_NodE","typescript_c3","1"];
	TabParam4=["brav_NodE","typescript_c4","2"];

	//Supprimer_Node
	TabParam5=["brav_NodE","typescript_c4","2"];
	
	//Creer_Link_Suivant
	TabParam6=["brav_NodE","typescript_c1","typescript_c2","1","1"];
	TabParam7=["brav_NodE","typescript_c2","typescript_c3","1","1"];
	
	//Creer_Link_Precedent
	TabParam8=["brav_NodE","typescript_c3","typescript_c2","1","1"];
		
	//Trouver_Noeud_Suivant
	TabParam9=["brav_NodE","typescript_c2","1"];
	
	//Trouver_Noeud_Precedent		
	TabParam10=["brav_NodE","typescript_c3","1"];
	
	
	
	

	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.CreerNoeud, TabParam1);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.CreerNoeud, TabParam2);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.CreerNoeud, TabParam3);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.CreerNoeud, TabParam4);
	
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Supprimer_Noeud, TabParam5);

	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Creer_Link_Suivant, TabParam6);
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Creer_Link_Suivant, TabParam7);

	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Creer_Link_Precedent, TabParam8);
	
	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Trouver_Noeud_Suivant, TabParam9);


	//neo4jDB_Operations.connectionNeo4jDB(neo4jDB_Operations.Trouver_Noeud_Precedent, TabParam10);

	
}


test1();

