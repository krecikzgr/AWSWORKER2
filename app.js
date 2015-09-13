(function()
{
	var helpers = require("./helpers");
	var Queue = require("queuemanager");
	var SQSCommand = require("./sqscommand");
	var Server = require("./server");
	var SQSConsole = require("./sqsconsole");
	
	var AWS_CONFIG_FILE = "./config.json";
	var APP_CONFIG_FILE = "./app.json";
	
	var initConsole = function(AWS) {
		 var server = new Server();
		 server.listenToServer();

	}
	require("./awshelpers").initAWS(initConsole, AWS_CONFIG_FILE);
	
})()



