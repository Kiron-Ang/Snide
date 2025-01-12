const socket = io();
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');
const usernameModal = document.getElementById('usernameModal');
const submitUsernameButton = document.getElementById('submitUsername');
const usernameInputField = document.getElementById('usernameInput');

let isUsernameSet = false;
let username = '';

// Display the custom modal for username input
socket.on('askUsername', () => {
  usernameModal.style.display = 'flex'; // Show the modal
});

// Handle username submission
submitUsernameButton.addEventListener('click', () => {
  username = usernameInputField.value.trim();
  if (username) {
    socket.emit('setUsername', username);
    isUsernameSet = true;
    usernameModal.style.display = 'none'; // Hide the modal
  } else {
    alert("Please enter a valid username!");
  }
});

// Display incoming chat messages
socket.on('chatMessage', (msg) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
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

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
