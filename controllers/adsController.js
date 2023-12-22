const { Ads } = require("../models/Ads");
const { User } = require("../models/User");
const { ObjectId } = require("mongodb");

const getAllAds = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });

    const ads = await Ads.find().exec();
    if (ads?.length <= 0)
      return res.status(201).json({ message: `No ads found` });
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAds = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    
    const ads = await Ads.findOne({
      _id: new ObjectId(req.body.id),
    }).exec();
    if (!ads)
      return res.status(404).json({ message: `No ads found` });
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.mesage });
  }
};

const addAds = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newAds = new Ads({
      nomPrestataire: req?.body?.libelle,
      startDate: req?.body?.startDate,
      endDate: req?.body?.endDate,
      countClic: 0,
      linkTarget: req?.body?.linkTarget,
      adsPicture: req?.body?.adsPicture,
      localisation: req?.body?.localisation
    });

    const result = await Ads.create(newAds);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateAds = async (req, res) => {
  const id = req?.params?.id;
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    const newAds = new Ads({
      _id: id,
      nomPrestataire: req?.body?.libelle,
      startDate: req?.body?.startDate,
      endDate: req?.body?.endDate,
      countClic: req?.body?.countClic,
      linkTarget: req?.body?.linkTarget,
      adsPicture: req?.body?.adsPicture,
      localisation: req?.body?.localisation
    });
    const result = await Ads.findByIdAndUpdate(id, newAds, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAds = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userData.userId }).exec();
    if (!currentUser)
      return res.status(400).json({ message: "Invalide User ID" });
    if (!req?.params?.id)
      return res.status(400).json({ message: "ADS id required" });
    const ads = await Ads.findOne({
      _id: new ObjectId(req.params.id),
    }).exec();
    if (!ads)
      return res
        .status(404)
        .json({ message: `No ads matches ID ${req.params.id}` });
    const result = await Ads.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAds,
  getAllAds,
  addAds,
  deleteAds,
  updateAds,
};
