import GaplessInit from "./gapless";

export default class WebPlayer {
    constructor() {
        this.Gapless = GaplessInit();
        this.tracks = [];
        this.onPlaylistChanged = null;
        this.player = new this.Gapless.Queue();
        this.player.onProgress = (track, nodeData) => {
            console.log(track.currentTime, nodeData)
        };
    }

    set onProgress(callback) {
        this.player.onProgress = callback;
    }

    addTrack(track) {
        this.tracks.push(track);
        this.player.addTrack({trackUrl:track.url});
        if(this.onPlaylistChanged) {
            this.onPlaylistChanged(this.tracks);
        }
    }

    playPrevious() {
        this.player.playPrevious();
    }

    playNext() {
        this.player.playNext();
    }

    seek(timeInSec) {
        this.player.seek(timeInSec);
    }

    togglePlayPause() {
        this.player.togglePlayPause();
    }
}