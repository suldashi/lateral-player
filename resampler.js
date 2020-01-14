const fs = require("fs");
const beamcoder = require("beamcoder");
const getWavHeader = require("./get-wav-header");

let outSampleRate = 48000;
let outFormat = "s32";
let bytesPerSample = 4;
let outFile = fs.createWriteStream("out.wav");

decodeAudioFile("tt.flac", async (metadata) => {
    outFile.write(getWavHeader(metadata.sampleRate, metadata.channels, bytesPerSample));
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
        filterSpec: `aresample=isr=${metadata.sampleRate}:osr=${outSampleRate}:async=1, aformat=sample_fmts=${outFormat}:channel_layouts=${metadata.channelLayout}`
      });
}, async (frameData) => {
    for(var k in frameData.data) {
        let rawData = frameData.data[k];
        let cutData = rawData.slice(0, frameData.nb_samples*bytesPerSample*frameData.channels);
        outFile.write(cutData);
    }
});

async function decodeAudioFile(filePath, onInputMetadata, onData) {
    let data = {};
    try {
        let demuxer = await beamcoder.demuxer(filePath);
        let decoder = beamcoder.decoder({ demuxer, stream_index: 0});
        decoder.request_sample_fmt = outFormat;
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
                    let currentFrame = dec_result.frames[i];
                    onData(currentFrame);
                }
            }
            catch(err) {
                console.error(err);
            }
            packet = await demuxer.read();
        }
        let frames = await decoder.flush();
        if(frames.frames.length > 0) {
            onData(frames.frames[i]);
        }
    }
    catch(err) {
        data.err = err;
        console.error(err);
    }
    return data;
}