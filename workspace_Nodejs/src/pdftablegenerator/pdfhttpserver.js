const http = require('http');
const {
 parse} = require('querystring');
const querystring = require('querystring');
var url = require('url');
var fs   = require('fs');
var bodyParser = require('body-parser')
//var query = require('querystring')

//var server = 
http.createServer( function(req,res){

var pathname = url.parse(req.url,true).pathname;
// var query = url.parse(req.url,true).query;
// console.log(pathname +'::'+JSON.stringify(query));
	try{

       if(pathname === '/test'){
         if(req.method === 'POST'){
      //    console.log('inside');
      //     // // if(query.filename !== 'undefined' && query.base64String !== 'undefined'){
      //     // //     if(query.filename.trim().length > 0 && query.base64String.trim().length > 0) {
      //     //       console.log('base64String'+query.filename+'::'+query.base64String);
      //     //         var fileName = query.filename;
      //     //         var base64String = query.base64String;
      //     //         let base64Image = base64String.split(';base64,').pop();

      //     //         fs.writeFile('./Files/'+fileName+'.txt', base64Image.toString('utf8'), {decoding: 'base64'}, function(err) {
      //     //             console.log('File created');
      //     //         });
      //     //  //    }
      //     //  // }


       collectRequestData(req , output =>{
                
          //   var createpostData =  JSON.stringify(output);console.log(output);
             var filename      = output.filename;
             var base64String  = output.base64String;
             let base64Image = base64String.split(';base64,').pop();
             var dir = './Files';
             if(!fs.existsSync(dir)){
                fs.mkdirSync(dir);
             }
             fs.writeFile('./Files/'+filename+'.pdf', base64Image.toString('utf8'), {encoding: 'base64'}, function(err) {
             console.log('File created with file name: '+filename);

             });

      });

      }
      else
      {
             res.writeHead(200, {
             'Content-type': 'text/html',
             'Accept': 'text/html',
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
             'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            })
          res.end('<html><body style="text-align:center;background-color: lightblue;"><h1>http method for this opertaion is not allowed.</h1></body></html>');
          
      }
  }
  else
      {
           res.writeHead(200, {
             'Content-type': 'text/html',
             'Accept': 'text/html',
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
             'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            })
          res.end('<html><body style="text-align:center;background-color: lightblue;"><h1>connectivity is build and use appropriate URI to receive the response.</h1></body></html>');
          }

} catch(e){
	console.log(e.stack)
} finally{
   res.writeHead(200, {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
   })
res.end();
}
}).listen(8000);

//server.listen(8000)
console.log('Server is started and running on port : 8000');

function collectRequestData(request, callback) {
 const FORM_URLENCODED = 'application/json';
 // if (request.headers['content-type'] === FORM_URLENCODED) {
  let body = '';
  request.on('data', chunk => {
   //   body += chunk.toString();
   body += chunk
  });
  request.on('end', () => {
   //    callback(parse(body));
   callback(JSON.parse(body));
  });
 // } else {
 //  callback(null);
 // }
}