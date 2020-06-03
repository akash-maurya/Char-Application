var express = require('express') ;
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http)

const users = {};
 
app.use(express.static('public'));

// app.get('/',(req,res)=>{

//     res.sendFile(__dirname + '/index.html');
// })

io.on('connection', (socket) => {
   socket.on('new-user-joined', (name) => {
           console.log("New user:",name);
           users[socket.id]  = name ;
           socket.broadcast.emit('user-joined' , name );

  });

socket.on('send' ,massage =>{
      socket.broadcast.emit('recieve' , {massage : massage , name :users[socket.id]});
  }) ;

 socket.on('disconnect', message =>{
     socket.broadcast.emit('left' , users[socket.id]);
     delete users[socket.id];
 }) ;


});
http.listen(3000, () => {
  console.log('listening on *:3000');
});
