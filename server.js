// Import required modules
const express = require('express'); // Import Express framework for handling HTTP requests
const http = require('http'); // Import HTTP module to create a server
const socketIo = require('socket.io'); // Import Socket.io for real-time communication

// Create an instance of an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.io on top of the HTTP server
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Set up the Socket.io connection event handler
io.on('connection', (socket) => {
  let username = ''; // Initialize an empty username variable for each user

  // Emit an 'askUsername' event to prompt the user for their username
  socket.emit('askUsername');

  // Listen for the 'setUsername' event, which is triggered when the user submits their username
  socket.on('setUsername', (name) => {
    username = name; // Assign the provided name to the username variable

    // Log a message in the server console when a user joins the chatroom
    console.log(`${username} sauntered into this snide chatroom!`);

    // Emit a chat message to all clients announcing that the user has joined
    io.emit('chatMessage', `${username} sauntered into this snide chatroom!`);
  });

  // Listen for the 'chatMessage' event, which is triggered when a user sends a message
  socket.on('chatMessage', (msg) => {
    // Log the message sent by the user (with their username)
    console.log(`${username}: ${msg}`);

    // Emit the chat message to all clients (broadcast to everyone in the chatroom)
    io.emit('chatMessage', `${username}: ${msg}`);
  });

  // Listen for the 'disconnect' event, which is triggered when a user leaves the chatroom
  socket.on('disconnect', () => {
    // If the user has set a username, send a goodbye message when they disconnect
    if (username) {
      console.log(`${username} felt overwhelmed and left this snide chatroom!`);

      // Emit a chat message to all clients announcing that the user has left
      io.emit('chatMessage', `${username} felt overwhelmed and left this snide chatroom!`);
    }
  });
});

// Define the port number for the server to listen on
const port = 3000;

// Start the server on the specified port
server.listen(port, () => {
  // Log a message to the console when the server is running
  console.log(`Server is running on https://snide.onrender.com`);
});
