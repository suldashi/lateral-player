import React from "react";
import autoBind from "react-auto-bind";
import {Link} from "react-router-dom";
import GlobalSearch from "../global-search/global-search";
import FlexContainer from "../containers/flex-container";
import {Play, Pause, Backwards, Forwards, Volume} from "../icons";
import "./sidebar.scss";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isPlaying: false
        }
    }

    IconContainer(props) {
        let Icon = props.icon;
        return <div onClick={props.onClick} className="player-icon"><Icon disabled={props.disabled} size="small" /></div>
    }

    playerPrev(ev) {
        console.log("player previous");
    }

    playerPlay(ev) {
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    playerNext(ev) {
        console.log("player next");
    }

    playerVolume(ev) {
        console.log("player volume");
    }

    render() {
        return <div className="sidebar">
            <FlexContainer className="search-container"> 
                <Link className="sidebar-logo" to="/"></Link>
                <GlobalSearch />
            </FlexContainer>
            <FlexContainer className="player-bar">
                <this.IconContainer onClick={this.playerPrev} icon={Backwards} disabled />
                <this.IconContainer onClick={this.playerPlay} icon={this.state.isPlaying?Pause:Play} />
                <this.IconContainer onClick={this.PlayerNext} icon={Forwards} disabled />
                <this.IconContainer onClick={this.playerVolume} icon={Volume} disabled />
            </FlexContainer>
        </div>
    }
}