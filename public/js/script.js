const nickname = new URLSearchParams(window.location.search).get('nickname');
const color = new URLSearchParams(window.location.search).get('color');

const messages = document.querySelector("#messages");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    io().emit("sendMessage", {
      msg: input.value,
      nickname,
      color,
    });
    input.value = null;
  }
});

io().on('newMessage',(data) => {
  const li = document.createElement("li");
  li.innerHTML = `<span style="color:#${data.color}">${data.nickname}</span>: ${data.msg}`;
  messages.appendChild(li);
  window.scrollTo(0,document.body.scrollHeight);
});