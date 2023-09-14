const { QuestionEE } = require("../models/QuestionEE");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getEEQuestions = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const questions = await QuestionEE.find().exec();
    if (questions?.length <= 0)
      return res.status(404).json({ message: `No questions found` });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEEQuestion = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "question id required" });
    const question = await QuestionEE.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!question)
      return res
        .status(404)
        .json({ message: `No question found for id ${req.params.id}` });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEEQuestion = async (req, res) => {
  try {
    const files = req.files;
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    console.log(req?.body?.duree);
    const newQuestion = new QuestionEE({
      numero: parseInt(req?.body?.numero),
      consigne: req?.body?.consigne,
      images: req?.body?.images,
      typeProduction: req?.body?.typeProduction
      // Ajoutez d'autres disciplines si nécessaire
    });
    console.log(newQuestion);
    const result = await Question.create(newQuestion);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEEQuestion = async (req, res) => {
  const id = req?.params?.id;
  try {
    const files = req.files;
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const questionUpdate = new QuestionEE({
      _id: id,
      numero: parseInt(req?.body?.numero),
      consigne: req?.body?.consigne,
      images: req?.body?.images,
      typeProduction: req?.body?.typeProduction,
    });
    console.log(id);
    const result = await QuestionEE.findByIdAndUpdate(id, questionUpdate);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEEQuestion = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "question id required" });
    const question = await QuestionEE.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!question)
      return res
        .status(204)
        .json({ message: `No question matches ID ${req.body.id}` });
    const result = await QuestionEE.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result) {
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEEQuestion,
  getEEQuestions,
  addEEQuestion,
  deleteEEQuestion,
  updateEEQuestion,
};
