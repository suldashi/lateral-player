const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const multer = require("multer");

const port = 8080;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
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

app.get("*",(req,res) => {
	res.sendFile(path.resolve("public/index.html"));
});

app.set("x-powered-by",false);

server.listen(port);
console.log("started on " + port);