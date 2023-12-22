const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  //console.log("New Req Rec");
  const log = `${Date.now()}: ${req.method}${req.url} New Request Received\n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("Homepage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi ${username}`);
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is a Signup form");
        else if (req.method === "POST") res.end("Success");

      case "default":
        res.end("404, Page not found");
    }

    //res.end("Hello from server Again");
  });
  //res.end("Hello from server");
});

myServer.listen(8000, () => console.log("Server started"));
