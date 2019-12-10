import React from "react";
import autoBind from "react-auto-bind";
import "./sidebar.scss";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div className="sidebar">this is the sidebar</div>
    }
}