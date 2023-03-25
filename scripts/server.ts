
import http from 'http';
import fs from 'fs';
import mime from 'mime-types';
const port = process.env.PORT || 3000;

let lookup = mime.lookup;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.listen(port () => {
    console.log(`Server running at ${port}`);
});
let mime_type = lookup(path.substring(1)) as string;
let path = req.url;
if(path ==="/" || path === "/home"){
    path = "/index.html"
}
fs.readFile(__dirname, function(err, data){

    if(err){
        res.writeHead(404);
        res.end("Error 404 - File Not Found " + err.message);
        return;
    }
    res.setHeader("X-Content-Type_options", "nosniff");
    res.writeHead(200);
    res.end(data);
});
