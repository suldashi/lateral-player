const fs = require("fs");
let FlacToWav = require("./FlacToWav");
let inFile = fs.createReadStream("moog.flac");
let outFile = fs.createWriteStream("moog.wav");
let flacPipe = new FlacToWav();
inFile.pipe(flacPipe).pipe(outFile);
