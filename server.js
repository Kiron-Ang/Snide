const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let username = '';

  socket.emit('askUsername');

  socket.on('setUsername', (name) => {
    username = name;
    console.log(`${username} joined the chatroom`);
    io.emit('chatMessage', `${username} joined the chatroom`);
  });

  socket.on('chatMessage', (msg) => {
    console.log(`${username}: ${msg}`);
    io.emit('chatMessage', `${username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    if (username) {
      console.log(`${username} left the chatroom`);
      io.emit('chatMessage', `${username} left the chatroom`);
    }
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
