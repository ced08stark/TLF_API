const {Test} = require("../models/Test");
const {User} = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");


const getTests = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const tests = await Test.find().exec();
    if (tests?.length <= 0)
      return res.status(404).json({ message: `No tests found` });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTest = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: `test id required ` });
    const test = await Test.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!test)
      return res
        .status(404)
        .json({ message: `No test found for id ${req.params.id}` });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTestCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const test = await Test.findOne({
      user: currentUser
    }).exec();
    if (!test) return res.status(404).json({ message: `No test found for users ${currentUser.email}` });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const addTest = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newTest = new Test({
      questions: req?.body?.questions,
      user: currentUser,
      resultat: req?.body?.resultat
      // Ajoutez d'autres disciplines si nécessaire
    });
    const result = await Test.create(newTest);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTest = async (req, res) => {
  const id = req?.params?.id
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const testUpdate = new Test({
      _id: id,
      questions: req?.body?.questions,
      user: currentUser,
    });
    const result = await Test.findByIdAndupdate(id, testUpdate, { new: true });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const deleteTest = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "test id required" });
    const test = await Test.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!test)
      return res
        .status(404)
        .json({ message: `No question matches ID ${req.params.id}` });
    const result = await Test.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTests,
  getTest,
  addTest,
  deleteTest,
  updateTest,
  getTestCurrentUser
};