var fs = require('fs')
var xml2js = require('xml2js')
const {
 parse} = require('querystring')
const querystring = require('querystring')
//var rsj = require('rsj')
var path = require('path')
var url  = require('url')
var fileutil = require('file-url')


//var xmlPath = path.join("file:/"+"10.141.104.11"+"/"+__dirname + "/samplexmldata.xml")

//var u = url.parse(xmlPath,true)
//console.log("file:"+u.path)

//const xmlPath = fileutil('./samplexmldata.xml')
//console.log(xmlPath.toString())
//rsj.r2j(xmlPath, function(json) {
//	console.log(json)
	// body...
//})

var parser = new xml2js.Parser()

fs.readFile('./samplexmldata.xml',"UTF-8",function(err, data) {
    

    if(err){
    	
    	return err
    
    }

    console.log('data'+ JSON.stringify(data))

	parser.parseString(data, function(err, result) {

		if(err){
    	      
    	      return err
                
                }
        
		console.log('result : ' + JSON.stringify(result))


		//var parseData = JSON.stringify(result)

		 var parseData = result.filter(err,function(item) {

		 	if(err){
		 		return err
		 	}

		 	console.log('item'+ JSON.stringify(item))
			
			if(item.DispatchOrders.MarketPlace === 'Myntra'){

				
				return 'MP is Myntra'
                       
			}else if(item.DispatchOrders.MarketPlace.toUpperCase() === 'FLIPKART'){

			//	console.log('MP is Flipkart')
				return 'MP is Flipkart'

			}else {

			//	console.log('MP is not valid')
				return 'MP is not valid'

			}
			 
			 return null
			
		})
		
	})
})