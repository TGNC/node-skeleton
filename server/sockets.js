module.exports = io => {

    let messages = require('./messages').default;
    let bot = require('./bot');

    function getCurrentTime() {
        var date = new Date();
        return date.getHours() + ':' + date.getMinutes();
    }

    io.on('connection', function(socket){
        console.log('a user connected');


        socket.on('disconnect', function(){
            console.log('user disconnected');
        });


        socket.on('messageSend', function(msg){
            console.log('messageSend: ' + msg);
            messages.getInstance().push(msg);

            //Send the message to all the other connected clients
            socket.broadcast.emit('messageReceive', msg);

            //Run bot on the given message
            var botResponse = bot.run(msg.text);

            if(botResponse){
                io.emit('messageReceive', {
                    text: botResponse,
                    time: getCurrentTime(),
                    isBot: true
                });
            }
        });

    });
};