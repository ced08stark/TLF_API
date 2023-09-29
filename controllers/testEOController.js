const { TestEO } = require("../models/TestEO");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getEOTests = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const tests = await TestEO.find().populate("user").populate("serie").exec();
    if (tests?.length <= 0)
      return res.status(404).json({ message: `No tests found` });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEOTest = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: `test id required ` });
    const test = await TestEO.findOne({
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

const getEOTestByUserId = async (req, res) => {
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
      const test = await TestEO.find({
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

const getEOTestCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const test = await TestEO.find({
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

const addEOTest = async (req, res) => {
  console.log("ici");
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newTest = new TestEO({
      serie: req?.body?.serie,
      user: req?.body?.user,
      resultat: req?.body?.resultat,
      payload: req?.body?.payload,
      status: "en cours",
      isView: false
      // Ajoutez d'autres disciplines si nécessaire
    });
    console.log(newTest);
    const result = await TestEO.create(newTest);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEOTest = async (req, res) => {
  const id = req?.params?.id;
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const testUpdate = new TestEO({
      _id: id,
      serie: req?.body?.serieId,
      user: req?.body?.user,
      resultat: req?.body?.resultat,
      payload: req?.body?.payload,
      status: req?.body?.status,
      isView: req?.body?.isView,
    });
    const result = await TestEO.findByIdAndUpdate(id, testUpdate, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEOTest = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "test id required" });
    const test = await TestEO.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!test)
      return res
        .status(404)
        .json({ message: `No question matches ID ${req.params.id}` });
    const result = await TestEO.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEOTests,
  getEOTest,
  addEOTest,
  deleteEOTest,
  updateEOTest,
  getEOTestByUserId,
  getEOTestCurrentUser,
};
