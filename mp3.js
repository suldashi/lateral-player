(async() => {
    const fs = require("fs");
    const beamcoder = require("beamcoder");
    let writeFile = fs.createWriteStream("out.raw");
    let demuxer = await beamcoder.demuxer('tt.flac');
    let decoder = beamcoder.decoder({ demuxer, stream_index: 0, request_sample_fmt:"s16" });
    let packet = await demuxer.read();
    while (packet != null) {
        let dec_result = await decoder.decode(packet);
        for(var i in dec_result.frames) {
            for(var j in dec_result.frames[i].data) {
                writeFile.write(dec_result.frames[i].data[j]);
            }
        }
        packet = await demuxer.read();
    }
    let dec_result = await decoder.flush();
    for(var i in dec_result.frames) {
        for(var j in dec_result.frames[i].data) {
            writeFile.write(dec_result.frames[i].data[j]);
        }
    }
})()
