// Importing necessary modules
const express = require('express'); // For handling HTTP requests
const http = require('http');       // For creating an HTTP server
const socketIo = require('socket.io'); // For handling WebSocket connections

// Creating an Express application instance
const app = express();

// Creating an HTTP server using Express app
const server = http.createServer(app);

// Setting up Socket.IO to work with the HTTP server
const io = socketIo(server);

// Serve static files from the 'public' directory (e.g., HTML, CSS)
app.use(express.static('public'));

// Setting up a WebSocket connection listener
io.on('connection', (socket) => {
  let username = ''; // Variable to store the user's username

  // Listen for 'chatMessage' events (when a message is sent by a user)
  socket.on('chatMessage', (msg) => {
    // If the username is not set, the first message will be the username
    if (!username) {
      username = msg.trim(); // Set the username to the first message
      console.log(
        `${username} entered! Reload the page to change your username!`);

      // Emit a message to all connected clients announcing the new user
      io.emit('chatMessage',
        `${username} entered! Reload the page to change your username!`);
    } else {
      // If the username is already set, treat the message as a normal one
      console.log(`${username}: ${msg}`);

      // Emit the chat message to all connected clients
      io.emit('chatMessage', `${username}: ${msg}`);
    }
  });

  // Listen for when a user disconnects
  socket.on('disconnect', () => {
    if (username) {
      // When the user disconnects, log and notify everyone in the chat
      console.log(`${username} left this snide chatroom!`);
      io.emit('chatMessage', `${username} left this snide chatroom!`);
    }
  });
});

// Start the server and listen on port 3000
server.listen(3000, () => console.log('Listening on port 3000!'));
