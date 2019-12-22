const fs = require('fs');
const puppeteer = require('puppeteer');

async function decodeAudio(url) {
  let foo = await fsp(url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.exposeFunction('transferFile', () => {
    return [...foo];
  });
  page.on('console', msg => {
    console.log(msg);
  });
  let result = await page.evaluate(async () => {
        function getChannels(audioBuffer) {
            let channels = [];
            for(var i=0;i<audioBuffer.numberOfChannels;i++) {
                channels.push(audioBuffer.getChannelData(i));
            }
            return channels;
        }
        function combineChannels(channelArray) {
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
      let pcmData = combineChannels(getChannels(audioBuffer));
      let blob = new Blob([pcmData.buffer], {type:"application/octet-stream"});
      return new Promise((resolve, reject) => {
        to64(blob, resolve);
      });
  });
  await browser.close();
  return result;
};

decodeAudio("./public/uploads/1.mp3").then(x => {
    fs.writeFile('./public/uploads/1.pcm', x, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
});


function fsp(filePath) {
    return new Promise((resolve,reject) => {
        fs.readFile(filePath, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
