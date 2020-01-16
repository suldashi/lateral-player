const fs = require("fs");
let AudioToWavEncoder = require("./AudioToWavEncoder");
let WavToPcmResampler = require("./WavToPcmResampler");
let inFile = fs.createReadStream("tri.flac");
let outFile = fs.createWriteStream("tri.raw");
let flacPipe = new AudioToWavEncoder();
let wavPipe = new WavToPcmResampler();
inFile.pipe(flacPipe).pipe(wavPipe).pipe(outFile);
