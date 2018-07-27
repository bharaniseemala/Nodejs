console.log('export function is invoked');

var fs = require('fs');

function readFileCallback(filename,callback){
	fs.readFile(filename,function(err,data){
		if(err)
		{
            callback(throwingErr(err));
		}
	})
}

function throwingErr(err,callback){

}