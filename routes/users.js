const express = require("express");
const multer = require("multer"); // require multer

const router = express.Router();

const diskStorage = multer.diskStorage({
  // objects in diskStorage
  destination: function (req, file, cb) {
    cb(null, "images"); //null= error handling here?//static path //path to folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); //null= error handling here? //pseudo randomfilename
  },
}); // multer.diskStorage method

const upload = multer({ storage: diskStorage }); // store path and filename settings

const db = require("../data/database"); // require the mongodb connection

//routing middlewares

//anyway just label all the middlewares you use now! because you clearly cant fucking see
router.get("/", async function (req, res) {
  const user = await db.getDb().collection("users").find().toArray();

  res.render("profiles", { userKey: user });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("img"), async function (req, res) {
  const uploadImage = req.file;
  const userData = req.body;

  /* console.log(uploadImage);
  console.log(userData); */
  await db.getDb().collection("users").insertOne({
    name: userData.username, //from input name in HTML
    imagePath: uploadImage.path, // from   path: 'images\\1643167864264-SQL .png' in file request
  });

  res.redirect("/");
});

module.exports = router;
