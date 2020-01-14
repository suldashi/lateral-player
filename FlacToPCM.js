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
            this.demuxer = await this.demuxerStream.demuxer({name:"mp3"});
            this.sampleRate = this.demuxer.streams[0].codecpar.sample_rate;
            this.inputFormat = this.demuxer.streams[0].codecpar.format;
            this.inputChannels = this.demuxer.streams[0].codecpar.channels;
            this.bytesPerSample = this.getBytesPerSample(this.inputFormat);
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
                            let rawData = dec_result.frames[i].data[j];
                            let cutData = rawData.slice(0, dec_result.frames[i].nb_samples*this.bytesPerSample*dec_result.frames[i].channels);
                            this.push(cutData);
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

    getBytesPerSample(sample_fmt) {
        if(sample_fmt === "u8" || sample_fmt === "u8p") {
            return 1;
        }
        else if(sample_fmt === "s16" || sample_fmt === "s16p") {
            return 2;
        }
        else if(sample_fmt === "dbl" || sample_fmt === "dblp") {
            return 8;
        }
        else if(sample_fmt === "flt" || sample_fmt === "fltp") {
            return 2;   //not true, but the mp3 decoder generates 16 bit pcm samples
        }
        else {
            return 4;
        }
    }
}

module.exports = FlacToPCM;