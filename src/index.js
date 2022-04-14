const express = require("express");
const path = require("path");
const engines = require("consolidate");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/get_data", (req, res) => {
  const nickname = req.body.nickname;
  res.redirect("/chat?nickname=" + nickname);
});

app.get("/chat", (req, res) => {
  console.log(req.query.nickname);
  res.render("chat", { nickname: req.query.nickname });
});

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("newMessage", data);
  });
});

http.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
