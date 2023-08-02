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

const updateUser = async (req, res) => {
  const id = req.params.id;
  
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPwd,
      role: req.body.role,
      phone: req.body.phone,
      remain: 0,
    });
    const result = await User.findByIdAndUpdate(id, newUser, {
      new: true, // Retourne l'utilisateur mis à jour
      runValidators: true, // Exécute les validateurs de schéma définis dans le modèle
    });
    res
      .status(201)
      .json({ Success: `user ${email} update success`, result });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};




module.exports = { getUser, getUsers, deleteUser, getCurrentUser, updateUser };