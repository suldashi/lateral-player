const express = require("express");
const config = require("../config/config")[process.env.NODE_ENV];
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const multer = require("multer");

const Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	storage: config.storage
});

const User = require("../models").User;
const File = require("../models").File;

const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname,"..","public","uploads"));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.use('/public', express.static(path.resolve(__dirname,"..",'public')));

let upload = multer({ storage: storage }).single('track');
function uploadHandler(req,res,next) {
	upload(req,res,(err) => {
		if(err) {
			res.send(err);
		}
		else if(!req.file) {
			res.send("no file");
		}
		else {
			next();
		}
	});
}

app.post('/upload', uploadHandler, (req,res) => {
	res.send("upload complete");
});

app.get("/users", async (req,res) => {
	let users = await User.findAll();
	res.send(users);
});

app.get("/files", async (req,res) => {
	let files = await File.findAll({include:User});
	res.send(files);
});

app.get("*",(req,res) => {
	res.sendFile(path.resolve("public","index.html"));
});

app.set("x-powered-by",false);

server.listen(port);
console.log("started on " + port);
sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});