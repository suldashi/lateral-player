'use strict';

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(server);

const socketHandler = require("./socket-handler");

const port = 8080;

app.use('/public', express.static(path.resolve(__dirname,"..",'public')));

app.get("*",(req,res) => {
	res.sendFile(path.resolve("public/index.html"));
});

app.set("x-powered-by",false);

socketHandler(io);

server.listen(port);
console.log("started on " + port);