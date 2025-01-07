const socket = io();
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');
let username = '';

// Prompt for username when first connecting
socket.on('askUsername', () => {
  username = prompt("Enter your username:");
  socket.emit('setUsername', username);
});

// Display incoming chat message
socket.on('chatMessage', (msg) => {
  const messageElement = document.createElement('p');
  
  // Display the message
  messageElement.textContent = msg;

  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});

// Send message when button is clicked
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chatMessage', message);
    messageInput.value = ''; // Clear input field
  }
});

// Send message on Enter key press
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
