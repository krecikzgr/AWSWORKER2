var AWS = require('aws-sdk');
var Policy = require("./s3post").Policy;
var helpers = require("./helpers");
var POLICY_FILE = "policy.json";
var schedule = require('node-schedule');
var simpleDB = require("./simpleDB");
var SQSCommand = require("./sqscommand");
	var Queue = require("queuemanager");

	var AWS_CONFIG_FILE = "./config.json";
	var APP_CONFIG_FILE = "./app.json";




	var SQSConsole = require("./sqsconsole");
	



var Server = function(){
	
	
	
	
	
	
	
	
					var appConfig = helpers.readJSONFile(APP_CONFIG_FILE);
	var queue1 = new Queue(new AWS.SQS(), appConfig.QueueUrl);
		var queue = new SQSCommand(queue1);
					new SQSConsole(queue);
	var s3 = new AWS.S3();
	var simpleDataAuth = new AWS.SimpleDB();
	
	var policy = new Policy( helpers.readJSONFile(POLICY_FILE));

		
	
	var bucket_name = policy.getConditionValueByKey("bucket");
	
	
	
	Server.prototype.listenToServer = function(){
		
		var run = schedule.scheduleJob('*/4 * * * * *',
			function(){
				
				queue.recv(function(err, data){
					if (err) { 
						console.log(err); 
						return; 
					}

		
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
		var gm = require('gm').subClass({ imageMagick: true });						
		var src = 'http://s3-us-west-2.amazonaws.com/'+params.Bucket+'/'+params.Key;
		
							
							
												var atr = {
										Bucket: params.Bucket,
										Key: params.Key,
										ACL: 'public-read',
										Metadata: {
											"username" : "Aneta Nowacka",
											"ip" : "212.15.46.78"
										}										
									};
									
				var attrToPut = {
										Key: params.Key,
										LastModified: params.LastModified,
							ContentLength: "123",
										ContentType: "Image",
										IP_Uploader: "12.12.5.1",
									};
									simpleDB.CreateTable(simpleDataAuth);
									simpleDB.putMetadata(params.Key,atr,simpleDataAuth);
									simpleDB.getAtributes(attrToPut,simpleDataAuth);
									s3.putObject(atr, function(err, res) {
										console.log("done");
									});
	
						}
					});
				});
			});
	}
}

module.exports = Server;






