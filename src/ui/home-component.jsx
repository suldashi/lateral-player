import React from "react";

const autoBind = require("react-auto-bind");

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.asyncPromiseTest().then((result) => {
            console.log(result);
        })
    }

    render() {
        return <div>
            <form method="POST" action="/upload" enctype="multipart/form-data">
                <div>
                    <label>Select a file to upload:</label>
                    <input type="file" name="track" />
                </div>
                <div>
                    <input type="submit" value="Upload" />
                </div>
            </form>
        </div>
    }

    async asyncPromiseTest() {
        return "we made it, async/await works!";
    }
}