const socket = io();
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

let isUsernameSet = false;
let username = '';

const sendMessage = () => {
  const message = messageInput.value.trim();
  if (message) {
    if (!isUsernameSet) {
      username = message;
      isUsernameSet = true;
      socket.emit('chatMessage', message);
    } else {
      socket.emit('chatMessage', message);
    }
    messageInput.value = '';
  }
};

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

socket.on('chatMessage', (msg) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
