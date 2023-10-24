const {User} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async(req, res)=>{
  console.log("ici");
    const { email, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    try{
      
        if (!email || !password)
            return res
            .status(400)
            .json({ message: "Username and password are require" });
        const foundUser = await User.findOne({email: email})
        if(!foundUser) return res.status(401).json({'message': 'unauthorized'})//unauthorized
       
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
      if (foundUser.isOnline == false) {
        const newUser = new User({
          _id: foundUser._id,
          email: foundUser.email,
          password: foundUser.password,
          role: foundUser.role,
          phone: foundUser.phone,
          pays: foundUser.pays,
          isOnline: true,
          remain: foundUser.remain,
        });
       
        const result = await User.findByIdAndUpdate(foundUser._id, newUser, {
          new: true, // Retourne l'utilisateur mis à jour
        });
        if(result){
            jwt.sign(
              {
                email: foundUser.email,
                userId: foundUser.id,
              },
              process.env.ACCESS_TOKEN,
              function (error, token) {
                res.status(200).json({
                  message: "Authentication successful",
                  role: foundUser.role,
                  isOnline: result.isOnline,
                  token,
                });
              }
            );
        }
        
      }
      else{
        res.status(401).json({
          message: "this user is also connect",
        });
      }
        
    }
    else{
      res.status(401).json({
        message: "password wrong",
      });
    }
    }
    catch(err){
        res.status(500).json({message: err})
    }
    
}

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies?.jwt);
  if(!cookies?.jwt) return res.status(204).json({message: 'no content'});
 
  
  try {
     const currentUser = await User.findOne({
          _id: req?.userData?.userId,
        }).exec();

        if (!currentUser){
          res.clearCookies('jwt', {httpOnly: true})
          return res.status(400).json({ message: "Invalide User ID" });
        } 
        
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

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

module.exports = {handleLogin, handleRegister, handleLogout}
