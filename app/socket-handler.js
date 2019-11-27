function socketHandler(io) {
    io.on("connection",(socket) => {
        console.log(`someone connected: ${socket.id}`);
        socket.on("disconnect",(data) => {
            console.log(`someone disconnected: ${socket.id}`);
        });
    });
}

module.exports = socketHandler;