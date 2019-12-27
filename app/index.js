const express = require("express");
const config = require("../config/config")[process.env.NODE_ENV];
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const fileUpload = require('express-fileupload');
const audioConversionService = require("./audio-conversion-service");
const uuid = require("uuid").v4;
const Sequelize = require('sequelize');
const fs = require("fs");

function writeFilePromise(filePath, fileData) {
    return new Promise((resolve,reject) => {
        fs.writeFile(filePath, fileData, (err) => {
            if(err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

let sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	storage: config.storage
});

const User = require("../models").User;
const File = require("../models").File;

const port = process.env.PORT || 8080;

app.use('/public', express.static(path.resolve(__dirname,"..",'public')));
app.use('/upload', fileUpload());

app.post('/upload', async (req,res) => {
	if(req.files.track) {
		let fileBuffer = req.files.track.data;
		try {
			let opusBuffer = await audioConversionService.convertToOpus(fileBuffer);
			await writeFilePromise("./public/uploads/"+uuid()+".opus", opusBuffer);
			res.send("upload complete");
		}
		catch(err) {
			console.log(err);
			res.status(500).send(err);
		}
	}
	else {
		res.status(400).send("no filed uploaded");
	}
	
});

app.get("/users", async (req,res) => {
	let users = await User.findAll();
	res.send(users);
});

app.get("/files", async (req,res) => {
	let files = await File.findAll({include:User});
	res.send(files);
});

app.get("/experiment",(req,res) => {
	res.sendFile(path.resolve("public","index2.html"));
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