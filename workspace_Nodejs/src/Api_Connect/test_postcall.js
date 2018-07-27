var http = require('http')
var url  = require('url')
var querystring = require('querystring')

//var server = 
http.createServer( function(req,res){

   pathname = url.parse(req.url).pathname
   console.log(pathname)
   if(pathname == '/dispatchorders'){
    console.log('starting the process for /dispatchorders')
    
    var post_data = querystring.stringify(req.body)
    var post_options = {
    host: 'localhost',
    port: '7085',
    path: pathname,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(post_data)
      }
  };

    var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
  reqPost.on('error', function(e) {
    console.error(e);
});
}
}

   }
   res.writeHead(200,{'Content-type': 'text/htm'})
   res.write('Connectivity is build')
   res.end()

  /*
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

   */

}).listen(8000)

//server.listen(8000)
console.log('Server is started and running on port : 8000')