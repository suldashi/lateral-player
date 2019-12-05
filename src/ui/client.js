import axios from "axios";
const CancelToken = axios.CancelToken;

function uploadTrack(file, progressCallback) {
    let uploadCancelToken = CancelToken.source();
    return {
        request: axios.post("/upload", file, {
            onUploadProgress: progressCallback,
            cancelToken: uploadCancelToken.token
        }),
        cancelCallback: uploadCancelToken.cancel
    };
}

export default {
    uploadTrack
};