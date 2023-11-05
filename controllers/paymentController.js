const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const { Paiement } = require("../models/Paiement");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;


const initPayments = async(req, res) =>{
    

    try {
      const currentUser = await User.findOne({
        _id: req.userData.userId,
      }).exec();
      if (!currentUser)
        return res.status(400).json({ message: "Invalide User ID" });
      const params = {
        email: currentUser.email,
        amount: 200,
        currency: req.body.currency,
        description: req.body.description,
        reference: req.body.reference,
        phone: req.body.phone,
      };
      if(parseInt(req.body.amount) == 200 || parseInt(req.body.amount) == 5000 || parseInt(req.body.amount) == 8000 || parseInt(req.body.amount) == 14950 || parseInt(req.body.amount) == 24950){
          const response = await axios.post(
            "https://api.notchpay.co/payments/initialize",
            params,
            {
              headers: {
                Authorization: process.env.PAYMENT_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          //res.status(201).json(response.data);
          if(response){
            
            const responseComplete = await axios.put(
              `https://api.notchpay.co/payments/${response.data.transaction.reference}`,
              {
                channel: req.body.channel,
                data: { phone: req.body.phone },
              },
              {
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                  Authorization: process.env.PAYMENT_KEY,
                  Host: "api.notchpay.co",
                },
              }
            );

            if(responseComplete){
              res.status(201).json({ message: "paiement initialiser avec success", result: responseComplete.data});
            }
            else{
              res.status(400).json({ message: "your account don\'t have amount necessery !!!" });
            }
          
          }
          
      }
      else{
        res.status(404).json({message: 'this amout don\'t exist for susbription !!!'});
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred"});
  }
}

const activeAccount2 = async (req, res) => {
  try{
    const ref = req.body.reference
    const currentUser = await User.findOne({
      _id: req.userData.userId,
    }).exec();
          
          const response = await axios.get(
            `https://api.notchpay.co/payments/${ref}`,
            {
              headers: {
                Authorization: process.env.PAYMENT_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data.transaction.status)

          if(response){
                 if (response.data.transaction.status == "complete") {
                   const paiement = new Paiement({
                     user: currentUser._id,
                     montant: parseInt(req.body.amount),
                   });

                   const responseFinish = await Paiement.create(paiement);
                   if (responseFinish) {
                     const newUser = new User({
                       _id: currentUser?.id,
                       email: currentUser?.email,
                       password: currentUser?.password,
                       role: currentUser?.role,
                       phone: currentUser?.phone,
                       pays: currentUser?.pays,
                       remain:
                         currentUser?.remain > Date.now()
                           ? currentUser?.remain +
                             (parseInt(req.body.amount) == 5000
                               ? new Date(
                                   new Date().getTime() +
                                     8 * 24 * 60 * 60 * 1000
                                 )
                               : parseInt(req.body.amount) == 8000 ||
                                 parseInt(paiement.montant) == 200
                               ? new Date(
                                   new Date().getTime() +
                                     16 * 24 * 60 * 60 * 1000
                                 )
                               : parseInt(req.body.amount) == 14950
                               ? new Date(
                                   new Date().getTime() +
                                     31 * 24 * 60 * 60 * 1000
                                 )
                               : parseInt(req.body.amount) == 24950
                               ? new Date(
                                   new Date().getTime() +
                                     61 * 24 * 60 * 60 * 1000
                                 )
                               : null)
                           : parseInt(req.body.amount) == 5000
                           ? new Date(
                               new Date().getTime() + 8 * 24 * 60 * 60 * 1000
                             )
                           : parseInt(req.body.amount) == 8000 ||
                             parseInt(paiement.montant) == 200
                           ? new Date(
                               new Date().getTime() + 16 * 24 * 60 * 60 * 1000
                             )
                           : parseInt(req.body.amount) == 14950
                           ? new Date(
                               new Date().getTime() + 31 * 24 * 60 * 60 * 1000
                             )
                           : parseInt(req.body.amount) == 24950
                           ? new Date(
                               new Date().getTime() + 61 * 24 * 60 * 60 * 1000
                             )
                           : null,
                     });

                     const result = await User.findByIdAndUpdate(
                       currentUser?.id,
                       newUser,
                       {
                         new: true, // Retourne l'utilisateur mis à jour
                       }
                     );
                     res
                       .status(201)
                       .json({ message: "subscription succefful", result });
                   }
                 } else if (response.data.transaction.status == "pending") {
                   res
                     .status(400)
                     .json({ message: "this paiement is pending" });
                 } else {
                   res.status(400).json({ message: "this paiement is failed" });
                 }
          }
          else{
            res.status(400).json({ message: "this reference don't exist" });
          }

       
         
    }
  
  catch(error){
      res.status(500).json({ message: "An error occurred" });
  }
};


const activeAccount = async (req, res) => {
  try {
    
    //console.log(req.headers["x-notch-signature"]);
    //console.log(secret);
    console.log('ici')
    if (req.headers["x-notch-signature"] == req.headers["x-notch-signature"]) {
      // Retrieve the request's body
      const event = res.body.event;
      console.log(res.body.data.transaction.reference);
      if (res.body.event == "payment.complete") {
          const response = await axios.get(
            `https://api.notchpay.co/payments/${res.body.data.transaction.reference}`,
            {
              headers: {
                Authorization: process.env.PAYMENT_KEY,
                "Content-Type": "application/json",
              },
            }
          );

          if (response) {
            if (response.data.transaction.status == "complete") {
              const paiement = new Paiement({
                user: currentUser._id,
                montant: parseInt(req.body.amount),
              });

              const responseFinish = await Paiement.create(paiement);
              if (responseFinish) {
                const newUser = new User({
                  _id: currentUser?.id,
                  email: currentUser?.email,
                  password: currentUser?.password,
                  role: currentUser?.role,
                  phone: currentUser?.phone,
                  pays: currentUser?.pays,
                  remain:
                    currentUser?.remain > Date.now()
                      ? currentUser?.remain +
                        (parseInt(req.body.amount) == 5000
                          ? new Date(
                              new Date().getTime() + 8 * 24 * 60 * 60 * 1000
                            )
                          : parseInt(req.body.amount) == 8000 ||
                            parseInt(paiement.montant) == 200
                          ? new Date(
                              new Date().getTime() + 16 * 24 * 60 * 60 * 1000
                            )
                          : parseInt(req.body.amount) == 14950
                          ? new Date(
                              new Date().getTime() + 31 * 24 * 60 * 60 * 1000
                            )
                          : parseInt(req.body.amount) == 24950
                          ? new Date(
                              new Date().getTime() + 61 * 24 * 60 * 60 * 1000
                            )
                          : null)
                      : parseInt(req.body.amount) == 5000
                      ? new Date(new Date().getTime() + 8 * 24 * 60 * 60 * 1000)
                      : parseInt(req.body.amount) == 8000 ||
                        parseInt(paiement.montant) == 200
                      ? new Date(
                          new Date().getTime() + 16 * 24 * 60 * 60 * 1000
                        )
                      : parseInt(req.body.amount) == 14950
                      ? new Date(
                          new Date().getTime() + 31 * 24 * 60 * 60 * 1000
                        )
                      : parseInt(req.body.amount) == 24950
                      ? new Date(
                          new Date().getTime() + 61 * 24 * 60 * 60 * 1000
                        )
                      : null,
                });

                const result = await User.findByIdAndUpdate(
                  currentUser?.id,
                  newUser,
                  {
                    new: true, // Retourne l'utilisateur mis à jour
                  }
                );
                res
                  .status(201)
                  .json({ message: "subscription succefful", result });
              }
              console.log(result)
            }
          } else {
            res.status(400).json({ message: "this reference don't exist" });
          }
      } else if (res.body.event == "payment.failed") {
        res.status(400).json({ message: "this paiement is failed" });
      } else if (res.body.event == "payment.expired") {
        res.status(400).json({ message: "this paiement is expired" });
      } console.log(event);
      // Do something with event
    }

    res.send(200);

    // const response = await axios.get(
    //   `https://api.notchpay.co/payments/${ref}`,
    //   {
    //     headers: {
    //       Authorization: process.env.PAYMENT_KEY,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log(response.data.transaction.status);

    // if (response) {
    //   if (response.data.transaction.status == "complete") {
    //     const paiement = new Paiement({
    //       user: currentUser._id,
    //       montant: parseInt(req.body.amount),
    //     });

    //     const responseFinish = await Paiement.create(paiement);
    //     if (responseFinish) {
    //       const newUser = new User({
    //         _id: currentUser?.id,
    //         email: currentUser?.email,
    //         password: currentUser?.password,
    //         role: currentUser?.role,
    //         phone: currentUser?.phone,
    //         pays: currentUser?.pays,
    //         remain:
    //           currentUser?.remain > Date.now()
    //             ? currentUser?.remain +
    //               (parseInt(req.body.amount) == 5000
    //                 ? new Date(new Date().getTime() + 8 * 24 * 60 * 60 * 1000)
    //                 : parseInt(req.body.amount) == 8000 ||
    //                   parseInt(paiement.montant) == 200
    //                 ? new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000)
    //                 : parseInt(req.body.amount) == 14950
    //                 ? new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000)
    //                 : parseInt(req.body.amount) == 24950
    //                 ? new Date(new Date().getTime() + 61 * 24 * 60 * 60 * 1000)
    //                 : null)
    //             : parseInt(req.body.amount) == 5000
    //             ? new Date(new Date().getTime() + 8 * 24 * 60 * 60 * 1000)
    //             : parseInt(req.body.amount) == 8000 ||
    //               parseInt(paiement.montant) == 200
    //             ? new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000)
    //             : parseInt(req.body.amount) == 14950
    //             ? new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000)
    //             : parseInt(req.body.amount) == 24950
    //             ? new Date(new Date().getTime() + 61 * 24 * 60 * 60 * 1000)
    //             : null,
    //       });

    //       const result = await User.findByIdAndUpdate(
    //         currentUser?.id,
    //         newUser,
    //         {
    //           new: true, // Retourne l'utilisateur mis à jour
    //         }
    //       );
    //       res.status(201).json({ message: "subscription succefful", result });
    //     }
    //   } else if (response.data.transaction.status == "pending") {
    //     res.status(400).json({ message: "this paiement is pending" });
    //   } else {
    //     res.status(400).json({ message: "this paiement is failed" });
    //   }
    // } else {
    //   res.status(400).json({ message: "this reference don't exist" });
    // }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};



const initPaypalPayment = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req.userData.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const params = {
      email: currentUser.email,
      amount: req.body.amount,
      currency: req.body.currency,
      description: req.body.description,
      reference: req.body.reference,
      channel: req.body.channel,
    };
    if (
      parseInt(req.body.amount) == 5000 ||
      parseInt(req.body.amount) == 8000 ||
      parseInt(req.body.amount) == 14950 ||
      parseInt(req.body.amount) == 24950
    ) {
      const response = await axios.post(
        "https://api.notchpay.co/payments/initialize",
        params,
        {
          headers: {
            Authorization: process.env.PAYMENT_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      //res.status(201).json(response.data);
      if (response) {
        console.log(response.data);
        const responseComplete = await axios.put(
          `https://api.notchpay.co/payments/${response.data.transaction.reference}`,
          {
            channel: req.body.channel,
            data: {
              email: req.body.paypalEmail,
            },
          },
          {
            headers: {
              Authorization: process.env.PAYMENT_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        if (responseComplete) {
          res
            .status(201)
            .json({
              message: "paiement initialiser avec success",
              result: responseComplete.data,
            });
        } else {
          res
            .status(400)
            .json({ message: "your account don't have amount necessery !!!" });
        }
      }
    } else {
      res.status(404).json({ message: "this amout don't exist !!!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


const initCardPayment = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req.userData.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const params = {
      email: currentUser.email,
      amount: req.body.amount,
      currency: req.body.currency,
      description: req.body.description,
      reference: req.body.reference,
      channel: req.body.channel,
    };
    if (
      parseInt(req.body.amount) == 5000 ||
      parseInt(req.body.amount) == 8000 ||
      parseInt(req.body.amount) == 14950 ||
      parseInt(req.body.amount) == 24950
    ) {
      const response = await axios.post(
        "https://api.notchpay.co/payments/initialize",
        params,
        {
          headers: {
            Authorization: process.env.PAYMENT_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      //res.status(201).json(response.data);
      if (response) {
        console.log(response.data);
        const responseComplete = await axios.put(
          `https://api.notchpay.co/payments/${response.data.transaction.reference}`,
          {
            channel: req.body.channel,
            data: {
              name: req.body.name,
              card_number: req.body.card_number,
             
              cvc: req.body.cvc,
            },
          },
          {
            headers: {
              Authorization: process.env.PAYMENT_KEY,
              "Content-Type": "application/json",
            },
          }
        );
       if (responseComplete) {
         res
           .status(201)
           .json({
             message: "paiement initialiser avec success",
             result: responseComplete.data,
           });
       } else {
         res
           .status(400)
           .json({ message: "your account don't have amount necessery !!!" });
       }
      }
    } else {
      res.status(404).json({ message: "this amout don't exist !!!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const checkPayments = async(req, res) =>{
    const ref = req?.params.ref
    try {
      const response = await axios.get(
        `https://api.notchpay.co/payments/${ref}`,
        {
          headers: {
            Authorization: process.env.PAYMENT_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
    
}

const completePayments = async (req, res) => {
  const ref = req?.params.ref;
  try {
    const response = await axios.put(
      `https://api.notchpay.co/payments/${ref}`,
      {
        channel: "cm.mobile",
        data: {
          phone: req?.body?.data?.phone,
        },
      },
      {
        headers: {
          Authorization: process.env.PAYMENT_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json(response.data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};


module.exports = {
    initPayments,
    checkPayments,
    completePayments,
    initCardPayment,
    initPaypalPayment,
    activeAccount
}
