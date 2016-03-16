/*
	Servidor nodejs que intermediará a comunicação entre o backend PHP e o browser
	Deve ser executado usando: node index.js
*/

var app = require('express')();  
var http = require('http').Server(app);  
var io = require('socket.io')(http);

var browser = io.of('/browser'); // Obtém de namespace browser, que deve receber as notificações
var backend = io.of('/backend'); // Obtém de namespace backend (php) que irá emitir as notificações

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

backend.on('connection', function(socket){
  console.log('Backend entrou');
  // Quando receber uma notificação do backend, emitir a mesma mensagem para o browser
  socket.on('notification', function(msg){
		console.log(msg);
		io.of('/browser').emit('notification', msg);
	});
});

browser.on('connection', function(socket){  
  console.log('Browser entrou');
});

http.listen(3000, function(){  
  console.log('servidor rodando em localhost:3000');
});