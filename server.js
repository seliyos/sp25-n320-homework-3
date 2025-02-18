const http = require("http");
const fs = require("fs");
const path = require("path");

const WebFile = require("./functions/webfile");

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ServerResponse} res 
 */
function app(req, res) {
    let reqUrl = req.url === "/" ? "/index.html" : req.url;
    const fileReq = new WebFile(`public${reqUrl}`);
    const filePath = path.resolve(fileReq.filename);
    const contentType = fileReq.getMimeType();

    
    if (req.url.startsWith("/images/")) {
        const imagePath = path.join(__dirname, "public", req.url);
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 - Image Not Found");
            } else {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);
            }
        });
        return;
    }

    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h2>404 - Page Not Found</h2>");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
}


const server = http.createServer(app);


const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
