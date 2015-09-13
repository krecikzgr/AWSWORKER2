var AWS = require('aws-sdk');
var Policy = require("./s3post").Policy;
var helpers = require("./helpers");
var POLICY_FILE = "policy.json";
var schedule = require('node-schedule');
var simpleDB = require("./simpleDB");
var SQSCommand = require("./sqscommand");

	var AWS_CONFIG_FILE = "./config.json";
	var APP_CONFIG_FILE = "./app.json";


var Server = function(){
	var appConfig = helpers.readJSONFile(APP_CONFIG_FILE);
	var queue = new Queue(new AWS.SQS(), appConfig.QueueUrl);
	var s3 = new AWS.S3();
	var simpleDataAuth = new AWS.SimpleDB();
	
	var policy = newPolicy( helpers.readJSONFile(POLICY_FILE));

	
	var bucket_name = policy.getConditionValueByKey("bucket");
	
	
	
	Server.prototype.listenToServer = function(){
		
		var run = schedule.scheduleJob('*/4 * * * * *',
			function(){
				
				queue.recv(function(err, data){
					if (err) { 
						console.log(err); 
						return; 
					}
					
					console.log({Body : data.Body, MD5OfBody : data.MD5OfBody});
					
					params = {
						Bucket: bucket_name,
						Key: data.Body
					}
					
					s3.getObject(params, function(err, data) {
						if (err) {
							console.log(err, err.stack);
							console.log("error in here");
						}
						else {
							var request = require('request');
							var mime = require('mime');
							console.log("this is working")
							
							var gm = require('gm').subClass({ imageMagick: true });						
							
							var src = 'http://s3-us-west-2.amazonaws.com/'+params.Bucket+'/'+params.Key;
							
							
							
							gm(request(src, params.Key))
							.rotate('black', 15)
							.stream(function(err, stdout, stderr) {
								var buf = new Buffer('');
								stdout.on('data', function(res) {
									buf = Buffer.concat([buf, res]);
								});
								stdout.on('end', function(data) {
									

									var atr = {
										Key: params.Key,
										LastModified: params.LastModified,
										ContentLength: params.ContentLength,
										ContentType: params.ContentType,
										adressip:	"192.168.1.1",
										Body: buf,
										ACL: 'public-read',
										Metadata: {
											"username" : "Aneta Nowacka",
											"ip" : "192.168.1.10"
										}										
									};
									simpleDB.createDomain(simpleDataAuth);
									simpleDB.putUpladedMetadata(params.Key,atr,simpleDataAuth);
									simpleDB.getAtributes("Key",simpleDataAuth)
									s3.putObject(atr, function(err, res) {
										console.log("done");
									});
								});
							});
							
						}
					});
				});
			});
	}
}

module.exports = Server;




