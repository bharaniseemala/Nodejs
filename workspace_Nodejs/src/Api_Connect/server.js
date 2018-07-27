var http = require('http')
var url  = require('url')
//var query = require('querystring')

//var server = 
http.createServer( function(req,res){

	try{


    res.writeHead(200,{'Content-type': 'text/htm'})
	res.write('Connectivity is build')
    
    var splitURL = url.parse(req.url, true)
    // splitURL.host     --> 'localhost:8000'
    console.log('host' + splitURL.host)
    console.log('pathname' + splitURL.pathname)
    console.log('search' + splitURL.search)
    // splitURL.pathname --> URI
    // splitURL.search   --> query params string --> ?Id=..&name=...
    
    var paramobj = splitURL.query // --> {Id : '', Name : ''}
                                   //  paramobj.{key} --> value
    console.log('paramobj' + JSON.stringify(paramobj))
    res.end()
    console.log(req) //--> whole information of req
    //pathname = url.parse(req.url).pathname
    //query    = url.parse(req.url).query
	//queryAccess= querystring.parse(query).access
} catch(e){
	console.log(e.stack)
}
}).listen(8000)

//server.listen(8000)
console.log('Server is started and running on port : 8000')