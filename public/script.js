// Establish a connection with the server using Socket.io
const socket = io();

// Get references to the DOM elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

// Flag to check if the username is set
let isUsernameSet = false;
let username = '';

// Listen for the 'askUsername' event to prompt the user for a username
socket.on('askUsername', () => {
  username = prompt("Enter your username:");
  socket.emit('setUsername', username);
  isUsernameSet = true;
});

// Listen for incoming 'chatMessage' events and display them
socket.on('chatMessage', (msg) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
});

// Send message function
const sendMessage = () => {
  const message = messageInput.value.trim();
  if (isUsernameSet && message) {
    socket.emit('chatMessage', message);
    messageInput.value = ''; // Clear input after sending
  } else if (!isUsernameSet) {
    alert("Please enter a username first!");
  }
};

// Add event listeners for send button and Enter key
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
