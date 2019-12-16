import Gapless from "./gapless";

export default class WebPlayer {
    constructor() {
        this.tracks = [];
        this.onPlaylistChanged = null;
        this.player = new Gapless.Queue();
        this.player.onProgress = (track) => {
            console.log(track.currentTime)
        };
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