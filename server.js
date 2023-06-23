const http = require("http");
const fs = require('fs');
const port = 3000;

//create server
const server = http.createServer((req, res) => {
    res.write("hello");
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // fs.readFile('index.html', (error, data) => {
    //     if (error) {
    //         res.writeHead(404);
    //         res.write('Error: file not found');
    //         console.log("error")
    //     } else {
    //         res.write(data);
    //     }
    // })
    res.end()
});

server.listen(port, (error) => {
    if (error) {
        console.log("somthing went wrong", error);
    }
    else {
        console.log('server is listening on port ' + port);
        //connect db
    }
})
