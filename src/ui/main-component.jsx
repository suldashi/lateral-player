import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {UploadComponent} from './upload-component';
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
            <section className="main-section">
                <nav className="main-nav">
                    <Link className="main-nav-item" to="/">Home</Link>
                    <Link className="main-nav-item" to="/upload">Upload</Link>
                </nav>
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="/upload" component={this.UploadComponentWithProps} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
            </section>
        </div>;
    }

    HomeComponentWithProps() {
        return <HomeComponent />
    }

    UploadComponentWithProps() {
        return <UploadComponent />
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent />
    }
}