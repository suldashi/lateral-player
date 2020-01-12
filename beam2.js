const fs = require("fs");
let FlacToPCM = require("./FlacToPCM");
let inFile = fs.createReadStream("5.final.mp3");
let outFile = fs.createWriteStream("decoded2.raw");
let flacPipe = new FlacToPCM();
inFile.pipe(flacPipe).pipe(outFile);
