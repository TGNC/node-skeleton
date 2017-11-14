const express   = require('express');
const app       = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port      = 3000;

app.use(express.static(`${__dirname}/client`)); 		// statics
require(`./server/routes.js`)(app);						// routes
require(`./server/sockets.js`)(io);						// sockets

http.listen(port, function () {
    console.log(`Web server listening on port ${port}`); // let the games begin!
});
