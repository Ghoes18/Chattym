const express = require("express");
const path = require("path");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;

const users = [];

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/get_data", (req, res) => {
  const nickname = req.body.nickname;
  if(users.includes(nickname)){
    res.send({ error: "Nickname already taken" });
    return;
  }
  const randomColor = Math.floor(Math.random() * 16_777_215).toString(16);
  users.push(nickname);
  res.redirect(`/chat?nickname=${nickname}&color=${randomColor}`);
});

app.get("/chat", (req, res) => {
  res.render("chat", {
    nickname: req.query.nickname,
    color: req.query.color
  });
});

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    if(users.includes(data.nickname)) {
      io.emit("newMessage", data);
    } else {
      console.log("User not found");
    }
  });
});

io.on("disconnect", (socket) => {
  users.splice(id, 1);
});

http.listen(port, () => {
  console.log(`http://localhost:${port}`);
});