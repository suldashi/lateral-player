const fs = require("fs");
var ogg = require("@suldashi/ogg");
var opus = require("@suldashi/node-opus");
let opusEncoder = new opus.Encoder(48000, 2);
var oggEncoder = new ogg.Encoder();
console.log(opusEncoder, oggEncoder);