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
          console.log("RETREIVE from "+coll+" :")
          var result=[]
          db.collection(coll).find(doc)
            .toArray(function (err,data) {
              assert.equal(null,err)
              if(data!=null){callback(data)}
            })
      },
    dbInsert :
      function  (db,coll,doc,callback){
        console.log("CREATE:")
        // console.log(doc)
        db.collection(coll).insertOne(doc
          ,function (err,res) {
            assert.equal(err,null)
            callback(res)
          })
      },      

    dbUpdate ://with Upsert
      function (db,coll,filter,doc,callback){
        console.log("UPDATE:")
        db.collection(coll).update(filter,doc
          ,function (err,res) {
            assert.equal(null,err)
            callback(res)  
          })
      },
    dbDelete :
      function (db,col,filter,doc) {
        console.log("DELETE")
        db.collection.deleteOne(filter,function (err,res) {
          assert.equal(null,err)

        })
      }
}
var require = function(path){
  return module.exports
}
