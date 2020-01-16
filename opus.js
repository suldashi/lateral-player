const fs = require("fs");
var ogg = require("@suldashi/ogg");
var opus = require("@suldashi/node-opus");
let opusEncoder = new opus.Encoder(48000, 2);
var oggEncoder = new ogg.Encoder();
var readStream = fs.createReadStream('tri.raw');
var writeStream = fs.createWriteStream('tri.opus');
readStream.pipe(opusEncoder).pipe(oggEncoder.stream());
oggEncoder.pipe(writeStream);
