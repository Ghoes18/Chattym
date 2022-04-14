const socket = io();

let params = new URLSearchParams(location.search);
let nickname = params.get("nickname");

var messages = document.querySelector("#messages");
var form = document.querySelector("#form");
var input = document.querySelector("#input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("sendMessage", {
      msg: input.value,
      nickname: nickname,
    });
    input.value = "";
    alert("Message sent");
  }
});
