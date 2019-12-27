const fs = require('fs');
const puppeteer = require('puppeteer');
var stream = require('stream');
var ogg = require("@suldashi/ogg");
var opus = require("@suldashi/node-opus");
var PCMf32toi16 = require("pcm-f32-to-i16");
let opusEncoder = new opus.Encoder(48000, 2);
var oggEncoder = new ogg.Encoder();
let floatToInt = new PCMf32toi16();


async function decodeAudio(fileData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.exposeFunction('transferFile', () => {
    return [...fileData];
  });
  let result = await page.evaluate(async () => {
        function getChannels(audioBuffer) {
            let channels = [];
            for(var i=0;i<audioBuffer.numberOfChannels;i++) {
                channels.push(audioBuffer.getChannelData(i));
            }
            return channels;
        }
        function interleaveChannels(channelArray) {
            let combined = new Float32Array(channelArray[0].length*channelArray.length);
            for(var i=0;i<channelArray[0].length;i++) {
                for(var j=0;j<channelArray.length;j++) {
                    combined[(i*2)+j] = channelArray[j][i];
                }
                
            }
            return combined;
        }
        function to64(blob, callback) {
            var reader = new FileReader();
            reader.onload = function() {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1];
                callback(base64);
            };
            reader.readAsDataURL(blob);
        };
      let encodedFile = await transferFile();
      let ints = new Uint8Array(encodedFile);
      let audioContext = new (window.AudioContext || window.webkitAudioContext)();
      let audioBuffer = await audioContext.decodeAudioData(ints.buffer);
      let pcmData = interleaveChannels(getChannels(audioBuffer));
      let blob = new Blob([pcmData.buffer], {type:"application/octet-stream"});
      return new Promise((resolve, reject) => {
        to64(blob, resolve);
      });
  });
  await browser.close();
  return result;
};

async function fileStreamToBuffer(fileStream) {
    return new Promise((resolve, reject) => {
        let chunks = [];
        let fileBuffer = null;
        fileStream.on("data", (chunk) => {
            chunks.push(chunk);
        });
        fileStream.on("error", (err) => {
            reject(err);
        });
        fileStream.once("end", () => {
            fileBuffer = Buffer.concat(chunks);
            resolve(fileBuffer);
        });
    });
}



module.exports = {
    convertToOpus: async (fileBuffer) => {
        let decodedData = await decodeAudio(fileBuffer);
        let decodedBuffer = Buffer.from(decodedData, 'base64');
        var bufferStream = new stream.PassThrough();
        bufferStream.end(decodedBuffer);
        bufferStream.pipe(floatToInt).pipe(opusEncoder).pipe(oggEncoder.stream());
        let opusBuffer = await fileStreamToBuffer(oggEncoder);
        return opusBuffer;
    }
}