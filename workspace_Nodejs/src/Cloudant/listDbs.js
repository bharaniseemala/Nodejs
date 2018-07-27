// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant')
 var elements = []
 
var me = 'nodejs' // Set this to your own account
var password = process.env.cloudant_password
 
// Initialize the library with my account.
//var cloudant = Cloudant({account:me, password:password})

var cloudant = Cloudant("https://4e044d68-6793-44fc-b9e1-db81a691c2af-bluemix:ecdb8636d62807ce63d94f960f0435f267d76dcfcced693a6221c46278e12a72@4e044d68-6793-44fc-b9e1-db81a691c2af-bluemix.cloudant.com")
 
cloudant.db.list(function(err, allDbs) {
  
 // console.log('All my databases: %s', elements.join(', '))
  
  if(err){
  	console.log('err........'+err)
  }

  
  console.log('All my databases: %s', allDbs.join(', '))
});