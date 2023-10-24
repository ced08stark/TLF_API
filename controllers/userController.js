const {User} = require('../models/User')
const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt')





const deleteUser = async (req, res) => {
    try{
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
     if (!currentUser)
       return res.status(400).json({ message: "Invalide User ID" });
    if(!req?.params?.id) return res.status(400).json({'message': 'user id required'})
    const user = await User.findOne({_id: req.params.id}).exec();
    if(!user) return res.status(204).json({'message': `No user matches ID ${req.params.id}`})
    const result = await User.deleteOne({_id: req.params.id})
    res.json(result)
    }
    catch(err){
        res.status(500).json({'message': err})
    }
}

const getUsers = async (req, res) => {
    
    try{
        const currentUser = await User.findOne({
          _id: req?.userData?.userId,
        }).exec();
        if (!currentUser)
          return res.status(400).json({ message: "Invalide User ID" });
  const users = await User.find().exec();
  if (users?.length < 0)
    return res
      .status(404)
      .json({ message: `No users found` });
  res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({message: err})
        console.log(err)
    }
};

const getUser = async (req, res) => {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "user id required" });

    try{
  
  const user = await User.findOne({ _id: new ObjectId(req?.params?.id) });
  console.log(user)
  if (!user)
    return res
      .status(404)
      .json({ message: `No user matches ID ${req.params.id}` });
  res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: err.message})

    }
};

const checkRemain = async (req, res) => {
  console.log('check remain')
    try {
      const currentUser = await User.findOne({
        _id: req?.userData?.userId,
      }).exec();
      if (!currentUser)
        return res.status(400).json({ message: "Invalide User ID" });
      
      if(!currentUser.remain || currentUser.remain < new Date(Date.now())) 
        return res.status(201).json({ message: "this account is not subscride" });
      
      const currentDate = new Date();
      const targetDate = new Date(currentUser.remain);
      const timeDiff = targetDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return res
        .status(200)
        .json({ message: `${daysDiff} remaining for this account`, remaining: daysDiff });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}


const getCurrentUser = async (req, res) => {
    
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    res.status(200).json(currentUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const setIsOnline = async (req, res) => {
    try {
      const currentUser = await User.findOne({
        _id: req?.userData?.userId,
      }).exec();
      //console.log(currentUser)
      if (!currentUser)
        return res.status(400).json({ message: "Invalide User ID" });
      const newUser = new User({
        _id: currentUser._id,
        email: currentUser.email,
        password: currentUser.password,
        role: currentUser.role,
        phone: currentUser.phone,
        pays: currentUser.pays,
        isOnline: false,
        remain: currentUser.remain,
      });
      //console.log(newUser);
      const result = await User.findByIdAndUpdate(currentUser._id, newUser, {
        new: true, // Retourne l'utilisateur mis à jour
      });
      res
        .status(201)
        .json({ Success: `user ${newUser?.email} is disOnline` })
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log('update')
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newUser = new User({
      _id: id,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      phone: req.body.phone,
      pays: req.body.pays,
      isOnline: req.body.isOnline,
      remain: req.body.remain,
    });
    console.log(newUser)
    const result = await User.findByIdAndUpdate(id, newUser, {
      new: true, // Retourne l'utilisateur mis à jour
    });
    res
      .status(201)
      .json({ Success: `user ${newUser?.email} update success`, result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






module.exports = {
  getUser,
  getUsers,
  deleteUser,
  getCurrentUser,
  updateUser,
  checkRemain,
  setIsOnline
};