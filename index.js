const express = require("express");
const path = require("path");
const { HOST } = require("./src/constants");
const cors = require("cors");

const db = require("./src/db.js");

const PORT = process.env.PORT || 5000;

const app = express()
  .set("port", PORT)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

app.use(cors());

app.get("/", function (req, res) {
  res.send("Get ready for OpenSea!");
});

app.get("/api/all", async function (req, res) {
  console.log("oy?");
  res.send(JSON.stringify(db, null, 2));
});

app.get("/api/token/:token_id", function (req, res) {
  const bucketURL = `https://golf-punks.s3.amazonaws.com/images/`;
  const tokenId = parseInt(req.params.token_id).toString();
  const golfPunk = db[tokenId];
  const host = req.get("host");
  const golfPunkMetaData = {
    name: golfPunk.name,
    symbol: "GolfPunks",
    background_color: "somehex", // probably need this
    image: golfPunk.image,
    description: "golf punks!",
    attributes: [
      { trait_type: "hat", value: golfPunk.attribute1 },
      { trait_type: "hat", value: golfPunk.attribute2 },
      { trait_type: "hat", value: golfPunk.attribute3 },
      { trait_type: "hat", value: golfPunk.attribute4 },
      { trait_type: "hat", value: golfPunk.attribute5 },
    ],
  };

  res.send(JSON.stringify(golfPunkMetaData, null, 4));
});

app.get("/api/images/:surfer", function (req, res) {
  const surfer = req.params.surfer.toString();
  res.sendFile(`./public/images/surfers/${surfer}.jpg`, { root: __dirname });
});

app.get("/api/trunks/:trunk", function (req, res) {
  const trunk = req.params.trunk.toString();
  res.sendFile(`./public/images/trunks/${trunk}.gif`, {
    root: __dirname,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
