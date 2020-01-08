const { Transform  } = require('stream');
let oldConsole = console.log;
console.log = () => {}; //suppress initialization GPL message
const beamcoder = require("beamcoder");
console.log = oldConsole;

const PassThrough = require("stream").PassThrough;

class FlacToPCM extends Transform  {

    constructor() {
        super();
        this.counter = 0;
        this.pt = new PassThrough();
        this.on("pipe", async (sourceStream) => {
            this.sourceStream = sourceStream;
            this.sourceStream.unpipe(this);
            this.demuxerStream = beamcoder.demuxerStream({highwaterMark: 65536});
            this.sourceStream.pipe(this.demuxerStream);
            this.demuxer = await this.demuxerStream.demuxer({name:"flac"});
            this.sampleRate = this.demuxer.streams[0].codecpar.sample_rate;
            this.inputFormat = this.demuxer.streams[0].codecpar.format;
            this.inputChannels = this.demuxer.streams[0].codecpar.channels;
            console.info(`Input sample rate: ${this.sampleRate}`);
            console.info(`Input format: ${this.inputFormat}`);
            console.info(`Input channels: ${this.inputChannels}`);
            this.decoder = beamcoder.decoder({demuxer: this.demuxer, stream_index: 0});
            let packet = {};
            try {
                packet = await this.demuxer.read();
            }
            catch(err) {
                console.error(err);
            }
            while(packet != null) {
                try {
                    let dec_result = await this.decoder.decode(packet);
                    for(var i in dec_result.frames) {
                        for(var j in dec_result.frames[i].data) {
                            let data = dec_result.frames[i].data[j];
                            if(data.length !== 32768) {
                                let newBuf = Buffer.alloc(data.length);
                                data.copy(newBuf, 0, 0, newBuf.length);
                                this.push(newBuf);
                            }
                            else {
                                this.push(data);
                            }
                            
                        }
                    }
                }
                catch(err) {
                    console.error(err);
                }
                packet = await this.demuxer.read();
            }
            let frames = await this.decoder.flush();
            if(frames.frames.length > 0) {
                for(var j in frames.frames[i].data) {
                    this.push(frames.frames[i].data[j]);
                }
            }
        })
    }

    async _transform(chunk, encoding, done) {
        done();
    }
}

module.exports = FlacToPCM;