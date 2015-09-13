var AWS = require('aws-sdk');





var getAtributes = function(itemName,simpledb){
console.log("get attribyres");
	var params = {
	  DomainName: 'Kaleta', /* required */
	  ItemName: 'some value', /* required */
	  ConsistentRead: true
	};

	simpledb.getAttributes(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);
	});
};
var putMetadata = function(key, data,simpledb){
	var params = {
		  Attributes: [ /* required */
	    {
	     Name: "Key", /* required */
			  Value: 'some value', /* required */
			},
	  ],	
		

	  DomainName: "Kaleta", /* required */
	};
	
	simpledb.putAttributes(params, function(err, data) {
	  if (err){
	  	console.log(err, err.stack); // an error occurred
			}
	  else {
	  	console.log(data);  
	  }            // successful response
	});
};

var CreateTable = function(simpledb){
	var params = {
  		DomainName: 'Kaleta' /* required */
	};
	simpledb.createDomain(params, function(err, data) {
	  if (err) { console.log("did nott create the database"); console.log(err, err.stack); } // an error occurred
	  else     { console.log("did create database"); console.log(data);    }       // successful response
	});
};


exports.putMetadata = putMetadata;

exports.CreateTable = CreateTable;
exports.getAtributes = getAtributes;
