import "./flex-container.scss";
import React from "react";

export default function FlexContainer(props){
    return <div className="flex-container">{props.children}</div>
}