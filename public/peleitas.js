//main data object 
let data = {
    serverState: "desconectado", 
    appStatus: "conectando...", 
    players:false,
    socket: false, 
}

let app = new Vue({
    el: "#root-app", 
    data: data, 
    mounted: function () {
        this.$nextTick(function () {

        data.socket = io();

        data.socket.on("players", PlayersUpdate); 
        data.appStatus = "Conectado"    

        window.addEventListener("gamepadconnected", (event) => {
           console.log("controller connected"); 
           data.socket.emit("register", "controlador"); 
        });
        
        window.addEventListener("gamepaddisconnected", (event) => {
            data.socket.emit("disconnect", "controlador"); 
        });
        
        window.setInterval( ControllerUpdate, 50);
        
        });
    },
})

function PlayersUpdate(players){
    console.log("players update!"); 
    console.log(players); 
}

function ControllerUpdate(){

}

// $(function(){
   
//     socket.emit("register", "controller"); 
//     $('form').submit(function(e){
//         e.preventDefault(); 
//         socket.emit('chat message',{
//             msg:  $('#m').val(),
//         }); 
//         $('#m').val(''); 
//         return false;
//     })
// }); 

//gamepad support code: 

