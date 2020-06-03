const socket = io('http://localhost:3000')

const mssgContainer = document.querySelector('.container');
const form = document.getElementById('send-container');
const mssgInput = document.getElementById('massageInp') ;

var audio  =  new Audio('whatsapp_incoming.mp3')
const append = (massage , pos)=>{

    const massageElement = document.createElement('div');
    massageElement.innerText = massage ;
    massageElement.classList.add('mssg');
    massageElement.classList.add(pos);
    mssgContainer.append(massageElement);

}

form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const massage = mssgInput.value ; 
   append('You : '+ massage ,'right');
   socket.emit('send',massage);
   mssgInput.value = '';
   audio.play();
});

const name = prompt('Enter your name to go to chat Room\n');

socket.emit('new-user-joined',name);

socket.on('user-joined', name=>{
       append(name + ' joined the chat', 'right');
});

socket.on('recieve' , data =>{
      append(data.name + ': '+ data.massage , 'left');
});

socket.on('left', name =>{
        append( name + ' left the chat' , 'right');
});