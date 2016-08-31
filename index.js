var express = require('express')
var assert = require('assert')
var app = express()
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({"extended":"true"}))
app.use(bodyParser.json())
var port = process.env.PORT||8080
var router = express.Router()
var dbConnector = require('./dboperation.js')
var req_data = ''
app.use('/api',router)
parsereq = function (req,res,next){
  /*Parse json data of the request*/
  req_data=''
  req.on('data',function (chunk) {
    req_data+=chunk
  })
  req.on('end',function () {
    next()
  })
}
router.use(function (req,res,next) {
    console.log({"middleware.Msg":"This is real shit man"})
    parsereq(req,res,next)
})
router.get('/'
  ,function (req,res) {
      res.json({"message":"Welcome to our API"})
})
router.put('/addMeToTheCommunity'
/* request sent at the installation of FindMyBud to register in DB*/
  ,function (req,res){
    var jsonObject = JSON.parse(req_data)
    dbConnector.dbConnect(onDbConnected =
        function(db){
          //Check for existing data with  phone_num/user_name
          var qJson = {}
          if(jsonObject.user!=null)qJson['user']=jsonObject.user
          if(jsonObject.phone_num!=null)qJson['phone_num']=jsonObject.phone_num
      		dbConnector.dbConnect(onDbConnected =
      			function(db,doc){
      				dbConnector.dbFind(db,'testmeandata',qJson/*TODO:Replace with the parsed data*/
      					,function onDocFound(dbres){
                  if(dbres.length==0){
                    console.log("No matching record will add data")
                      dbConnector.dbInsert(db,'testmeandata',jsonObject,
                         onDocInserted=function(result) {
                          console.log("SERVER::inserted callback!!")
                          db.close()
                        })
                  }else {
                    console.warn("Existing record found : ");
                    console.log(dbres)
                    //check for the different attributes and then create update_doc and update                    
                  }
      					})
      			})
        })
      res.json({"message":"Welcome to FSociety!"})
   })
router.get('/getMeThisFucker'
	,function(req,res){
    /* To find location of the given req*/
    var testdoc=JSON.parse(req_data)

    //console.log("getMeThisFucker:");
    // console.log(testdoc.user)
    // console.log(testdoc.phone_num)
    if(testdoc.user==null||testdoc.phone_num==null){
      console.error("INVALID query")
      res.setHeader('Content-Type', 'application/json')
      res.json({'ERROR':'INVALID QUERRY'})
      return
    }
    var qJson = {
      'user':testdoc.user,
      'phone_num':testdoc.phone_num
    }
		dbConnector.dbConnect(onDbConnected =
			function(db,doc){
				dbConnector.dbFind(db,'testmeandata',qJson/*TODO:Replace with the parsed data*/
					,function onDocFound(dbres){
            res.json(dbres)
            db.close()
					} )
			})
	})
router.put('/addThisFuckToMe'

  /*Friend request accepted need to add this one to the friends array*/

  ,function (req,res){
      console.log("addThisFuckToMe: ")
      var jsonObject = JSON.parse(req_data)
      console.log(jsonObject)
      res.json({"message":"Fucker added to your friend list"})
})

app.listen(port)
console.log("Server listening to : "+port);
