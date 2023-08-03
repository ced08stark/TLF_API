const {User} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async(req, res)=>{
    const { email, password } = req.body;
    
    try{
        if (!email || !password)
            return res
            .status(400)
            .json({ message: "Username and password are require" });
        const foundUser = await User.findOne({email: email})
        if(!foundUser) return res.status(401).json({'message': 'unauthorized'})//unauthorized
        console.log(foundUser)
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
        jwt.sign(
          {
            email: foundUser.email,
            userId: foundUser.id,
          },
          process.env.ACCESS_TOKEN,
           function (error, token) {
            res.status(200).json({
              message: "Authentication successful",
              token,
            });
          }
        );
    }
    }
    catch(err){
        res.status(500).json({message: err})
    }
    
}

const handleRegister = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are require" });

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.status(400).json({'message': 'conflic same user exist'}); //conflic
  
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPwd,
      role: req.body.role,
      phone: req.body.phone,
      pays: req.body.pays,
      remain: null,
    });
    const result = await User.create(newUser);
    res
      .status(201)
      .json({ Success: `new user ${email} created success`, result });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {handleLogin, handleRegister}
