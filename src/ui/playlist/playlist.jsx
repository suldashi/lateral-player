import React from "react";
import FlexContainer from "../containers/flex-container";
import "./playlist.scss";

function PlaylistItem(props) {
    return <div className="playlist-item">{props.track.name}</div>
}

export default function Playlist(props) {
    return <FlexContainer className="playlist">
        <div className="inner-playlist">
            {props.tracks.map((x, index) => <PlaylistItem key={index} track={x} />)}
        </div>
    </FlexContainer>
}