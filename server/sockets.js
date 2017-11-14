module.exports = io => {

    io.on('connection', function(socket){
        console.log('a user connected');


        socket.on('disconnect', function(){
            console.log('user disconnected');
        });


        socket.on('messageSent', function(msg){
            console.log('message: ' + msg);
        });

    });
};