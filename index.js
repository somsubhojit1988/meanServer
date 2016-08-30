var express = require('express')
var app = express()
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({"extended":"true"}))
app.use(bodyParser.json())
var port = process.env.PORT||8080
var router = express.Router()
var dbConnector = require('./dboperation.js')

router.use(function (req,res,next) {
    console.log({"middleware.Msg":"This is real shit man"})
    next()
})
app.use('/api',router)
router.get('/'
  ,function (req,res) {
      res.json({"message":"Welcome to our API"})
  })
router.get('/addMeToTheCommunity'


/* request sent at the installation of FindMyBud to register in DB*/

  ,function (req,res){
      dbConnector.dbConnect(onDbConnected =
        function(db){
            dbConnector.dbInsert(db,'testmeandata',{"user":"test.user@abc.com","phone_num":"1234567890"},
               onDocInserted=function(result) {
                console.log("SERVER::inserted callback!!")
                db.close()
              }
            )
        }
      )
      res.json({"message":"Welcome to FSociety!"})
})


router.get('/addMeToThisFuck'

  /*Friend request accepted nedd to add this one to the friends array*/


  ,function (req,res){
      res.json({"message":"Fucker added to your friend list"})
})

app.listen(port)
console.log("Server listening to : "+port);
