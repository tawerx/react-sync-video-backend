const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
var cors = require('cors');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
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
