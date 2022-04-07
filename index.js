const express = require("express");
const path = require("path");
// const { HOST } = require("./src/constants");
const cors = require("cors");

// const db = require("./src/db.js");

const PORT = process.env.PORT || 3000;

const app = express()
  .set("port", PORT)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

app.use(cors());

app.get("/", function (req, res) {
  res.send("Surf Punks 2022");
});

// app.get("/api/all", async function (req, res) {
//   console.log("oy?");
//   res.send(JSON.stringify(db, null, 2));
// });

/* Gets metadata for a surfer
 */
app.get("/api/surfer/:surfer", function (req, res) {
  const surfer = req.params.surfer.toString();
  const metadata = {
    name: `${surfer}`,
    symbol: "SurfPunks",
    background_color: "somehex", // probably need this
    image: `https://${req.headers.host}/api/images/surfers/${surfer}`,
    description:
      "The second iteration of Surf Punks, evolved and ready, paddling out in to the Aquaverse.",
  };
  res.send(JSON.stringify(metadata, null, 4));
});
/* Gets metadata for a surfer that has not been revealed */
app.get("/api/trunks/:trunkType/:tokenId", function (req, res) {
  const trunkType = req.params.trunkType.toString();
  if (!["trunk-norm", "trunk-legacy"].includes(trunkType)) {
    throw new Error("invalid request");
  }
  const tokenId = req.params.tokenId.toString();
  const metadata = {
    name: `Surf Punk #${tokenId}`,
    symbol: "SurfPunks",
    image: `https://${req.headers.host}/api/images/trunks/${trunkType}`,
    description:
      "The second iteration of Surf Punks, evolved and ready, paddling out in to the Aquaverse.",
  };
  res.send(JSON.stringify(metadata, null, 4));
});

app.get("/api/images/trunks/:trunk", function (req, res) {
  const trunk = req.params.trunk.toString();
  res.sendFile(`./public/images/trunks/${trunk}.gif`, {
    root: __dirname,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
});

app.get("/api/images/surfers/:surfer", function (req, res) {
  const surfer = req.params.surfer.toString();
  res.sendFile(`./public/images/surfers/${surfer}.jpg`, { root: __dirname });
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port ", app.get("port"));
});
