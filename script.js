const socket = io();
let yourId;

socket.on("your-id", (id) => {
  yourId = id;
  document.getElementById("yourId").innerText = "Your ID: " + id;
});

socket.on("receive-message", ({ from, message }) => {
  const li = document.createElement("li");
  li.textContent = `[${from}]: ${message}`;
  document.getElementById("messages").appendChild(li);
});

socket.on("delete-message", () => {
  const messages = document.getElementById("messages");
  if (messages.lastChild) {
    messages.removeChild(messages.lastChild);
  }
});

function sendMessage() {
  const to = parseInt(document.getElementById("toId").value);
  const message = document.getElementById("msgInput").value;
  socket.emit("send-message", { to, message });
  document.getElementById("msgInput").value = "";
}