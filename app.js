var express = require('express');
var app = express();
const { Server } = require('http');
const server = Server(app);
const io = require('socket.io')(server);
var path = require('path');


// viewed at http://localhost:8080
app.use(express.static(__dirname + '/public'))

let count = 0;

io.on('connection', (socket) => {
    count++;
    io.emit('count', { count });

    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('getMessage', data);
    });

    socket.on('disconnect', () => {
        count--;
        io.emit('count', { count });
    });
});

server.listen(8080);