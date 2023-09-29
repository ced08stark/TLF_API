const { QuestionEO } = require("../models/QuestionEO");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getEOQuestions = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const questions = await QuestionEO.find().exec();
    if (questions?.length <= 0)
      return res.status(404).json({ message: `No questions found` });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEOQuestion = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "question id required" });
    const question = await QuestionEO.findOne({
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

const addEOQuestion = async (req, res) => {
  try {
    const files = req.files;
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    console.log(req?.body?.duree);
    const newQuestion = new QuestionEO({
      tasks: req?.body?.tasks,
      // Ajoutez d'autres disciplines si nécessaire
    });
    console.log(newQuestion);
    const result = await QuestionEO.create(newQuestion);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEOQuestion = async (req, res) => {
  const id = req?.params?.id;
  try {
    const files = req.files;
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const questionUpdate = new QuestionEO({
      _id: id,
      tasks: req?.body?.tasks,
    });
    console.log(id);
    const result = await QuestionEO.findByIdAndUpdate(id, questionUpdate);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEOQuestion = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "question id required" });
    const question = await QuestionEO.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!question)
      return res
        .status(204)
        .json({ message: `No question matches ID ${req.body.id}` });
    const result = await QuestionEO.deleteOne({
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
  getEOQuestion,
  getEOQuestions,
  addEOQuestion,
  deleteEOQuestion,
  updateEOQuestion,
};
