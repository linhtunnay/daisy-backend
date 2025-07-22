function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message !== "") {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = message;
    document.getElementById("messages").appendChild(messageElement);
    input.value = "";
    input.focus();
  }
}
