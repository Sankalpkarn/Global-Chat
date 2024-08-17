const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('mess-cont')
const messageForm = document.getElementById('send-cont');
const messageInput = document.getElementById('message-input');


socket.on('chat-message', (data) => {
    appendMessage(`${data.name} : ${data.message}`);
});

socket.on('user-connected', (name) => {
    appendMessage(`${name} connected`);
});

const name = prompt('What is your name ?')
appendMessage('You Joined')
socket.emit('new-user', name)

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value; 
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message); 
    messageInput.value = ''; 
});

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}