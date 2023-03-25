

const http = import('http');
const fs=require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
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
    res.writeHead(200);
    res.end(data);
});
