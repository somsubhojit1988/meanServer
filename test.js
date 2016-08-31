var request = require('request')
var assert = require('assert')

//test ===>put('/addMeToTheCommunity')
test_addMeToTheCommunity = function(test_data){
  request.put('http://localhost:8080/api/addMeToTheCommunity'
    ,{'body':JSON.stringify(test_data)}
    ,function (err,res,body) {
      assert.equal(err,null)
      console.log(body)
    }
  )
}
/*Enable to test addMeToTheCommunity*/
  var test_data={
          "user":"test.user.4@abc.com",
          "phone_num" : "9705981234",
          "loc" : {
            "type" : "point",
            "coordinates" : [
              331.56124,
              330.5731
            ]
        }}
  test_addMeToTheCommunity(test_data)



//test ===>get('/getMeThisFucker')
test_getMeThisFucker = function(test_data){
  request.get('http://localhost:8080/api/getMeThisFucker'
    ,{'body':JSON.stringify(test_data)}
    ,function (err,res,body) {
      assert.equal(err,null)
      console.log(body)
    }
  )
}
/*Enable to test getMeThisFucker
var test_data = {
      "user":"test.user.1@abc.com",
      "phone_num" : "9768989231",
    }
test_getMeThisFucker(test_data)
*/

//test ===>put('/addThisFuckToMe')
test_addThisFuckToMe=function () {
  var test_data = {
      "user":"test.user.1@abc.com",
      "phone_num" : "9768989231",
      "loc" : {
        "type" : "point",
        "coordinates" : [
          334.56789,
          337.5763
        ]
      }}
  request.put('http://localhost:8080/api/addThisFuckToMe'
      // ,{'body':JSON.stringify({'user': "test.user_2@abc.com"})}
      ,{'body':JSON.stringify(test_data)}
      ,function (err,response,body) {
          console.log("response received");
          //console.log("BODY:")
          console.log(body)
      }
  )
}
/*
  Enable to test getMeThisFucker
  test_addThisFuckToMe()
*/

//var dbConnector = require('./dboperation.js')
//var assert =require('assert')
// dbConnector.dbConnect(
//   function onDbConnected(db) {
//     var ary=[]
//     res = db.collection('testmeandata').find({"user" : "test.user_2@abc.com"})
//           .next(function (err,res) {
//                   assert.equal(err,null)
//                   if(res){
//                     console.log(res)
//                     ary.push(res)
//                   }
//                   console.log("JSON.stringify : " + JSON.stringify(ary));
//                   db.close()
//                 })
//   })
