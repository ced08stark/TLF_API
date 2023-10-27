const {User} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res)=>{
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
                        jwt.sign(
                          {
                            email: foundUser.email,
                            userId: foundUser.id,
                          },
                          process.env.ACCESS_TOKEN,
                          {expiresIn: '1d'},
                        async function (error, token) {
                            const newUser = new User({
                            _id: foundUser.id,
                            email: foundUser.email,
                            password: foundUser.password,
                            role: foundUser.role,
                            phone: foundUser.phone,
                            pays: foundUser.pays,
                            userToken: token,
                            remain: foundUser.remain
                          });
                          console.log(newUser)
                          const result = await User.findByIdAndUpdate(foundUser.id, newUser, {
                            new: true, // Retourne l'utilisateur mis à jour
                          });
                          if(result){
                            res.status(200).json({
                            message: "Authentication successful",
                            role: foundUser.role,
                            token
                          });
                    }    
              }
            );
        
        
     
        
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
