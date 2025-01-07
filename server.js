const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
  let username = '';

  // Ask the user for their username
  socket.emit('askUsername');

  // When a username is submitted
  socket.on('setUsername', (name) => {
    username = name;
    console.log(`${username} sauntered into this snide chatroom!`);
    io.emit('chatMessage', `${username} sauntered into this snide chatroom!`);
  });

  // When a message is received
  socket.on('chatMessage', (msg) => {
    console.log(`${username}: ${msg}`)
    io.emit('chatMessage', `${username}: ${msg}`);
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    if (username) {
      console.log(`${username} felt overwhelmed and left this snide chatroom!`);
      io.emit('chatMessage', `${username} felt overwhelmed and left this snide chatroom!`);
    }
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
