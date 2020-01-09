const fs = require("fs");
let oldConsole = console.log;
console.log = () => {}; //suppress initialization GPL message
const beamcoder = require("beamcoder");
console.log = oldConsole;

let filterer = null;
let outSampleRate = 48000;
let outFormat = "s16";
let outFile = fs.createWriteStream("resampled.raw");

decodeAudioFile("tt.flac", async (metadata) => {
    filterer = await beamcoder.filterer({
        filterType: 'audio',
        inputParams: [
          {
            sampleRate: metadata.sampleRate,
            sampleFormat: metadata.sampleFormat,
            channelLayout: metadata.channelLayout,
            timeBase: metadata.timeBase
          }
        ],
        outputParams: [
          {
            sampleRate: outSampleRate,
            sampleFormat: outFormat,
            channelLayout: metadata.channelLayout
          }
        ],
        filterSpec: `aresample=isr=${metadata.sampleRate}:osr=${outSampleRate}:async=1000, aformat=sample_fmts=${outFormat}:channel_layouts=${metadata.channelLayout}`
      });
},async (frameData) => {
    let filteredData = await filterer.filter([frameData]);
    let rawData = filteredData[0].frames[0].data[0];
    let cutData = Buffer.alloc(filteredData[0].frames[0].nb_samples*2*filteredData[0].frames[0].channels);
    rawData.copy(cutData, 0, 0, cutData.length);
    outFile.write(cutData);
});


  
  async function decodeAudioFile(filePath, onInputMetadata, onFrame) {
    let data = {};
    try {
        let demuxer = await beamcoder.demuxer(filePath);
        let decoder = beamcoder.decoder({ demuxer, stream_index: 0 });
        await onInputMetadata({
            sampleRate: decoder.sample_rate,
            channels: decoder.channels,
            timeBase: decoder.time_base,
            sampleFormat: decoder.sample_fmt,
            channelLayout: decoder.channel_layout
        });
        try {
            packet = await demuxer.read();
        }
        catch(err) {
            console.error(err);
        }
        while(packet != null) {
            try {
                let dec_result = await decoder.decode(packet);
                for(var i in dec_result.frames) {
                    for(var j in dec_result.frames[i].data) {
                        let data = dec_result.frames[i];
                        onFrame(data);
                    }
                }
            }
            catch(err) {
                console.error(err);
            }
            packet = await demuxer.read();
        }
        let frames = await decoder.flush();
        if(frames.frames.length > 0) {
            for(var j in frames.frames[i].data) {
                onFrame(frames.frames[i]);
            }
        }
    }
    catch(err) {
        data.err = err;
    }
    return data;
}