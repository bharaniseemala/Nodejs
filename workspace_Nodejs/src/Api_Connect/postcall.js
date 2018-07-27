const http = require('http');
const {
 parse} = require('querystring');
const querystring = require('querystring');
var url = require('url')
var bodyParser = require('body-parser')

//global.respData = ''
//global.postData = ''
var createpostData = ''
var respData = ''

const server = http.createServer((req, res) => {
 //   server.use(bodyParser.json({ type : 'application/json'}))
 //   server.use(bodyParser.json())
 pathname = url.parse(req.url, true).pathname;
 var query = pathname.query;
 console.log(query.id);

 if (req.method === 'POST' && pathname === '/apiconnect/dispatchorders') {
  console.log('starting the process for /apiconnect/dispatchorders')

  collectRequestData(req , output =>{
    var createpostData =  JSON.stringify(output)

    const options = {

    hostname: 'localhost',
    port: 7085,
    path: '/dispatchorders',
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Content-Length': Buffer.byteLength(createpostData)
     }
    }

    const postreq = http.request(options, (response) => {

        console.log('statuscode :' + response.statusCode)
        console.log('headers : ' + JSON.stringify(response.headers))

        collectResponseData(reponse, respoutput =>
        {
            console.log('respoutput : ' + JSON.stringify(respoutput)
        })

        response.on('data', (chunk) => {
        respData += chunk.toString()
    })

    })



  })

  collectRequestData(req, result => {
   console.log('....' + JSON.stringify(result));

   const postData = JSON.stringify(result)

   const options = {

    hostname: 'localhost',
    port: 7085,
    path: '/dispatchorders',
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Content-Length': Buffer.byteLength(postData)
    }

   }

   console.log('postData : ' + postData)

   const postreq = http.request(options, (response) => {
    console.log('statuscode :' + response.statusCode)
    console.log('headers : ' + JSON.stringify(response.headers))

    // response.setEncodeing('utf8')
    // response.on('data',(chunk))

    collectResponseData(response, respresult => {
           console.log('respone function : ' + respresult)
    })

    let rawdata = ''
    response.on('data', (chunk) => {
     rawdata += chunk.toString()
    })

    response.on('end', () => {
     respData = JSON.stringify(rawdata)

     respData = JSON.parse(respData)

     //   console.log('response : '+ JSON.stringify(respData))
     console.log('response : ' + respData)

    
    })
   })

   postreq.on('error', (e) => {
    console.log('error response received : ' + e.message)

   })

   postreq.write(postData)
   postreq.end()



   console.log('globrespData : ' + global.respData)
   res.writeHead(200, {
    'Content-type': 'application/json',
    'Accept': 'application/json'
   })
   //   res.write(JSON.stringify(chunk))
   res.write(respData)
    res.end();
  });
 } else {
  res.end('');
 }
});
server.listen(8000);

function collectRequestData(request, callback) {
 const FORM_URLENCODED = 'application/json';
 if (request.headers['content-type'] === FORM_URLENCODED) {
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

function collectResponseData(response, callback) {
 const FORM_URLENCODED = 'application/json';
 if (response.statusCode === '200') {
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
