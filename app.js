const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
//serve static content to the browser
// express link requests content directly in that file
//src="images\1643169471143-Screenshot 2022-01-23 211853.png" from .imagePath have /images folder path
//therefore making the img path undetected
//adding '/images', appends it to the beginning of the path search
app.use("/images", express.static("images"));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
