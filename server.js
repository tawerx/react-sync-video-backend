const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'https://syncvideo-asvteynay-tawer.vercel.app/',
    credentials: true,
    allowedHeaders: ['my-custom-header'],
  },
});
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
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
