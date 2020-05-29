const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, deleteUser, getUser, getRoomUsers } = require('./users.js');

const PORT = process.env.PORT || 8080;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//--------------------------------------------
//---- SOCKET.IO------
io.on('connection', (socket) => {
  console.log("New Socket(User) Joined!");


  // on:JOIN
  socket.on('join', ( {name, roomId}, callback ) => {
    const { error, user } = addUser({ socket_instance_id: socket.id, name, roomId });

    if(error) {
      return callback(error);
    }

    socket.emit('message', { user: 'Bot', text: `${user.name}, Welcome to the Room ${user.roomId}`, timestamp: Date.now()});
    socket.broadcast.to(user.roomId).emit('message', { user: 'Bot', text: `${user.name} has joined!`, timestamp: Date.now()});
    socket.join(user.roomId)

    io.to(user.room).emit('roomData', {roomId: user.roomId, user: getRoomUsers(user.roomId)});

    callback();
  })


  // on:SENDMESSAGE
  socket.on('sendMessage', (msg, callback) => {
    const user = getUser(socket.id);
    console.log(socket.id);
    console.log(user);
    io.to(user.roomId).emit('message', { user: user.name, text: msg, timestamp: Date.now()});
    io.to(user.roomId).emit('roomData', { roomId: user.roomId, users: getRoomUsers(user.roomId), timestamp: Date.now()});

    callback();
  });


  // on:DISCONNECT
  socket.on('disconnect', () => {
    console.log("User left the chat");
    const user = deleteUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {user: 'Bot', text: `${user.name} has left.`, timestamp: Date.now() })
    }
  });

});
//------------------ end socket.io
//--------------------------------------------


app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
