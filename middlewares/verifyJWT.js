const jwt = require('jsonwebtoken')
require('dotenv').config()



const verifyJWT = (req, res, next) =>{
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({message: 'Inavalid or expired Token provider !'});
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json({message: err});
        req.userData = decoded;
        next();
      });
    } catch (e) {
      return res.status(401).json({
        message: "Invalid or Expired Token provided !",
        error: e,
      });
    }
          
}

module.exports = verifyJWT