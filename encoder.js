const fs = require("fs");
const beamcoder = require("beamcoder");
const outFile = fs.createWriteStream("encoded.raw");

decodeAudioFile("tri.wav", () => {}, (frame) => {
    for(var i in frame.data) {
        outFile.write(frame.data[i]);
    }
});

async function decodeAudioFile(filePath, onInputMetadata, onData) {
    let data = {};
    try {
        let demuxer = await beamcoder.demuxer(filePath);
        let decoder = beamcoder.decoder({ demuxer, stream_index: 0, request_sample_fmt: "s16" });
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