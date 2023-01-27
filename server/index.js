const express = require('express');
const app = express ();  
const http = require ('http');
const cors = require ('cors'); 
const { Server } = require('socket.io')
app.use(cors());



const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatdeploy-production.up.railway.app/",
    methods: ['GET', 'POST'],
  }
});

const mess = 'aqui foi'

io.on("connection", (socket) => {
  console.log('User connected, id:', socket.id);
  
  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`Usuário com ID ${socket.id} entrou na sala ${data}`
    )
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  } )

  socket.on('disconnect', () => {
    console.log('User Disconnected, id:', socket.id)
  })

})

server.listen(`0.0.0.0`, () => {
  console.log('Server running')
});