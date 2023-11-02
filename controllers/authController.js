const {User} = require("../models/User");
const { OTP } = require("../models/OTP");
const generateOTP = require('./../middlewares/generateOTP')
const sendEmail = require('./../middlewares/sendMail')
const { UserVerification } = require("../models/UserVerification");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const {v4: uuidv4} = require('uuid');
const { hashData, verifyHashedData } = require("../middlewares/hashedData");

//mailer send
// let transport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '',
//     pass: ''
//   }
// })

// transport.verify((error, success)=>{
//   if(error){
//     console.log(error)
//   }
//   else{
//     console.log('ready to message')
//     console.log(success)
//   }
// })

// const sendVerificationEmail = ({_id, email}, res)=>{
//   const currentUrl = 'http://localhost:3500'

//   const uniqueString = uuidv4() + _id;
//   const mailOptions = {
//     from: "",
//     to: email,
//     subject: "verify your mail",
//     html: `<p>verify your email address to complete de signup and login into your account</p><p>this link <b>expire in 6 hours</b></p><p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed .</p>`,

//   };

//   const saltRounds = 10;
//   bcrypt
//    .hash(uniqueString, saltRounds)
//    .then((hashedUniqueString) => {
//       const newVerification = new UserVerification({
//         userId: _id,
//         uniqueString: hashedUniqueString,
//         createdAt: Date.now(),
//         expireAt: Date.now() + 21600000,
//       })

//       newVerification.save().then(()=>{
//         transport.sendMail(mailOptions)
//         .then(()=>{
//           res.json({
//             status: "Pending",
//             message: "verification email send",
//           });
//         })
//         .catch((error) =>{
//           console.log(error)
//           res.json({
//             status: "Failed",
//             message: "verification email failed",
//           });
//         })
//       }).catch((error) =>{
//         console.log(error)
//       })
//    })
//    .catch(()=>{
//       res.json({
//         status: "Failed",
//         message: "Empty credentials supplied while hashing email data",
//       })
//    })
// }

const verifyOTP = async(req, res) =>{
  
  try {
    let { email, otp } = req.body;

     if(!(email && otp)){
      throw Error("Provider values for email, otp");
    }

    const matchedOTPRecord = await OTP.findOne({
      email
    }) 

    if(!matchedOTPRecord){
      throw Error('No otp reords found')
    }
    const {expiresAt} = matchedOTPRecord;

    if(expiresAt < Date.now()){
        await OTP.deleteOne({email});
        throw Error('code has expired. request for a new one')
    }

    const hashedOTP = matchedOTPRecord.otp
    const validOTP = await verifyHashedData(otp, hashedOTP)
    
    //const validOTP = await verifyOTP({email, otp})
    res.status(200).json({valid: validOTP});
  } catch (error) {
    res.status(400).send(error.message);
  }
   
}

const resetUserPassword = async(req, res)=>{

  try{
    const {email, newPassword, otp} = req.body
      //verify otp
      if (!(email && otp)) {
        throw Error("Provider values for email, otp");
      }

      const matchedOTPRecord = await OTP.findOne({
        email,
      });

      if (!matchedOTPRecord) {
        throw Error("No otp reords found");
      }
      const { expiresAt } = matchedOTPRecord;

      if (expiresAt < Date.now()) {
        await OTP.deleteOne({ email });
        throw Error("code has expired. request for a new one");
      }

      const hashedOTP = matchedOTPRecord.otp;
      const validOTP = await verifyHashedData(otp, hashedOTP);

      if(!validOTP){
        throw Error("invalide code passed, check your inbox")
      }

       if (newPassword.length < 8) {
         throw Error("password is too short");
       }
       const hashedNewPassword = await hashData(newPassword)
       await User.updateOne({ email }, { password: hashedNewPassword });

       await OTP.deleteOne({ email });
         //const validOTP = await verifyOTP({email, otp}
      res.status(200).json({email, passwordReset: true})
  }
  catch(error){
      res.status(400).send(error.message)
  }

}

const sendPasswordResetOtpEmail = async(req, res)=>{
  
  try{
    const { email } = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw Error('There\'s not account for the provider email')
    }

    await OTP.deleteOne({ email });

    const generatedOTP = await generateOTP();
    const otpDetails = {
      email,
      subject: 'password reset',
      message: 'Enter the code below to reset your password',
      duration: 1
    }

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: otpDetails.email,
      subject: otpDetails.subject,
      html: `<p>${otpDetails.message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>this code <b>expires in ${otpDetails.duration}  hour(s)</b></p>`,
    };

    await sendEmail(mailOptions);
    const hashedOTP = await hashData(generatedOTP);

    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      created: Date.now(),
      expireAt: Date.now() + 3600000 * otpDetails.duration,
    });

    const createdOTPRecord = await newOTP.save();
    if (createdOTPRecord) {
      res.status(200).json(createdOTPRecord);
    } else {
      res.status(204).json("no content");
    }
  }
  catch(error){
    res.status(400).json(error.message);
  }
}


const deleteOTP = async (email)=>{
  try{
    await OTP.deleteOne({email});

  }
  catch(error){
    throw error;
  }
}

const sendOTP = async (req, res)=>{
    try{
        const {email, subject, message, duration} = req.body;
        
        if(!(email && subject && message)){
          throw Error("provider value for email, subject, message")
        }
        await OTP.deleteOne({email});

        const generatedOTP = await generateOTP()
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject,
          html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>this code <b>expires in ${duration}  hour(s)</b></p>`,
        };

        await sendEmail(mailOptions)
        const hashedOTP = await hashData(generatedOTP)
        const newOTP = await new OTP({
          email,
          otp: hashedOTP,
          created: Date.now(),
          expireAt: Date.now() + 3600000 * duration,
        });

        const createdOTPRecord = await newOTP.save()
        if (createdOTPRecord){
          res.status(200).json(createdOTPRecord);
        }
        else{
          res.status(204).json("no content");
        }

    }
    catch(error){
      throw error;
    }
}


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

module.exports = { handleLogin, handleRegister, handleLogout, sendOTP, verifyOTP, sendPasswordResetOtpEmail, resetUserPassword };
