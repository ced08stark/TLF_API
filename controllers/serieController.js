const {Serie} = require("../models/Serie");
const {User} = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getSeries = async (req, res) => {
  console.log(req.userData.userId);
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const series = await Serie.find()
      .populate("questions")
      .populate("eeQuestions")
      .populate("eoQuestions")
      .exec();
    if (series?.length <= 0)
      return res.status(404).json({ message: `No serie found` });
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getSerie = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "serie id required" });
    const serie = await Serie.findOne({
      _id: new ObjectId(req.params.id),
    })
      .populate("questions")
      .populate("eeQuestions")
      .populate("eoQurstions")
      .exec();
    if (!serie) return res.status(404).json({ message: `No Serie match id ${req.params.id}` });
    res.status(200).json(serie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addSerie = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    console.log(req?.body?.questions);
    const newSerie = new Serie({
      questions: req?.body?.questions,
      eeQuestions: req?.body?.eeQuestions,
      eoQuestions: req?.body?.eoQuestions,
      libelle: req?.body?.libelle,
      // Ajoutez d'autres disciplines si nécessaire
    });
    console.log(newSerie)
    const result = await Serie.create(newSerie);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSerie = async (req, res) => {
  const id = req?.params?.id
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const serieUpdate = new Serie({
      _id: id,
      questions: req?.body?.questions,
      eeQuestions: req?.body?.eeQuestions,
      eoQuestions: req?.body?.eoQuestions,
      libelle: req?.body?.libelle,
      // Ajoutez d'autres disciplines si nécessaire
    });
    const result = await Serie.findByIdAndUpdate(id, serieUpdate, {new: true});
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteSerie = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "serie id required" });
    const serie = await Serie.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!serie)
      return res
        .status(404)
        .json({ message: `No serie matches ID ${req.params.id}` });
    const result = await Serie.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSerie,
  getSeries,
  addSerie,
  deleteSerie,
  updateSerie
};
