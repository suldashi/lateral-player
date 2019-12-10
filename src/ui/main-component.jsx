import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {NotFoundComponent} from './not-found-component';
import Sidebar from "./sidebar/sidebar";

const autoBind = require("react-auto-bind");

export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div className="page-container">
            <Sidebar />
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
        </div>;
    }

    HomeComponentWithProps() {
        return <HomeComponent />
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent />
    }
}