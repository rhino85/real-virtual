var io = require('socket.io-client');
var socket = io.connect("http://arduino.rhinocerosdu85.com");
var serialport = require("serialport");

var Serialport = new serialport.SerialPort("COM3", {
		parser: serialport.parsers.readline("\n")
	}, false); 
socket.on('connect', function(ok){

	console.log("connected");
	socket.emit('iAmArduino', 'hi');
	Serialport.on('data', function(data){

		socket.emit('sensor', data);
	});
});

socket.on('hiArduino', function(ok){

	Serialport.open(function(){
		console.log('Serial Port Opend');

	});

});

socket.on('turn', function(ok){

	Serialport.write(1);
	console.log('turn');
});

