var events = require('events');
var eventEmitter = new events.EventEmitter();

//handlers of the events

var testHandler = function(){
	console.log('event is test');
}
var test1Handler = function(){
	console.log('event is test1');
}
var test2Handler = function(){
	console.log('event is test2');
}
var test3Handler = function(){
	console.log('event is test3');
}

eventEmitter.on('test',testHandler);
eventEmitter.on('test1',test1Handler);
eventEmitter.on('test2',test2Handler);
eventEmitter.on('test3',test3Handler);

eventEmitter.emit('test1');
eventEmitter.emit('test');
eventEmitter.emit('test2');
eventEmitter.emit('test3');