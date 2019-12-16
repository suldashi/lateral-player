import React from "react";
import FlexContainer from "../containers/flex-container";
import "./playlist.scss";

function PlaylistItem(props) {
    return <FlexContainer className="playlist-item">
        <div>
            <div>{props.track.name}</div>
            <div>{props.track.artist}</div>
        </div>
    </FlexContainer>;
}

export default function Playlist(props) {
    return <FlexContainer className="playlist">
        <div className="inner-playlist">
            {props.tracks.map((x, index) => <PlaylistItem key={index} track={x} />)}
        </div>
    </FlexContainer>
}