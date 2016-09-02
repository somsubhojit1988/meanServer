var express = require('express')
var assert = require('assert')
var app = express()
var bodyParser=require('body-parser')
var port = process.env.PORT||8080
var router = express.Router()
var dbConnector = require('./dboperation.js')
app.use('/api',router)
app.use(bodyParser.urlencoded({"extended":"true"}))
app.use(bodyParser.json())

router.use(function (req,res,next) {
    //console.log("SERVER.MIDDLEWARE==>")    
    next()
})
router.get('/'
  ,function (req,res) {
      res.json({"message":"Welcome to our API"})
})

compareAndCreateNewDoc =function (dbResArray,jsonHeader) {
  var newDoc={}
  if(dbResArray[0].user_name!=jsonHeader.user_name)
    newDoc['user_name'] = jsonHeader.user_name
  if(dbResArray[0].phone_num!=jsonHeader.phone_num)
    newDoc['phone_num'] = jsonHeader.phone_num
  newDoc['loc']=jsonHeader.loc
  newDoc['friends']=dbResArray[0].friends
  // console.log(newDoc) 
  return newDoc
}

router.put('/addMeToTheCommunity'
/* request sent at the installation of FindMyBud to register in DB*/
  ,function (req,res){
    var jsonObject = JSON.parse(req.headers.json)
    dbConnector.dbConnect(onDbConnected =
      function(db){
      //Check for existing data with  phone_num/user_name
        var qJson = {}
        if(jsonObject.user!=null)
          qJson['user']=jsonObject.user
         /*Assuming user_name is our primary key
         And there cannot be multiple accounts with same user_name*/
        dbConnector.dbFind(db,'testmeandata',qJson  
          ,function onDocFound(dbres){
            if(dbres.length!=0){                   
              console.warn("SERVER==>Existing record found :")
              //check for the different attributes and then create update_doc and update                                                                
              dbConnector.dbUpdate(db,'testmeandata',qJson,{$set:compareAndCreateNewDoc(dbres,jsonObject)}
                ,function (dbr) {
                  db.close()
                })
            }
            else{
              console.log("New doc will be inserted..")
              jsonObject['fried_list']=[]
              dbConnector.dbInsert(db,'testmeandata',jsonObject,
                onDocInserted=function(result) {
                console.log("SERVER::inserted callback!!")
                db.close()
              })                           
            }
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
    var me = JSON.parse(req.headers.json)
    console.log(me['fuckafce']) 
    var filer={}
    if(me['user_name'])
      filer['user_name']=me['user_name']

 dbConnector.dbConnect(function (db) {
    dbConnector.dbFind(db,'testmeandata',filer
      ,function onDocFound(dbres){
        if(dbres.length!=0){                   
          console.warn("SERVER==> On our way to add this shit to you:")
          dbConnector.dbUpdate(db,'testmeandata',filer
            ,{$push:{'fried_list':me['fuckafce']} }
            ,function (dbr) {
              console.log(dbr)
            })
          res.json({"server_message":"Fucker added to your friend list"})
        }
        else{
          console.log("You are an illusion!")              
          res.json({"server_message":"You are just a fucking illusion!"})
        }   
        db.close()
        })
      })    
})
app.listen(port)
console.log("Server listening to : "+port)