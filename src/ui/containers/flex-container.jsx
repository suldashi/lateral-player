import "./flex-container.scss";
import React from "react";

export default function FlexContainer(props){
    return <div className={props.className?props.className+" flex-container":"flex-container"}>{props.children}</div>
}