let http = require('http');
let fs = require('fs');
let url = require('url')

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let urlPath = '.' + q.pathname;

    fs.readFile(urlPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { //Error No Entry
                //File not found
                fs.readFile('./404.html', (err404, data404) => {
                    if (err404) {
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.end('404 not found')
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.write(data404)
                        res.end();
                    }
                });
            } else {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 Internal Server Error')
            }

        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }

    });

 
}).listen(5050);