const { format } = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromise = require('fs').promises;
const path = require('path')



const logEvent = async(message, logName)=>{
    const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${date}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }
        //testing
        await fsPromise.appendFile(
          path.join(__dirname, '..', "logs", logName),
          logItem
        );
    }
    catch(err){
        console.log(err)
    }
}

const logger = (req, res, next) =>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    next()
}


module.exports = {logEvent, logger};