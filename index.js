const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromise = require('fs').promises;
const {logEvent }= require('./middlewares/logEvent')
const EventEmitter = require('events')


class Emitter extends EventEmitter{}

const myEmitter = new Emitter() 
myEmitter.on("log", (msg, fileName) => logEvent(msg, fileName));
const PORT = process.env.PORT || 3500;
const serveFile = async(filePath, contentType, response)=>{
    try{
        const rawData = await fsPromise.readFile(filePath, !contentType.includes('image')?'utf-8': '')
        const data =
          contentType == 'application/json' ? JSON.parse(rawData) : rawData

          response.writeHead(filePath.includes('404.html')? 404 : 200, {
            "Content-type": contentType,
          });
        response.end(contentType == 'application/json'? JSON.stringify(data) : data )

    }
    catch(err){
        console.log(err)
        myEmitter.emit("log", `${err.name} : ${err.message}`, "errlog.txt");
        response.statusCode = 500
        response.end()
    }
    
}
const server = http.createServer((req, res)=>{
    myEmitter.emit("log", `${req.url}\t${req.method}`, 'reqlog.txt');
    const extension = path.extname(req.url)
    let contentType

    switch (extension) {
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "text/javascript";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".jpg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".txt":
        contentType = "text/plain";
        break;

      default:
        contentType = "text/html";
        break;
    }

    let filePath =
      contentType === "text/html" && req.url === "/"
        ? path.join(__dirname, "views", "index.html")
        : contentType === "text/html" && req.url.slice(-1) === "/"
        ? path.join(__dirname, "views", req.url, "index.html")
        : contentType === "text/html"
        ? path.join(__dirname, 'views', req.url)
        : path.join(__dirname, req.url)

    if(!extension && req.url.slice(-1) != '/') filePath += '.html'

    const fileExists = fs.existsSync(filePath)
    if(fileExists){
        serveFile(filePath, contentType, res)
    }else{
        switch (path.parse(filePath)) {
          case "old-page.html":
            res.writable(301, { 'Location': '/new-page.html' });
            res.end();
            break;
          case "www-page.html":
            res.writable(301, { 'Location' : '/' });
            res.end();
            break;
        default:
            serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
        console.log()
    }
    console.log(req.url, req.method)
})

server.listen(PORT, ()=>{
    //console.log(`Server running on port ${PORT}`)
})







