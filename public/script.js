// Establish a connection to the socket server
const socket = io();

// Get references to the HTML elements
const messageInput = document.getElementById('messageInput'); // Input field
const sendButton = document.getElementById('sendButton');     // Send button
const messagesDiv = document.getElementById('messages');      // Messages div

// Track if the username is set and initialize the username variable
let isUsernameSet = false;
let username = '';

// Function to send a message to the server
const sendMessage = () => {
  const message = messageInput.value.trim();  // Get and trim the message
  if (message) {  // Only send if the message is not empty
    if (!isUsernameSet) {  // If the username is not set yet
      username = message;  // Set the username to the first message
      isUsernameSet = true; // Mark the username as set
      socket.emit('chatMessage', message);  // Send the username to server
    } else {
      socket.emit('chatMessage', message);  // Send regular message to server
    }
    messageInput.value = '';  // Clear the input field after sending
  }
};

// Add event listener to the send button to send the message on click
sendButton.addEventListener('click', sendMessage);

// Add event listener to send the message when Enter key is pressed
messageInput.addEventListener('keypress',
  (e) => e.key === 'Enter' && sendMessage());

// Listen for incoming chat messages from the server
socket.on('chatMessage', (msg) => {
  const messageElement = document.createElement('p');  // Create <p> element
  messageElement.textContent = msg;  // Set the message text content
  messagesDiv.appendChild(messageElement);  // Append the message to the div
  messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom
});
