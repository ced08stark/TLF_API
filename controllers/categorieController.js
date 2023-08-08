const { Categorie } = require("../models/Categorie");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");

const getCategories = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const categories = await Categorie.find().exec();
    if (categories?.length <= 0)
      return res.status(404).json({ message: `No categories found` });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategorie = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "discipline id required" });
    const categorie = await Categorie.findOne({
      _id: new ObjectId(req.body.id),
    }).exec();
    if (!categorie)
      return res.status(404).json({ message: `No discipline found` });
    res.status(200).json(categorie);
  } catch (err) {
    res.status(500).json({ message: err.mesage });
  }
};

const addCategorie = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newCategorie = new Discipline({
      libelle: req?.body?.libelle,
      point: parseInt(req?.body?.point),
    });
    const result = await Categorie.create(newCategorie);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateCategorie = async (req, res) => {
  const id = req?.params?.id;
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newCategorie = new Categorie({
      _id: id,
      libelle: req?.body?.libelle,
      point: parseInt(req?.body?.point),
    });
    const result = await Categorie.findByIdAndUpdate(id, newCategorie, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "user id required" });
    const user = await Discipline.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!user)
      return res
        .status(404)
        .json({ message: `No user matches ID ${req.params.id}` });
    const result = await Categorie.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCategorie,
  getCategories,
  addCategorie,
  deleteCategorie,
  updateCategorie,
};
