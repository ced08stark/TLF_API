const nodemailer = require("nodemailer")


let transport = nodemailer.createTransport({
  host: process.env.AUTH_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});


transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready to message");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) =>{
    try{
        await transport.sendMail(mailOptions);
        return;
    }
    catch(error){
        throw error;
    }
}

module.exports = sendEmail;