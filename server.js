// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Set up the Socket.io connection event handler
io.on('connection', (socket) => {
  let username = '';

  socket.emit('askUsername'); // Ask for username when a user connects

  socket.on('setUsername', (name) => {
    username = name;
    console.log(`${username} sauntered into this snide chatroom!`);
    io.emit('chatMessage', `${username} sauntered into this snide chatroom!`);
  });

  socket.on('chatMessage', (msg) => {
    console.log(`${username}: ${msg}`);
    io.emit('chatMessage', `${username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    if (username) {
      console.log(`${username} felt overwhelmed and left this snide chatroom!`);
      io.emit('chatMessage', `${username} felt overwhelmed and left this snide chatroom!`);
    }
  });
});

// Start the server
server.listen(3000, () => console.log('Server running on https://snide.onrender.com'));
