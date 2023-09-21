const { TestEE } = require("../models/TestEE");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getEETests = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const tests = await TestEE.find().populate("user").populate("serie").exec();
    if (tests?.length <= 0)
      return res.status(404).json({ message: `No tests found` });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEETest = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: `test id required ` });
    const test = await TestEE.findOne({
      _id: new ObjectId(req.params.id),
    })
      .populate("user")
      .populate("serie")
      .exec();
    if (!test) {
      return res
        .status(404)
        .json({ message: `No test found for id ${req.params.id}` });
    } else {
      if (test.user.id != req?.userData?.userId && currentUser?.role != "admin")
        return res
          .status(400)
          .json({ message: `test doesn't match with current user` });
      res.status(200).json(test);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEETestByUserId = async (req, res) => {
  try {
    const userId = req?.params?.id;
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!userId) return res.status(400).json({ message: `user id required ` });

    const user = await User.find({
      _id: userId,
    }).exec();
    if (user) {
      const test = await TestEE.find({
        user: user,
      })
        .populate("user")
        .populate("serie")
        .exec();
      if (test.length < 0) {
        return res
          .status(404)
          .json({ message: `No test found for id ${req.params.id}` });
      } else {
        if (currentUser?.role != "admin")
          return res
            .status(400)
            .json({ message: `tests doesn't match with this user` });
        res.status(200).json(test);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEETestCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const test = await TestEE.find({
      user: currentUser,
    })
      .populate("user")
      .populate("serie")
      .exec();
    // if (test?.length <= 0)
    //   return res
    //     .status(404)
    //     .json({ message: `No test found for users ${currentUser.email}` });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEETest = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newTest = new TestEE({
      serie: req?.body?.serie,
      user: currentUser?._id,
      resultat: req?.body?.resultat,
      payload: req?.body?.payload,
      status: 'en cours'
      // Ajoutez d'autres disciplines si nécessaire
    });
    const result = await Test.create(newTest);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEETest = async (req, res) => {
  const id = req?.params?.id;
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const testUpdate = new TestEE({
      _id: id,
      serie: req?.body?.serieId,
      user: currentUser?._id,
      resultat: req?.body?.resultat,
      payload: req?.body?.payload,
      status: req?.body?.status
    });
    const result = await TestEE.findByIdAndUpdate(id, testUpdate, { new: true });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEETest = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "test id required" });
    const test = await TestEE.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!test)
      return res
        .status(404)
        .json({ message: `No question matches ID ${req.params.id}` });
    const result = await TestEE.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEETests,
  getEETest,
  addEETest,
  deleteEETest,
  updateEETest,
  getEETestByUserId,
  getEETestCurrentUser,
};
