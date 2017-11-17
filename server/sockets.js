module.exports = io => {

    io.on('connection', function(socket){
        console.log('a user connected');


        socket.on('disconnect', function(){
            console.log('user disconnected');
        });


        socket.on('messageSend', function(msg){
            console.log('messageSend: ' + msg);

            //Send the message to all the other connected clients
            socket.broadcast.emit('messageReceive', msg);
        });

    });
};