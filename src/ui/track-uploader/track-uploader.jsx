import React from "react";
import autoBind from "react-auto-bind";
import "./track-uploader.scss";

import client from "../client";

export default class TrackUploader extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            selectedFile: null,
            loading: false,
            uploadProgress: 0
        }
    }

    cancelUpload() {
        this.state.cancelCallback("cancel");
    }

    async handleSubmit(ev) {
        ev.preventDefault();
        if(this.state.selectedFile) {
            const data = new FormData() 
            data.append('track', this.state.selectedFile)
            let request = client.uploadTrack(data,(ev) => {
                this.setState({
                    uploadProgress: ev.loaded/ev.total
                });
            });
            this.setState({
                loading: true,
                cancelCallback: request.cancelCallback
            });
            try {
                await request.request;
                this.setState({
                    loading: false,
                    selectedFile: null,
                    uploadProgress: 0
                })
            }
            catch(err) {
                if(err.message === "cancel") {
                    console.log("cancelled");
                }
                else {
                    console.log("some kind of error");
                }
            }
        }
        else {
            console.log("no file selected to upload");
        }
    }

    onChangeHandler(ev) {
        this.setState({
            selectedFile: ev.target.files[0]
        });
    }

    uploadInterface() {
        if(this.state.loading) {
            return <div className="progress-bar"><div className="progress-bar-display" style={{width:(this.state.uploadProgress*100)+"%"}}></div><button onClick={this.cancelUpload}>Cancel</button></div>;
        }
        else {
            
            return <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Select a file to upload:</label>
                    <input onChange={this.onChangeHandler} type="file" name="track" />
                </div>
                <div>
                    <input type="submit" value="Upload" />
                </div>
            </form>;
        }
    }

    render() {
        return <div className="uploader-container">
            <this.uploadInterface loading={this.state.loading} />
        </div>
    }
}