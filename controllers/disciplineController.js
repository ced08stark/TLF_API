const {Discipline} = require("../models/Discipline");
const {User} = require("../models/User");
const { ObjectId } = require("mongodb");




const getDisciplines = async(req, res) =>{
    try{
        const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const disciplines = await Discipline.find().exec();
    if (disciplines?.length <= 0)
      return res.status(404).json({ message: `No disciplines found` });
    res.status(200).json(disciplines);
    }
    catch(err){
         res.status(500).json({ message: err.message });
    }

    
}

const getDiscipline = async (req, res) => {
    try{
  const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
  if (!currentUser)
    return res.status(400).json({ message: "Invalide User ID" });
  if (!req?.params?.id)
  return res.status(400).json({ message: "discipline id required" });
  const disciplines = await Discipline.findOne({_id: new ObjectId(req.body.id)}).exec();
  if (!disciplines)
    return res.status(404).json({ message: `No discipline found` });
  res.status(200).json(disciplines);
    }catch(err){
        res.status(500).json({message: err.mesage})
    }
};


const addDiscipline = async (req, res) => {
    try{ 
  const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
  if (!currentUser)
    return res.status(400).json({ message: "Invalide User ID" });
  const newDiscipline = new Discipline({
    libelle: req?.body?.libelle,
    duree: parseInt(req?.body?.duree)
  })
  const result = await Discipline.create(newDiscipline);
  res.status(201).json(result);
}catch(err){
    res.status(500).json({'message': err})
}
};

const updateDiscipline = async (req, res) => {
  const id = req?.params?.id;
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newDiscipline = new Discipline({
      _id: id,
      libelle: req?.body?.libelle,
      duree: parseInt(req?.body?.duree),
    });
    const result = await Discipline.findByIdAndUpdate(id, newDiscipline, {new: true});
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDiscipline = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "user id required" });
    const user = await Discipline.findOne({ _id: new ObjectId(req.params.id) }).exec();
    if (!user)
      return res
        .status(404)
        .json({ message: `No user matches ID ${req.params.id}` });
    const result = await Discipline.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {getDisciplines, getDiscipline, addDiscipline, deleteDiscipline, updateDiscipline}















