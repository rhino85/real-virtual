var io = require('socket.io-client');
var socket = io.connect("http://arduino.rhinocerosdu85.com");
var serialport = require("serialport");

socket.on('connect', function(ok){
	console.log("connected")
	

	var Serialport = new serialport.SerialPort("COM3", {
		parser: serialport.parsers.readline("\n")
	});
	Serialport.on('open', function(){
		console.log('Serial Port Opend');
		socket.emit('iamarduino', "ok");
		socket.on('turn', function(ok){
			Serialport.write(1);
			console.log('turn');
		})

	});
	Serialport.on('data', function(data){
		console.log(data);
		socket.emit('sensor', data);
	});
	
});

