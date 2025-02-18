const path = require("path");

class WebFile {
    filename = "";

    static MimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".mp3": "audio/mpeg",
        ".mp4": "video/mp4",
    };

    constructor(filename) {
        this.filename = filename;
    }

    #getExtension() {
        return path.extname(this.filename);
    }

    getMimeType() {
        const fileExtension = this.#getExtension();
        return WebFile.MimeTypes[fileExtension] || "text/plain";
    }
}

module.exports = WebFile;
