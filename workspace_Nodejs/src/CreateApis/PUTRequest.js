exports.putrequest = function(){

var http = require('http');

/*var bodyString = JSON.stringify({
    username: 'thefourtheye',
    password: '********'
});

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
};

var options = {
host: '10.141.104.11',
path: '/dispatchorders',
port: 7085,
method: 'PUT',
headers: headers
};

var callback = function(response) {
var str = '';

//another chunk of data has been recieved, so append it to `str`
response.on('data', function(chunk) {
str += chunk;
});

//the whole response has been recieved, so we just print it out here
response.on('end', function() {
console.log(str);
});
};

http.request(options, callback).write(bodyString);
http.request(options, callback).end();

*/

jsonObject = JSON.stringify({
  "DispatchOrders": {
    "MarketPlace": "Myntra",
    "orderId": "12345",
    "orderItems": {
      "id": "12345",
      "quantity": "0",
      "invoiceNumber": "12345",
      "invoiceDate": "2018-02-15T16:17:56+05:30",
      "taxEntries": {
        "taxRate": "5.5",
        "taxType": "CGST",
        "unitTaxAmount": "26.02",
        "unitTaxableAmount": "711.45"
      }
    }
  }
});

// prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};

// the post options
var optionspost = {
    host : '10.120.132.54',
    port : 2020,
    path : '/dispatchorders',
    method : 'POST',
    headers : postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');

var reqPost = http.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
/*
reqPost.emit('error', createHangUpError());

function createHangUpError() {
  var error = new Error('socket hang up');
  error.code = 'ECONNRESET';
  return error;
}
*/
    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });



});
// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});

}