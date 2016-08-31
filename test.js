var dbConnector = require('./dboperation.js')
var bson = require('bson')
var BSON = new bson.BSONPure.BSON()
var assert =require('assert')
dbConnector.dbConnect(
  function onDbConnected(db) {
    var ary=[]
    res = db.collection('testmeandata').find({"user" : "test.user_2@abc.com"})
          .next(function (err,res) {
                  assert.equal(err,null)
                  if(res){
                    console.log(res)
                    ary.push(res)
                  }
                  console.log("JSON.stringify : " + JSON.stringify(ary));
                  db.close()
                })
  })
