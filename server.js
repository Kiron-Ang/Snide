const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.io connection event handler
io.on('connection', (socket) => {
  let username = '';

  // Ask for the username when a user connects
  socket.emit('askUsername');

  // Set username after user inputs it
  socket.on('setUsername', (name) => {
    username = name;
    console.log(`${username} joined the chatroom`);
    io.emit('chatMessage', `${username} joined the chatroom`);
  });

  // Handle incoming chat messages
  socket.on('chatMessage', (msg) => {
    console.log(`${username}: ${msg}`);
    io.emit('chatMessage', `${username}: ${msg}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (username) {
      console.log(`${username} left the chatroom`);
      io.emit('chatMessage', `${username} left the chatroom`);
    }
  });
});

// Start the server
server.listen(3000, () => console.log('Server running on http://localhost:3000'));
