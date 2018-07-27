const http = require('http')
const {
 parse} = require('querystring')
const querystring = require('querystring')
var url = require('url')
var bodyParser = require('body-parser')


/*
var inReqData = ''
var postOptions = {}
var outRespRawData = ''
var outRespData = ''
*/

var output = ''
console.log('................................starting the server...............................................')


const server = http.createServer( (inReq,inResp) => {
	
	var inReqData = ''
    var postOptions = {}
    var outRespRawData = ''
    var outRespData = ''
    
    
   inPathName = url.parse(inReq.url).pathname



   if (inReq.method === 'POST' && inPathName === '/apiconnect/dispatchorders') {

   	      console.log('starting the processing for /apiconnect/dispatchorders')

   	      collectRequestData(inReq, inReqResult => {

             inReqData = JSON.stringify(inReqResult)

             postOptions = {

             	hostname: 'localhost',
                port: 7085,
                path: '/dispatchorders',
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json',
                          'Content-Length': Buffer.byteLength(inReqData)
                         }
                  }

             const outReq = http.request(postOptions, (outResp) => {

             	  console.log('statuscode :' + outResp.statusCode)
                  console.log('headers : ' + JSON.stringify(outResp.headers))

                  outResp.on('data', (chunk) => {

                        outRespRawData += chunk.toString()

                          })

                  outResp.on('end', () => {
                           
                       // var outRespData = ''
                        outRespData = JSON.stringify(outRespRawData)

                        outRespData = JSON.parse(outRespData)

                       // outRespData = this[outRespData]

                        //   console.log('response : '+ JSON.stringify(respData))
                        console.log('response : ' + outRespData)
                        output = outRespData
                            })


              })

             outReq.on('error', (e) => {

                   console.log('error response received : ' + e.message)

                       })

             outReq.write(inReqData)
             outReq.end()


             inResp.writeHead(200, {
                                   'Content-type': 'application/json',
                                   'Accept': 'application/json',
                                   'Content-Length': Buffer.byteLength(outRespData)
                            })
        //   inResp.write(JSON.stringify(chunk))
             inResp.write(output)
             inResp.end()


   	        })
          //  inResp.write(outRespData)
          //  inResp.end()

   }

   else {

            

   	        inResp.end()
   	        

   }
        /*
          inResp.on('error', (e) => {

                   console.log('error response received : ' + e.message)

                       })

          inResp.on('end', () => {
          	inResp.end()
          	outRespData = ''
          })
        */
          
} )

server.listen(8000)

console.log('.....................processing to set up for server is completed.................................')
console.log('..................server is on and listening to port : \"8000\"  now................................')




function collectRequestData(request, callback) {
 
 if (request.headers['content-type'] === 'application/json') {
  let body = '';
  request.on('data', chunk => {
   //   body += chunk.toString();
   body += chunk
  });
  request.on('end', () => {
   //    callback(parse(body));
   callback(JSON.parse(body))
  });
 } else {
  callback(null);
 }
}