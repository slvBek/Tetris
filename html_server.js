const static = require('node-static');
const http = require('http');

const file = new(static.Server)(__dirname);

const PORT = 8080;

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(PORT, () => {
    console.log("Running at port" + PORT);
});