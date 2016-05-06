var io = require('socket.io-client');
var socket = io.connect("http://arduino.rhinocerosdu85.com");
var serialport = require("serialport");
var n = 0;
var socketConnected = false;
var serialConnected = false;
var Serialport = new serialport.SerialPort("COM3", {
		parser: serialport.parsers.readline("\n")
	}, false); 

socket.on('connect', function(ok){

	console.log("connected");
	socket.emit('iAmArduino', 'hi');
});

Serialport.open(function(){
		
	console.log('Serial Port Opend');
	serialConnected = true;
});

socket.on('hiArduino', function(ok){

	socketConnected = true;
});

Serialport.on('data', function(data){
	
	if(socketConnected){
		n++;
		console.log(n + " " + data)
		socket.emit('sensor', data);
	}
});



socket.on('turn', function(ok){
	
	if(serialConnected){
		Serialport.write(1);
		console.log('turn');
	}
});

