const { Transform  } = require('stream');
let oldConsole = console.log;
console.log = () => {}; //suppress initialization GPL message
const beamcoder = require("beamcoder");
console.log = oldConsole;

const PassThrough = require("stream").PassThrough;

class FlacToWav extends Transform  {

    constructor() {
        super();
        this.outSampleFormat = "s16";
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
            this.push(this.generateWavHeader(this.sampleRate, this.inputChannels, this.getBytesPerSample(this.inputFormat)));
            this.decoder = beamcoder.decoder({demuxer: this.demuxer, stream_index: 0});
            this.decoder.request_sample_fmt = this.outSampleFormat;
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


    /*
        R I F F W A V E F M T   d a t a - ascii literals, note the space char

        $ - Chunksize, 4 bytes - permanently set to max value,
        players and ffmpeg don't mind

        1 - Subchunk 1 size, 4 bytes - permanently set to 16 for PCM data

        F - Audio format, 2 bytes - permanently set to 1 for PCM data

        C - Number of channels, 2 bytes - set to two, modified by arg

        S - Sample rate, 4 bytes - set to 44100, modified by arg

        R - byte rate, 4 bytes - sampleRate * nrChannels * bytesPerSample
        set to 176000 by default, modified by args

        B - block align, 2 bytes - nrChannels * bytesPerSample
        set to 4 by default, modified by args

        T - bits per sample, 2 bytes - bytesPerSample * 8
        set to 16 by default, modified by args

        2 - Subchunk 2 size, 4 bytes - permanently set to max value,
        players and ffmpeg don't mind

    */
    generateWavHeader(sampleRate, nrChannels, bytesPerSample) {
        let wavBuffer = Buffer.from([
           0x52,0x49,0x46,0x46,0xFF,0xFF,0xFF,0xFF, //R I F F $ $ $ $ 
           0x57,0x41,0x56,0x45,0x66,0x6D,0x74,0x20, //W A V E f m t  
           0x10,0x00,0x00,0x00,0x01,0x00,0x02,0x00, //1 1 1 1 F F C C
           0x44,0xAC,0x00,0x00,0x10,0xB1,0x02,0x00, //S S S S R R R R
           0x04,0x00,0x10,0x00,0x64,0x61,0x74,0x61, //B B T T d a t a 
           0xFF,0xFF,0xFF,0xFF,                     //2 2 2 2
        ]);
        wavBuffer.writeUInt16LE(nrChannels, 22);
        wavBuffer.writeUInt32LE(sampleRate, 24);
        wavBuffer.writeUInt32LE(sampleRate * nrChannels * bytesPerSample, 28);
        wavBuffer.writeUInt16LE(bytesPerSample * nrChannels, 32);
        wavBuffer.writeUInt16LE(bytesPerSample * 8, 34);
        return wavBuffer;
    }
}

module.exports = FlacToWav;