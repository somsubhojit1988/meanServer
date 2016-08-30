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
      function (db,doc) {
        console.log("RETREIVE:")
      },
    dbInsert :
      function  (db,coll,doc,callback){
        var collection=db.collection(coll)
        db.collection(coll).insertOne(
          {
            "user" : "a@b.com",
            "phone_num" : "`1234567890`"
          }
          ,function (err,res) {
            assert.equal(err,null)
            callback(res)
          }
        )
      },
    dbUpdate :
      function (db,query,doc) {
        console.log("UPDATE:")
      },
    dbDelete :
      function (db,query,doc) {
              console.log("DELETE")
      }
}
var require = function(path){
  return module.exports
}
