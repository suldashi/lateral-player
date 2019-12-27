const fs = require('fs');
const puppeteer = require('puppeteer');
var stream = require('stream');
var ogg = require("@suldashi/ogg");
var opus = require("@suldashi/node-opus");
var PCMf32toi16 = require("pcm-f32-to-i16");

function packer(audioBuffer) {
    let chunks = Math.ceil(audioBuffer.length/1e6);
    let arr = [];
    for(var i=0;i<chunks-1;i++) {
        arr.push(audioBuffer.toString("base64",1e6*i,1e6*(i+1)));
    }
    arr.push(audioBuffer.toString("base64",1e6*(chunks-1),audioBuffer.length));
    return {packerData: arr, lengthInBytes: audioBuffer.length};
}

class Bar {
    constructor() {
        this.buffer = null;
        this.counter = 0;
    }

    inc(buf) {
        buf.copy(this.buffer, this.counter);
        this.counter+=buf.length;
    }

    setLength(len) {
        this.buffer = Buffer.alloc(len);
    }
}

async function decodeAudio(fileData) {
    return new Promise(async (resolve, reject) => {
        let outerResolve = resolve;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        let baz = new Bar();
        baz.exit = resolve;
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        let packed = packer(fileData);
        await Promise.all(packed.packerData.map((x, index) => {
          return page.exposeFunction('transferFile_'+index, () => x);
        }));
        await page.exposeFunction('getGG', (base64Data) => {
          let chunkBuffer = Buffer.from(base64Data, 'base64');
          baz.inc(chunkBuffer);
        });
        await page.exposeFunction('getFinal', (base64Data) => {
          baz.exit(baz.buffer);
        });
        await page.exposeFunction('getStart', (decodedLength) => {
          baz.setLength(decodedLength);
        });
        await page.evaluate(async (count) => {
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
              function from64(base64) {
                  var binary_string = window.atob(base64);
                  var len = binary_string.length;
                  var bytes = new Uint8Array(len);
                  for (var i = 0; i < len; i++) {
                      bytes[i] = binary_string.charCodeAt(i);
                  }
                  return bytes;
              }
              function to64(buf) {
                  var binstr = Array.prototype.map.call(buf, function (ch) {
                      return String.fromCharCode(ch);
                  }).join('');
                  return btoa(binstr);
              }
            let pieces = [];
            for(var i=0;i<count.length;i++) {
                pieces[i] = window['transferFile_'+i]();
            }
            let decodedPieces = await Promise.all(pieces).then(x => x.map(from64));
            console.log(`transferred ${decodedPieces.length} pieces`);
            delete pieces;
            let concatenatedBuffer = new Uint8Array(count.bytes);
            console.log(`generated buffer of size ${concatenatedBuffer.byteLength}`);
            for(var i in decodedPieces) {
              concatenatedBuffer.set(decodedPieces[i],1e6*i);
              console.log(`set piece ${i}`);
              delete decodedPieces[i];
            }
            delete decodedPieces;
            console.log(`set all pieces`);
            let audioContext = new (window.AudioContext || window.webkitAudioContext)();
            let audioBuffer = await audioContext.decodeAudioData(concatenatedBuffer.buffer);
            console.log(`decoded buffer`);
            delete concatenatedBuffer;
            let pcmData = interleaveChannels(getChannels(audioBuffer));
            console.log(`interleaved channels. Data size: ${pcmData.byteLength}`);
            getStart(pcmData.byteLength);
            delete audioBuffer;
            let blob = new Blob([pcmData.buffer], {type:"application/octet-stream"});
            delete pcmData;
            console.log("generated blob");
            let reader = blob.stream().getReader();
            let result = await reader.read();
            let total = 0;
            while (!result.done) {
              result = await reader.read();
              if(result.value) {
                  getGG(to64(result.value));
              }
            };
            getFinal();
        }, {length:packed.packerData.length, bytes: packed.lengthInBytes});
        await browser.close();
    });
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
        let opusEncoder = new opus.Encoder(48000, 2);
        var oggEncoder = new ogg.Encoder();
        let floatToInt = new PCMf32toi16();
        let decodedBuffer = await decodeAudio(fileBuffer);
        var bufferStream = new stream.PassThrough();
        bufferStream.pipe(floatToInt).pipe(opusEncoder).pipe(oggEncoder.stream());
        bufferStream.end(decodedBuffer);
        let opusBuffer = await fileStreamToBuffer(oggEncoder);
        return opusBuffer;
    }
}