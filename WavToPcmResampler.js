const { Transform  } = require('stream');
let oldConsole = console.log;
console.log = () => {}; //suppress initialization GPL message
const beamcoder = require("beamcoder");
console.log = oldConsole;

const PassThrough = require("stream").PassThrough;

class WavToPcmResampler extends Transform  {

    constructor() {
        super();
        this.outFormat = "s16";
        this.outSampleRate = 48000;
        this.pt = new PassThrough();
        this.on("pipe", async (sourceStream) => {
            this.sourceStream = sourceStream;
            this.sourceStream.unpipe(this);
            this.demuxerStream = beamcoder.demuxerStream({highwaterMark: 65536});
            this.sourceStream.pipe(this.demuxerStream);
            this.demuxer = await this.demuxerStream.demuxer({name:"wav"});
            this.sampleRate = this.demuxer.streams[0].codecpar.sample_rate;
            this.inputFormat = this.demuxer.streams[0].codecpar.format;
            this.inputChannels = this.demuxer.streams[0].codecpar.channels;
            this.bytesPerSample = this.getBytesPerSample(this.inputFormat);
            this.channelLayout = this.demuxer.streams[0].codecpar.channel_layout;
            this.filterer = await beamcoder.filterer({
                filterType: 'audio',
                inputParams: [
                    {
                    sampleRate: this.sampleRate,
                    sampleFormat: this.inputFormat,
                    channelLayout: this.channelLayout,
                    timeBase: [0,1]
                    }
                ],
                outputParams: [
                    {
                    sampleRate: this.outSampleRate,
                    sampleFormat: this.outFormat,
                    channelLayout: this.channelLayout
                    }
                ],
                filterSpec: `aresample=isr=${this.sampleRate}:osr=${this.outSampleRate}:async=1, aformat=sample_fmts=${this.outFormat}:channel_layouts=${this.channelLayout}`
            });
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
                    let filteredFrames = await this.filterer.filter(dec_result.frames);
                    for(var i in filteredFrames) {
                        for(var j in filteredFrames[i].frames) {
                            let currentFrame = filteredFrames[i].frames[j];
                            for(var k in currentFrame.data) {
                                let rawData = currentFrame.data[k];
                                let cutData = rawData.slice(0, currentFrame.nb_samples*this.getBytesPerSample(this.outFormat)*currentFrame.channels);
                                this.push(cutData);
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
                let filteredFrames = await this.filterer.filter(frames.frames);
                for(var i in filteredFrames) {
                    for(var j in filteredFrames[i].frames) {
                        let currentFrame = filteredFrames[i].frames[j];
                        for(var k in currentFrame.data) {
                            let rawData = currentFrame.data[k];
                            let cutData = rawData.slice(0, currentFrame.nb_samples*2*currentFrame.channels);
                            this.push(cutData);
                        }
                    }
                }
            }
            this.end();
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

module.exports = WavToPcmResampler;