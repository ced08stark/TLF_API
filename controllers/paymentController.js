const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const { Paiement } = require("../models/Paiement");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");


const initPayments = async(req, res) =>{
    

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
      };
      if(parseInt(req.body.amount) == 5000 || parseInt(req.body.amount) == 8000 || parseInt(req.body.amount) == 14950 || parseInt(req.body.amount) == 24950){
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
            console.log(response.data);
            const responseComplete = await axios.put(
              `https://api.notchpay.co/payments/${response.data.transaction.reference}`,
              {
                channel: "cm.mobile",
                data: {
                  phone: "+237699974034",
                },
              },
              {
                headers: {
                  Authorization: process.env.PAYMENT_KEY,
                  "Content-Type": "application/json",
                },
              }
            );
            if(responseComplete){
                const paiement = new Paiement({
                  user: currentUser._id,
                  montant: parseInt(req.body.amount),
                });

                const responseFinish = await Paiement.create(paiement)
                if(responseFinish){
                  const newUser = new User({
                    _id: currentUser?.id,
                    email: currentUser?.email,
                    password: currentUser?.password,
                    role: currentUser?.role,
                    phone: currentUser?.phone,
                    pays: currentUser?.pays,
                    remain:
                      parseInt(req.body.amount) == 5000
                        ? new Date(
                            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                          )
                        : parseInt(req.body.amount) == 8000
                        ? new Date(
                            new Date().getTime() + 15 * 24 * 60 * 60 * 1000
                          )
                        : parseInt(req.body.amount) == 14950
                        ? new Date(
                            new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                          )
                        : parseInt(req.body.amount) == 24950
                        ? new Date(
                            new Date().getTime() + 60 * 24 * 60 * 60 * 1000
                          )
                        : null,
                  });
                  console.log(newUser);
                  const result = await User.findByIdAndUpdate(
                    currentUser?.id,
                    newUser,
                    {
                      new: true, // Retourne l'utilisateur mis à jour
                    }
                  );
                  res.status(201).json({message: 'paiement success', result});
                }
            }
          }
          
      }
      else{
        res.status(404).json({message: 'this amout don\'t exist !!!'});
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred"});
  }
}

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
    completePayments
}
