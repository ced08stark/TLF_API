const {Question} = require("../models/Question");
const {User} = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");



const getQuestions = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const questions = await Question.find().exec();
    if (questions?.length <= 0)
      return res.status(404).json({ message: `No questions found` });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuestion = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "question id required" });
    const question = await Question.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!question)
      return res.status(404).json({ message: `No question found for id ${req.params.id}` });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addQuestion = async (req, res) => {
  try {
    const files = req.files;
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    console.log(req?.body?.duree)
    const newQuestion = new Question({
      numero: parseInt(req?.body?.numero),
      //libelle: '',files[0].filename,
      libelle: req?.body?.libelle,
      consigne: req?.body?.consigne,
      duree: parseInt(req?.body?.duree),
      categorie: req?.body?.categorie,
      suggestions: req?.body?.suggestions,
      discipline: req?.body?.discipline,
      // Ajoutez d'autres disciplines si nécessaire
    });
    console.log(newQuestion);
    const result = await Question.create(newQuestion);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateQuestion = async (req, res) => {
  const id = req?.params?.id
  try {
    const files = req.files;
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const questionUpdate = new Question({
      _id: id,
      numero: parseInt(req?.body?.numero),
      //libelle: files[0].filename,
      libelle: req?.body?.libelle,
      consigne: req?.body?.consigne,
      duree: parseInt(req?.body?.duree),
      categorie: req?.body?.categorie,
      suggestions: req?.body?.suggestions,
      discipline: req?.body?.discipline,
    });
    console.log(id)
    const result = await Question.findByIdAndUpdate(id, questionUpdate);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "question id required" });
    const question = await Question.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!question)
      return res
        .status(204)
        .json({ message: `No question matches ID ${req.body.id}` });
    const result = await Question.deleteOne({ _id: new ObjectId(req.params.id) });
    if(result){
      
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {getQuestions, getQuestion, addQuestion, deleteQuestion, updateQuestion}