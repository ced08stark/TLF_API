const {Test} = require("../models/Test");
const {User} = require("../models/User");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");


const getTests = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const tests = await Test.find()
      .populate("user")
      .populate({
        path: "serie",
        populate: { path: "eeQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "eoQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "questions" },
      })
      .exec();
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
    })
      .populate("user")
      .populate({
        path: "serie",
        populate: { path: "eeQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "eoQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "questions" },
      })
      .exec();
    if (!test){
         return res
           .status(404)
           .json({ message: `No test found for id ${req.params.id}` });
    }
    else{
        if (
          test.user.id != req?.userData?.userId && currentUser?.role != 'admin'
        )
          return res
            .status(400)
            .json({ message: `test doesn't match with current user` });
        res.status(200).json(test);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getTestByUserId = async (req, res) => {
  try {
    const userId = req?.params?.id;
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!userId)
      return res.status(400).json({ message: `user id required ` });
    
    const user = await User.find({
      _id: userId,
    })
    .exec();
    if (user){
        const test = await Test.find({
          user: user,
        })
          .populate("user")
          .populate({
            path: "serie",
            populate: { path: "eeQuestions" },
          })
          .populate({
            path: "serie",
            populate: { path: "eoQuestions" },
          })
          .populate({
            path: "serie",
            populate: { path: "questions" },
          })
          .exec();
        if (test.length < 0) {
          return res
            .status(404)
            .json({ message: `No test found for id ${req.params.id}` });
        } else {
          if (
            currentUser?.role != "admin"
          )
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

const getTestCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req?.userData?.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const test = await Test.find({
      user: currentUser,
    })
      .populate("user")
      .populate({
        path: "serie",
        populate: { path: "eeQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "eoQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "questions" },
      })
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

const getLastTestCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: req?.userData?.userId,
    }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const test = await Test.find({
      user: currentUser,
    })
      .populate("user")
      .populate({
        path: "serie",
        populate: { path: "eeQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "eoQuestions" },
      })
      .populate({
        path: "serie",
        populate: { path: "questions" },
      })
      .exec();
    if (test?.length <= 0)
      res
        .status(201)
        .json({
          message: `No test found for users ${currentUser.email}`,
          test: {},
        });
    res.status(200).json(test[0]);
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
      serie: req?.body?.serie,
      user: currentUser?._id,
      resultat: req?.body?.resultat,
      payload: req?.body?.payload
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
      serie: req?.body?.serieId,
      user: currentUser?._id,
      resultat: req?.body?.resultat,
      payload: req?.body?.payload,
    });
    const result = await Test.findByIdAndUpdate(id, testUpdate, { new: true });
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
    res.status(500).json({ message: err.message })
  }
};

module.exports = {
  getTests,
  getTest,
  addTest,
  deleteTest,
  updateTest,
  getTestByUserId,
  getTestCurrentUser,
  getLastTestCurrentUser
};