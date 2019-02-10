
/**
 * node.js modules
 */
import assert = require('assert');
import mongodb = require('mongodb');

/**
 * this class handles the CRUD basic operations to the mongo database
 */
class MongoDB_Operations {
  
  /**
   * url is the mongodb URL
   */
  url: string;
  
  /**
   * dbName is the mongodb database name
   */
  dbName: string;
  
  /**
   * collectionName is the mongodb collection name
   */
  collectionName: string;

  constructor(url: string, dbName: string, collectionName: string) {
    this.url = url;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }
    
  /**
   * connect to the mongo database.
   * @param functionToDo is the function to call, it has to be a CRUD function
   * @param jsonQuery is the mongo query, which is always in json format 
   */
  connectionMongoDB (functionToDo : any, jsonQuery : any) {        
    let that = this;
    mongodb.MongoClient.connect(this.url, { useNewUrlParser: true }, function(err, client){
      assert.equal(null, err); // raise an exception if there is an error
      console.log("connected successfully to server");
      let db = client.db(that.dbName);
      functionToDo(db, jsonQuery, function() {
        client.close();
      });
    });
  }
  
  /**
   * read from the mongo database.
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format 
   * @param callback is the callback function, called when this class finished its job
   */
  findDocuments(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.find(jsonQuery).toArray(function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      console.log(docs); // found the following mongoDB records
      callback(docs); 
    });
  }
  
  /**
   * insert one document into the mongo database.
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format
   * @param callback is the callback function, called when this class finished its job
   */
  insertOneDocument(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.insertOne(jsonQuery, function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      assert.equal(1, docs.insertedCount);
      console.log(docs); // found the following mongoDB records
      callback(docs);
    });
  }
  
  /**
   * insert many documents into the mongo database.
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format
   * @param callback is the callback function, called when this class finished its job
   */
  insertManyDocuments(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.insertMany(jsonQuery, function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      assert.equal(jsonQuery.length, docs.insertedCount);
      console.log(docs); // found the following mongoDB records
      callback(docs);
    });
  }

  /**
   * update one document into the mongo database.
   * use the following pattern {{a:1}, {$set: {b: 1}}} for your jsonQuery :
   * jsonQuery[0] => {a:1}
   * jsonQuery[1] => {$set: {b: 1}}
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format
   * @param callback is the callback function, called when this class finished its job
   */
  updateOneDocument(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.updateOne(jsonQuery[0], jsonQuery[1], function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      console.log(docs); // found the following mongoDB records
      callback(docs);
    });
  }

  /**
   * update many documents into the mongo database.
   * use the following pattern {{a:1}, {$set: {b: 1}}} for your jsonQuery :
   * jsonQuery[0] => {a:1}
   * jsonQuery[1] => {$set: {b: 1}}
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format
   * @param callback is the callback function, called when this class finished its job
   */
  updateManyDocuments(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.updateMany(jsonQuery[0], jsonQuery[1], function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      console.log(docs); // found the following mongoDB records
      callback(docs);
    });
  }

  /**
   * delete one document into the mongo database.
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format
   * @param callback is the callback function, called when this class finished its job
   */
  deleteOneDocument(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.deleteOne(jsonQuery, function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      console.log(docs); // found the following mongoDB records
      callback(docs);
    });
  }
  
  /**
   * delete many document into the mongo database.
   * @param db is the database reference
   * @param jsonQuery is the mongo query, which is always in json format
   * @param callback is the callback function, called when this class finished its job
   */
  deleteManyDocuments(db : any, jsonQuery : any, callback : any){
    let collection = db.collection('oeuvres');

    collection.deleteMany(jsonQuery, function(err, docs){
      assert.equal(err, null); // raise an exception if there is an error
      console.log(docs); // found the following mongoDB records
      callback(docs);
    });
  }

  setDbName(dbName: string) {
      this.dbName = dbName;
  }
  
  setCollectionName(collectionName: string) {
      this.collectionName = collectionName;
  }
  
}

//=============== Test part begin =====================
// fake data to use for development work
let plugData_lesson1 = {
  _id: "47",
  "title": "Apprenez à programmer en Lorem Ipsum",
  "durée": "6:66",
  "niveau": "3",	//(le niveau sera compris entre 1 et 3 -> facile, moyen, difficile)
  "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit scelerisque congue. Vivamus pharetra tempor urna. Ut dapibus tristique ultricies. Duis ut ipsum congue, rhoncus purus et, luctus urna. Suspendisse fringilla auctor ligula, nec volutpat justo accumsan vitae. Suspendisse potenti. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  "auteur": "Alexandre Mailliu",
  "imageURL": "https://i.ytimg.com/vi/BCr7y4SLhck/maxresdefault.jpg",
  "visible": true,
  "chapitres": [
    {
      "numero" : 1,
      "sous-parties": [
        {
          "numero" : 1,
          "titre" : "lorem",
          "contenu" : "Sed quis mi ut velit congue pellentesque vel vitae leo. Nam vitae dictum nulla, in venenatis tellus. Donec rutrum elit nisl, vitae cursus est semper eu. Vivamus in vehicula velit, ut fermentum libero. Aenean tincidunt nibh nulla, quis bibendum risus aliquam a. Fusce posuere elit velit. Suspendisse bibendum massa eu arcu vulputate, ac pretium sapien fermentum. Nulla facilisi. Fusce lectus nibh, cursus et massa quis, sollicitudin viverra augue. Nunc ultrices lectus elit, vitae sollicitudin lacus varius nec. Fusce finibus efficitur auctor. Donec sed elementum odio. Quisque vulputate pharetra lectus nec molestie. Pellentesque vitae ex est. Nulla fermentum leo non dignissim dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque orci ante, tincidunt sed suscipit vitae, convallis ac sem. Nam elementum at nisi et feugiat. Nulla varius vel turpis in placerat. Praesent et tincidunt magna, a interdum tortor. Ut egestas purus nibh, sed dapibus sapien sollicitudin non. Nam felis lorem, bibendum eu nisi placerat, congue faucibus erat. Quisque congue a nibh at aliquam. In sem eros, vehicula eu faucibus sed, scelerisque et erat. Donec pretium est vitae dolor varius euismod. Integer consequat efficitur ipsum, id placerat tellus sollicitudin vel. Donec condimentum justo arcu, quis convallis urna consequat sit amet. Duis commodo tortor quis velit varius, in euismod diam consequat. Maecenas semper ipsum sed mauris luctus blandit. Aliquam sapien nunc, laoreet sed ante ut, luctus fermentum urna. Suspendisse eros mi, ullamcorper ut nisl facilisis, rhoncus pulvinar est. Cras tempus pharetra commodo. Sed elit dolor, dignissim id tortor sit amet, mollis aliquam lacus. Maecenas hendrerit, mauris vitae ultricies hendrerit, felis nunc porta metus, convallis consequat purus metus a libero. Phasellus pellentesque a massa sit amet egestas. Nunc viverra eros ac sem vulputate tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce congue nunc vitae purus dictum interdum. Nam elementum elit velit. Maecenas quis sem non velit pretium placerat. Aliquam a tristique orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed placerat et nunc eget facilisis. In pharetra commodo arcu vel dignissim. Cras eu viverra eros. Phasellus lobortis lectus vel tortor hendrerit, nec porttitor orci ornare. Praesent fermentum vehicula mi, in dapibus mi vulputate sit amet. Vivamus eget ipsum congue, pharetra tortor vitae, aliquam erat. Cras placerat volutpat placerat. Nunc a vehicula nunc. Mauris tincidunt dapibus scelerisque. Nulla pretium pharetra erat quis semper. Proin tempor pretium placerat. ",
          "exercice" : [
            {
              "numero" : 1,
              "titre" : "exerciso uno",
              "reponses": [
                {
                  "id": 2,
                  "valide": true,
                  "contenu": "Vivamus in vehicula velit, ut fermentum libero."
                },
                {
                  "id": 3,
                  "valide": false,
                  "contenu": "Quisque vulputate pharetra lectus nec molestie."
                }
              ],
            },
            {
              "numero" : 2 ,
              "titre" : "exerciso dose",
              "reponses": [
                {
                  "id": 4,
                  "valide": true,
                  "contenu": "Nulla fermentum leo non dignissim dapibus."
                },
                {
                  "id": 5,
                  "valide": false,
                  "contenu": "Pellentesque orci ante, tincidunt sed suscipit vitae, convallis ac sem."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

let plugData_lesson2 = {
  _id: "42",
  "title": "Apprenez à programmer en Lorem Ipsum",
  "durée": "6:66",
  "niveau": "3",	//(le niveau sera compris entre 1 et 3 -> facile, moyen, difficile)
  "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit scelerisque congue. Vivamus pharetra tempor urna. Ut dapibus tristique ultricies. Duis ut ipsum congue, rhoncus purus et, luctus urna. Suspendisse fringilla auctor ligula, nec volutpat justo accumsan vitae. Suspendisse potenti. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  "auteur": "Alexandre Mailliu",
  "imageURL": "https://i.ytimg.com/vi/BCr7y4SLhck/maxresdefault.jpg",
  "visible": true,
  "chapitres": [
    {
      "numero" : 1,
      "sous-parties": [
        {
          "numero" : 1,
          "titre" : "lorem",
          "contenu" : "Sed quis mi ut velit congue pellentesque vel vitae leo. Nam vitae dictum nulla, in venenatis tellus. Donec rutrum elit nisl, vitae cursus est semper eu. Vivamus in vehicula velit, ut fermentum libero. Aenean tincidunt nibh nulla, quis bibendum risus aliquam a. Fusce posuere elit velit. Suspendisse bibendum massa eu arcu vulputate, ac pretium sapien fermentum. Nulla facilisi. Fusce lectus nibh, cursus et massa quis, sollicitudin viverra augue. Nunc ultrices lectus elit, vitae sollicitudin lacus varius nec. Fusce finibus efficitur auctor. Donec sed elementum odio. Quisque vulputate pharetra lectus nec molestie. Pellentesque vitae ex est. Nulla fermentum leo non dignissim dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque orci ante, tincidunt sed suscipit vitae, convallis ac sem. Nam elementum at nisi et feugiat. Nulla varius vel turpis in placerat. Praesent et tincidunt magna, a interdum tortor. Ut egestas purus nibh, sed dapibus sapien sollicitudin non. Nam felis lorem, bibendum eu nisi placerat, congue faucibus erat. Quisque congue a nibh at aliquam. In sem eros, vehicula eu faucibus sed, scelerisque et erat. Donec pretium est vitae dolor varius euismod. Integer consequat efficitur ipsum, id placerat tellus sollicitudin vel. Donec condimentum justo arcu, quis convallis urna consequat sit amet. Duis commodo tortor quis velit varius, in euismod diam consequat. Maecenas semper ipsum sed mauris luctus blandit. Aliquam sapien nunc, laoreet sed ante ut, luctus fermentum urna. Suspendisse eros mi, ullamcorper ut nisl facilisis, rhoncus pulvinar est. Cras tempus pharetra commodo. Sed elit dolor, dignissim id tortor sit amet, mollis aliquam lacus. Maecenas hendrerit, mauris vitae ultricies hendrerit, felis nunc porta metus, convallis consequat purus metus a libero. Phasellus pellentesque a massa sit amet egestas. Nunc viverra eros ac sem vulputate tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce congue nunc vitae purus dictum interdum. Nam elementum elit velit. Maecenas quis sem non velit pretium placerat. Aliquam a tristique orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed placerat et nunc eget facilisis. In pharetra commodo arcu vel dignissim. Cras eu viverra eros. Phasellus lobortis lectus vel tortor hendrerit, nec porttitor orci ornare. Praesent fermentum vehicula mi, in dapibus mi vulputate sit amet. Vivamus eget ipsum congue, pharetra tortor vitae, aliquam erat. Cras placerat volutpat placerat. Nunc a vehicula nunc. Mauris tincidunt dapibus scelerisque. Nulla pretium pharetra erat quis semper. Proin tempor pretium placerat. ",
          "exercice" : [
            {
              "numero" : 1,
              "titre" : "exerciso uno",
              "reponses": [
                {
                  "id": 2,
                  "valide": true,
                  "contenu": "Vivamus in vehicula velit, ut fermentum libero."
                },
                {
                  "id": 3,
                  "valide": false,
                  "contenu": "Quisque vulputate pharetra lectus nec molestie."
                }
              ],
            },
            {
              "numero" : 2 ,
              "titre" : "exerciso dose",
              "reponses": [
                {
                  "id": 4,
                  "valide": true,
                  "contenu": "Nulla fermentum leo non dignissim dapibus."
                },
                {
                  "id": 5,
                  "valide": false,
                  "contenu": "Pellentesque orci ante, tincidunt sed suscipit vitae, convallis ac sem."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

let plugData_lesson3 = [plugData_lesson1, plugData_lesson2];
let plugData_update1 = [{_id:"47"}, {$set: {"title": "Apprenez à programmer en TypeScript"}}];
let plugData_update2 = [{}, {$set: {"visible": false}}];
let plugData_delete1 = {_id:"47"};
let plugData_delete2 = {};

function test1(){
  
  //let url = 'mongodb://master027:vw8h8yv6@obiwan2.univ-brest.fr'; // alex ubo
  //let url = 'mongodb://obiwan2.univ-brest.fr'; // alex ubo
  let url = 'mongodb://localhost:27017'; // alex home
  let dbName = 'M1_MAILLIU_Alexandre'; // alex ubo & home
  let collectionName = "oeuvres";
  let mongoDB_Operations = new MongoDB_Operations(url, dbName, collectionName);

  // get all the db informations :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.findDocuments, {});
  
  // insert one lesson in the db :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.insertOneDocument, plugData_lesson1);
  
  // update one lesson in the db :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.updateOneDocument, plugData_update1);
  
  // delete one lesson in the db :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.deleteOneDocument, plugData_delete1);
  
  // refresh
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.deleteManyDocuments, plugData_delete2);
  
  // insert many ( 2 ) lesson in the db :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.insertManyDocuments, plugData_lesson3);
  
  // update many ( 2 ) lesson in the db :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.updateManyDocuments, plugData_update2);

  // delete many ( 2 ) lesson in the db :
  mongoDB_Operations.connectionMongoDB(mongoDB_Operations.deleteManyDocuments, plugData_delete2);
}

test1();
//=============== Test part end =====================
