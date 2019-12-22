import fetchChunk from "fetch-chunk";

export default class Track {
    constructor(url) {
        this.url = url;
        this.audioContext = null;
        this.sourceNode = null;
        this.buffer = null;
        this.started = false;
        this.first = false;
        this.decoderWorker = getNewOpusWorker();
        this.decoderWorker.onmessage = (message) => {
            if(!this.first) {
                let fooLeft = message.data.left;
                let fooRight = message.data.right;
                let newBuffer = this.audioContext.createBuffer(2, message.data.samplesDecoded, 48000);
                let newSourceNode = this.audioContext.createBufferSource();
                var leftBuffer = newBuffer.getChannelData(0);
                var rightBuffer = newBuffer.getChannelData(1);
                leftBuffer.set(fooLeft);
                rightBuffer.set(fooRight);
                newSourceNode.buffer = newBuffer;
                newSourceNode.connect(this.audioContext.destination);
                if(!this.started) {
                    this.started = true;
                    this.startTime = this.audioContext.currentTime;
                    this.sourceNode = newSourceNode;
                    this.sourceNode.start(0);
                }
                else {
                    this.sourceNode.stop();
                    this.sourceNode = newSourceNode;
                    this.sourceNode.start(0, this.audioContext.currentTime - this.startTime);
                }
            }
            if(message.data.finished) {
                this.decoderWorker.destroy();
            }
            
        }
    }


    async load() {
        this.audioContext = new AudioContext();
        
        let response = await fetchChunk(this.url, {onProgress: async (data, result) => {
            this.decoderWorker.postMessage({message:"opusData", data});
        }});
        this.decoderWorker.postMessage({message:"opusEnd"});
        
    }
}