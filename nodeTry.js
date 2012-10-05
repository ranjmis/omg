
var fs = require("fs");
var os = require("os");
var lib = require("./nodeTryLib.js");
var dns = require('dns');
var http = require('http');

// mkdir

var target = 'target';
fs.mkdir(target);

// a request

var req = http.request('http://yui.yahooapis.com/3.7.2/build/yui/yui-min.js', function(res){
	res.setEncoding('utf8');
	res.on('data', function(data){
		console.log(lib.minify(data));
	})
});
req.end();

// a req in another style

http.get({
	host: 'localhost',
	port: 9090,
	path: '/'
}, function(res){
	res.setEncoding('utf8');
	res.on('data', function(data){
		console.log('data>', data);
	});

});

// dns stuff

dns.resolve('www.google.com', function(err, addrs){
	if(err)
		console.trace(err);
	console.log("dns>",JSON.stringify(addrs));
	addrs.forEach(function(a){
		dns.reverse(a, function(err, d){
			console.log(d);
		});
	});
});

// os

console.log(os.networkInterfaces());

// lib

console.log(lib.hello());

// filesystem

// stat our js file

var OUR_JS_FILE = './nodeTryLib.js';
var OUR_MIN_JS_FILE = 'target/' + OUR_JS_FILE + '.min';

console.time('beforestat');

fs.stat(OUR_JS_FILE, function(err, stats){
	if(err) {
		return;
	}
	if(stats.isFile()){
		console.log('yes it\'s a file');
	}
	console.log("stats>", JSON.stringify(stats));
});

console.timeEnd('beforestat');

// read js file; write minified js

fs.readFile(OUR_JS_FILE, 'utf-8', function(err, data){
	if(err){
		console.log(err);
		return;
	}

	fs.writeFile(OUR_MIN_JS_FILE, lib.minify(data), 'utf-8');
});





