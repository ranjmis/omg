
// js minificaton

var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

var LibClass = function(){}

LibClass.prototype = {
	h1: function(){
		return 'w';
	},
	minify: function(data){
		console.log("res>", data);
		var ast = jsp.parse(data); // parse code and get the initial AST
		ast = pro.ast_mangle(ast); // get a new AST with mangled names
		ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
		var final_code = pro.gen_code(ast); // compressed code here
		return final_code;
	}	
}

// library
var c = new LibClass();
exports.hello = c.h1;
exports.minify = c.minify;