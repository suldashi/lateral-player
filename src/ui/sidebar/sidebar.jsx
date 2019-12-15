import React from "react";
import autoBind from "react-auto-bind";
import {Link} from "react-router-dom";
import GlobalSearch from "../global-search/global-search";
import FlexContainer from "../containers/flex-container";
import {EllipsisVertical} from "../icons";
import "./sidebar.scss";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div className="sidebar">
            <FlexContainer className="search-container"> 
                <Link className="sidebar-logo" to="/"></Link>
                <GlobalSearch />
            </FlexContainer>
            <FlexContainer className="player-bar">
            </FlexContainer>
        </div>
    }
}