import "./vertical-flex-container.scss";
import React from "react";

export default function VerticalFlexContainer(props){
    return <div className={props.className?props.className+" vertical-flex-container":"vertical-flex-container"}>{props.children}</div>
}