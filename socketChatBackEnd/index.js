var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.port || 8000;

io.on("connection", function(socket) {
  console.log("an user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
  });
});

io.emit("some event", { for: "everyone" });
io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});
