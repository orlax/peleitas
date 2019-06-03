let app = require('express')();
let http = require('http').createServer(app); 
let io = require('socket.io')(http); 

let players = []

//static files 
app.use(require('express').static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html'); 
}); 

io.on('connection', function(socket){

    socket.emit("players", players); 

    socket.on("register", function(msg){
     
        if(msg=="controlador"){
            AgregarControlador(socket); 
        }

        if(msg=="peleador"){
            AgregarPeleador(socket); 
        }   

    }); 

    socket.on('disconnect', function(){
       RemoveSocket(socket); 
    }); 

}); 

http.listen(3500, function(){
    console.log("el servidor se ha iniciado en el puerto 3500"); 
})

//funciones de manejo del programa

function AgregarControlador(socket){
    //si la lista de jugadores esta vacio agregamos uno. 
    if(players.length==0){
        players.push({
            controlador: socket
        });
    }else{
        players.forEach((item)=>{
            if(!item.controlador){
                item.controlador = socket; 
            }
        }); 
    }
    io.emit("players", players); 
}

function AgregarPeleador(socket){
    if(players.length==0){
        players.push({
            peleador: socket
        })
    }else{
        players.forEach((item)=>{
            if(!item.peleador){
                item.controlador = socket; 
            }
        }); 
    }
    io.emit("players", players); 
}

function RemoveSocket(socket){
    players.forEach((item)=>{
        if(item.peleador==socket){
            item.peleador = false;
        }
        if(item.controlador==socket){
            item.controlador = false; 
        }
    }); 

    io.emit("players", players); 
}