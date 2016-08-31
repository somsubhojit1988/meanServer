var mongo   = require('mongodb')
var assert  = require('assert')
var client = mongo.MongoClient
var url=  'mongodb://localhost:27017/meantest'

module.exports = {
    dbConnect :
      function (callback) {
        console.log("CONNECT__:")
        client.connect(url
          ,function(err,db) {
              assert.equal(null, err);
              console.log("Connected to mongodb")
              callback(db)
          })
      },
    dbFind :
      function (db,coll,doc,callback) {
          console.log("RETREIVE:")
          var result=[]
          db.collection(coll).find(doc)
            .toArray(function (err,data) {
              assert.equal(null,err)
              if(data!=null){callback(data)}
            })
      },
    dbInsert :
      function  (db,coll,doc,update_doc,callback){
        var collection=db.collection(coll)
        db.collection.update(doc
          ,{$set:update_doc}          
          ,function (err,res) {
            assert.equal(err,null)
            callback(res)
          }
        )
      },
    dbUpdate :
      function (db,coll,query,doc){
        console.log("UPDATE:")
        var collection = db.collection(coll)
        db.collection(coll).insertOne(doc
          ,function (err,res) {
            assert.equal(err,null)
            callback(res)
          })
      },
    dbDelete :
      function (db,query,doc) {
        console.log("DELETE")
      }
}
var require = function(path){
  return module.exports
}
