var http = require('http')
var fs   = require('fs')
var url  = require('url')
var path = require('path')


var server = http.createServer(function(request,response) {
	

	if(request.url.toUpperCase() === "/WELCOMEPAGE"){
	    
            fs.readFile("./public/WelcomePage.html", "UTF-8", function(err,html) {
		response.writeHead(200, { 

                  "Content-Type" : "text/html"

                  })
		response.end(html)

	        })
      
    //  }else if(request.url === "/login"){
            
      }else if(request.url === "/login"){

            fs.readFile("./public/AfterLoginPage.html", "UTF-8", function(err,html) {
            response.writeHead(200, { 

                  "Content-Type" : "text/html"

                  })
            response.end(html)

              })
      }else if(request.url.match(".png$")) {

      	var imgPath = path.join(__dirname+"/"+"public"+request.url)
            var readFilestream = fs.createReadStream(imgPath)
            response.writeHead(200, {
      	 	
      	 	         "Content-Type" : "image/png",
      	 	         "Accept" : "*/*"
      	      })
      	readFilestream.pipe(response)
      	 
      }else if(request.url.match(".html")){
      	
            var htmlPath = path.join(__dirname+"/"+"public"+request.url)
      	var readFilestream = fs.createReadStream(htmlPath,"UTF-8")
      	response.writeHead(200, { 

                  "Content-Type" : "text/html"

                   })
      	readFilestream.pipe(response)
      		
      }else if(request.url.match(".download")){

      	var downloadPath = path.join(__dirname+"/"+"public"+request.url)
            var readFilestream = fs.createReadStream(downloadPath,"UTF-8")
            response.writeHead(200, { 

                  "Content-Type" : "text/html"

                    })
      	readFilestream.pipe(response)
      	
      }else if(request.url.match(".css")){

            var cssPath = path.join(__dirname+"/"+"public"+request.url)
            var readFilestream = fs.createReadStream(cssPath,"UTF-8")
            response.writeHead(200, { 

                  "Content-Type" : "text/css"

                    })
      	readFilestream.pipe(response)
      	
      }else {

            fs.readFile("./public/404-Pagenotfound.html", "UTF-8", function(err,html) {
            response.writeHead(200, { 

                  "Content-Type" : "text/html"

                  })
            response.end(html)

              })
      }
  
  

})

server.listen(5050, function(){
      console.log('Server Started listening on 5050');
})

