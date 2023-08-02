const {logEvent} = require('./logEvent')

const errorHandle = (err, req, res, next) => {
    logEvent(`${err.name}: ${err.message}`, 'errLog.txt')
    res.status(500).send(err.message);
};

module.exports = errorHandle;