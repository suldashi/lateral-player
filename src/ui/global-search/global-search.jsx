import React from "react";
import autoBind from "react-auto-bind";
import "./global-search.scss";

export default class GlobalSearch extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <input type='text' placeholder="Search for a track, artist, or album..." />
    }
}