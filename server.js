const express = require('express');
const app = express();
const http = require('https');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const io = new Server(server);
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('currentTime', (time) => {
    io.emit('currentTime', time);
  });
});

server.listen(process.env.PORT || 3001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('OK serv');
});
