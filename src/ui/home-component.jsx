import React from "react";
import TrackUploader from "./track-uploader/track-uploader";
import Track from "./player/track";
import autoBind from "react-auto-bind"

export class HomeComponent extends React.Component {

    constructor() {
        super();
        autoBind(this);
        this.track = new Track("/public/uploads/1.opus");
    }

    loadTrack() {
        this.track.load();
    }

    render() {
        return <button onClick={this.loadTrack}>Load track</button>
    }
}