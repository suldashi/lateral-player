(async() => {
    let oldConsole = console.log;
    console.log = () => {}; //suppress initialization GPL message
    const beamcoder = require("beamcoder");
    console.log = oldConsole;
    const fs = require('fs');
    let readStream = fs.createReadStream("tt.flac");
    let writeStream = fs.createWriteStream('decoded.raw');
    let demuxerStream = await beamcoder.demuxerStream({highwaterMark: 65536});
    readStream.pipe(demuxerStream);
    let demuxer = await demuxerStream.demuxer({name:"flac"});
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
            for(var i in dec_result.frames) {
                for(var j in dec_result.frames[i].data) {
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
    if(frames.frames.length > 0) {
        for(var j in frames.frames[i].data) {
            writeStream.write(frames.frames[i].data[j]);
        }
    }
    writeStream.end();
    console.info(`Finished decoding FLAC file.`);
})()
