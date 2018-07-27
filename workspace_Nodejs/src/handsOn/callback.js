//create a host function which accepts the callback function to read a file and invoke the callback synchronously & asynchronously based on conditions
// console.log('callback function invoked');
// var fs = require('fs');

// var hostFunction = function(filename,callback){
//      if(typeof filename !== 'string')
//      {
//      	return callback(new TypeError('file name should be a string'));
//      }

//      fs.readFile(filename,function(err,data){

//           if(err)
//           {
//           	return callback(err);
//           }

//           var content =  data.toString();console.log('content : '+content);

//           callback(callback1(null,content));
//      })
// }

// var callback1 = function(filename,content){
// 	console.log('this is call back function');
// }

// exports.hostFunction = hostFunction;


var http = require('http'),
  fs = require('fs');

function load_album(album_name, callback) {
  fs.readdir("albums/", +album_name, (err, files) => {
    if (err) {
      if (err.code == "ENOENT") {
        callback(make_error("no_such_album", "That album doesn't exist"));
      } else {
        callback(make_error("can't load album", "The server is broken"));
      }
    } else {
      //callback(null, files);
      var only_files = [];
      var path = 'albums/${album_name}/';

      var iterator = (index) => {
        if (index == files.length) {
          var obj = {
            short_name: album_name,
            photos: only_files
          };
          callback(null, obj);
          return;
        }

        fs.stat(path + files[index], (err, stats) => {
          if (!err && stats.isFile()) {
            only_files.push(files[index]);
          }
          iterator(index + 1);
        });
      };
      iterator(0);
    }
  });
}


function handle_incoming_request(req, res) {
  console.log("incoming request: " + req.method + " " + req.url);

  if (req.url == '/albums.json') {
    load_album("ALBUM NAME", (err, albums) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json "
        });
        res.end(JSON.stringify({
          code: "cant_load_albums",
          message: err.message
        }));
      } else {
        var output = {
          error: null,
          data: {
            albums: albums
          }
        };
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(output) + "\n");
      }
    });
  } else if (req.url.substr(0, 7) == '/albums' && req.url.substr(req.url.length - 5) == '.json') {
    //user is requesting contents of album
    load_album("Album Name", req.url.substr(7, req.url.length - 12), (err, photos) => {
      if (err) {
        res.writeHead(500, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(err));
      } else {
        var output = {
          error: null,
          data: {
            photos: photos
          }
        };
        res.writeHead(200, {
          "Content-Type": application / json
        });
        res.end(JSON.stringify(output) + "\n");
      }
    });
  } else {
    res.writeHead(404, {
      "Content-type": "application/json"
    });
    res.end(JSON.stringify({
      code: "no_such_page",
      message: "No such page"
    }));
  }
}
var s = http.createServer(handle_incoming_request);
s.listen(8090);