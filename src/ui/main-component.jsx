import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {NotFoundComponent} from './not-found-component';

const io = require("socket.io-client");
const autoBind = require("react-auto-bind");

export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.socket = io();
    }

    render() {
        return <div>
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
        </div>;
    }

    HomeComponentWithProps() {
        return <HomeComponent socket={this.socket} />
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent />
    }
}