const express = require("express");
const path = require("path");
// const { HOST } = require("./src/constants");
const cors = require("cors");

// const db = require("./src/db.js");

const PORT = process.env.PORT || 3000;
// const surferMapping = {
//   151
// }
const app = express()
  .set("port", PORT)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

app.use(cors());

app.get("/", function (req, res) {
  res.send("Surf Punks 2022");
});

/* Gets metadata for a surfer
 */
app.get("/api/surfer/:surfer", function (req, res) {
  const surfer = +req.params.surfer;
  const metadata = {
    name: `${surfer}`,
    symbol: "SurfPunks",
    background_color: "", // probably need this
    image: `https://${req.headers.host}/api/images/surfers/${surfer}`,
    description:
      "The second iteration of Surf Punks, evolved and ready, paddling out in to the Aquaverse.",
  };

  res.setHeader("Content-Type", "application/json");
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
    image: `https://${req.headers.host}/api/images/surfers/${tokenId}`,
    description:
      "The second iteration of Surf Punks, evolved and ready, paddling out in to the Aquaverse.",
  };

  res.setHeader("Content-Type", "application/json");
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
// image: `https://${req.headers.host}/api/images/surfers/${surfer}`,
app.get("/api/images/surfers/:surfer", function (req, res) {
  const oPointer = {
    // boba
    518: "99",
    482: "25",
    801: "429",
    //
    //wants random
    // reserve 813-837
    813: "112",
    // 814: "89",
    817: "108",
    818: "78",
    819: "87",
    820: "92",
    821: "113",
    822: "104",
    823: "97",
    824: "110",
    825: "93",
    826: "111",
    // 827: "109",

    828: "86",
    829: "103",
    830: "102",
    831: "101",
    832: "0",
    833: "105",
    //johnny add tokenid here "471"
    // add random reserve number "21"
    // 834: "397", accidental addition
    835: "64",
    785: "140",
    484: "353",
    810: "21",
    // reserve finish
  };
  const nPointer = {
    // 151: "813",

    31: "814",
    307: "815",
    455: "816",
    465: "817",
    99: "518",
    132: "818",
    311: "819",
    287: "820",
    218: "821",
    814: "817",
    525: "743",
    641: "676",
  };
  const rPointer = {
    816: "r_0",
    836: "r_14",
    837: "r_16",
    521: "r_18",
    811: "r_19",
  };
  const surfer = +req.params.surfer.toString();
  let folder = "";
  let image = "";
  if (surfer < 500) {
    folder = "surfers";
    image = surfer;
  }
  if (surfer >= 500) {
    folder = "new-surfers";
    image = surfer - 500;
  }
  if (oPointer[surfer]) {
    folder = "surfers";
    image = oPointer[surfer];
  }
  if (nPointer[surfer]) {
    folder = "new-surfers";
    image = nPointer[surfer] - 500;
  }
  if (rPointer[surfer]) {
    folder = "random-surfers";
    image = rPointer[surfer];
  }
  if (surfer > 1000) {
    res.sendFile(`./public/images/trunks/trunk-legacy.gif`, {
      root: __dirname,
    });
  } else if (image !== "") {
    res.sendFile(`./public/images/${folder}/${image}.png`, { root: __dirname });
  }
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port ", app.get("port"));
});
