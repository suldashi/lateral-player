(async() => {
    let oldConsole = console.log;
    console.log = () => {}; //suppress initialization GPL message
    const beamcoder = require("beamcoder");
    console.log = oldConsole;
    const fs = require('fs');
    let writeStream = fs.createWriteStream('decoded.raw');
    let demuxer = await beamcoder.demuxer('hum.flac');
    console.info(`Input sample rate: ${demuxer.streams[0].codecpar.sample_rate}`);
    console.info(`Input format: ${demuxer.streams[0].codecpar.format}`);
    console.info(`Input channels: ${demuxer.streams[0].codecpar.channels}`);
    let decoder = beamcoder.decoder({demuxer, stream_index: 0});
    let packet = {};
    try {
        packet = await demuxer.read();
    }
    catch(err) {
        console.err(err);
    }
    while(packet != null) {
        try {
            let dec_result = await decoder.decode(packet);
            for(var i in dec_result.frames.length) {
                for(var j in dec_result.frames[i].data.length) {
                    writeStream.write(dec_result.frames[i].data[j]);
                }
            }
        }
        catch(err) {
            console.err(err);
        }
        packet = await demuxer.read();
    }
    let frames = await decoder.flush();
    if(frames.frames.length) {
        for(var j in frames.frames[i].data.length) {
            writeStream.write(frames.frames[i].data[j]);
        }
    }
    writeStream.end();
    console.info(`Finished decoding FLAC file.`);
})()
