// Establish a connection with the server using Socket.io
const socket = io();

// Get references to the DOM elements
const messageInput = document.getElementById('messageInput'); // Input field for typing messages
const sendButton = document.getElementById('sendButton'); // Button for sending messages
const messagesDiv = document.getElementById('messages'); // Container for displaying messages

// Initialize username variable
let username = '';

// Listen for an 'askUsername' event from the server to prompt the user for a username
socket.on('askUsername', () => {
  // Prompt the user to enter a username when first connecting
  username = prompt("Enter your username:");
  
  // Emit the 'setUsername' event with the username to the server
  socket.emit('setUsername', username);
});

// Listen for incoming 'chatMessage' events from the server (new messages)
socket.on('chatMessage', (msg) => {
  // Create a new <p> element to display the received message
  const messageElement = document.createElement('p');
  
  // Set the message text content
  messageElement.textContent = msg;

  // Append the new message element to the messages container
  messagesDiv.appendChild(messageElement);

  // Scroll the messages container to the bottom to show the latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Add an event listener to the send button to handle sending a message
sendButton.addEventListener('click', () => {
  // Get the message from the input field and remove extra whitespace
  const message = messageInput.value.trim();

  // Only send the message if it's not empty
  if (message) {
    // Emit the 'chatMessage' event with the message to the server
    socket.emit('chatMessage', message);
    
    // Clear the input field after sending the message
    messageInput.value = '';
  }
});

// Add an event listener to the input field to handle sending messages with the Enter key
messageInput.addEventListener('keypress', (e) => {
  // If the user presses the Enter key, simulate a click on the send button
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
