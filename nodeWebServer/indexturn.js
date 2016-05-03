
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arduinosocket;
app.use(express.static('public'));


app.get('/test', function (req, res) {
	res.sendfile(__dirname + '/test.html');
});
app.get('/*', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('connected');
	socket.on('iAmArduino', function(ok){
		socket.emit('hiArduino', 'hi');
		arduinosocket = socket;
		console.log("arduino connected");
		arduinosocket.on('sensor', function(data){

			console.log(data);
			io.emit('sensor', data);
		});
	});

	socket.on('turn', function(ok){
		arduinosocket.emit('turn', 'ok');
		console.log('turn');
	});
	

});



http.listen(8084, 'localhost', function () {

	console.log('ok');

});