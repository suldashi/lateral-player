import React from "react";
import autoBind from "react-auto-bind";
import {Link} from "react-router-dom";
import GlobalSearch from "../global-search/global-search";
import Playlist from "../playlist/playlist";
import FlexContainer from "../containers/flex-container";
import {Play, Pause, Backwards, Forwards, Volume, Star, Music} from "../icons";
import WebPlayer from "../web-player";
import "./sidebar.scss";
import Track from "../track";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isPlaying: false,
            tracks: [],
            fftAverage: 64
        }
        this.player = null;
    }

    initPlayer() {
        this.player = new WebPlayer();
        this.player.onProgress = (track, fftAverage) => {
            console.log(fftAverage);
            this.setState({
                fftAverage:fftAverage>64?fftAverage:64
            });
        };
        this.player.onPlaylistChanged = this.updatePlaylist;
    }

    updatePlaylist(tracks) {
        this.setState({
            tracks
        });
    }

    IconContainer(props) {
        let Icon = props.icon;
        if(Icon) {
            return <div onClick={props.onClick} className="player-icon"><Icon disabled={props.disabled} size="small" /></div>
        }
        else {
            return <div onClick={props.onClick} className="player-icon-spacer"></div>
        }
        
    }

    playerPrev(ev) {
        if(!this.player) {
            this.initPlayer();
        }
        this.player.playPrevious();
    }

    playerPlay(ev) {
        if(!this.player) {
            this.initPlayer();
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        },() => {
            this.player.togglePlayPause();
        });
    }

    playerNext(ev) {
        if(!this.player) {
            this.initPlayer();
        }
        this.player.playNext();
    }

    playerVolume(ev) {
        if(!this.player) {
            this.initPlayer();
        }
        this.player.seek(100);
    }

    playerAdd(ev) {
        if(!this.player) {
            this.initPlayer();
        }
        this.player.addTrack(new Track("FooTrack", "FooArtist", "FooAlbum", "/public/uploads/6.mp3"));
        this.player.addTrack(new Track("BarTrack", "BarArtist", "BarAlbum", "/public/uploads/7.mp3"));
    }

    render() {
        return <div className="sidebar">
            <FlexContainer className="search-container"> 
                <Link className="sidebar-logo" to="/"><Music strokeWeight={this.state.fftAverage} size="small" /></Link>
                <GlobalSearch />
            </FlexContainer>
            <Playlist tracks={this.state.tracks} />
            <FlexContainer className="player-bar">
                <this.IconContainer onClick={this.playerPrev} icon={Backwards} disabled={!this.state.isPlaying} />
                <this.IconContainer onClick={this.playerPlay} icon={this.state.isPlaying?Pause:Play} />
                <this.IconContainer onClick={this.playerNext} icon={Forwards} disabled={!this.state.isPlaying} />
                <this.IconContainer onClick={this.playerVolume} icon={Volume} disabled={!this.state.isPlaying} />
                <this.IconContainer />
                <this.IconContainer />
                <this.IconContainer onClick={this.playerAdd} icon={Star} />
            </FlexContainer>
        </div>
    }
}