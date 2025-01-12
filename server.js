const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let username = '';

  socket.on('chatMessage', (msg) => {
    if (!username) {
      username = msg.trim();
      console.log(`${username} stepped into this snide chatroom!`);
      io.emit('chatMessage', `${username} stepped into this snide chatroom!`);
    } else {
      console.log(`${username}: ${msg}`);
      io.emit('chatMessage', `${username}: ${msg}`);
    }
  });

  socket.on('disconnect', () => {
    if (username) {
      console.log(`${username} withdrew from this snide chatroom!`);
      io.emit('chatMessage', `${username} withdrew from this snide chatroom!`);
    }
  });
});

server.listen(3000, () => console.log('Server is listening on port 3000!'));