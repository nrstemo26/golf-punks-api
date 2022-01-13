const express = require('express');
const path = require('path');
const { HOST } = require('./src/constants');
const cors = require('cors');

// const db = require('./src/database').then((x) => console.log(x, 'wooo'));
const db = require('./src/db.js');
console.log(db);

const PORT = process.env.PORT || 5000;

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

// Static public files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', function (req, res) {
  res.send('Get ready for OpenSea!');
});

app.get('/api/all', async function (req, res) {
  console.log('oy?');
  res.send(JSON.stringify(db, null, 2));
});

app.get('/api/token/:token_id', function (req, res) {
  const bucketURL = `https://golf-punks.s3.amazonaws.com/images/`;
  const tokenId = parseInt(req.params.token_id).toString();
  const golfPunk = db[tokenId];
  const host = req.get('host');
  const golfPunkMetaData = {
    name: golfPunk.name,
    symbol: 'GolfPunks',
    background_color: 'somehex', // probably need this
    image: `${bucketURL}${golfPunk.image}.png`,
    description: 'golf punks!',
    attributes: [
      { trait_type: 'hat', value: golfPunk.attribute1 },
      { trait_type: 'hat', value: golfPunk.attribute2 },
      { trait_type: 'hat', value: golfPunk.attribute3 },
      { trait_type: 'hat', value: golfPunk.attribute4 },
      { trait_type: 'hat', value: golfPunk.attribute5 },
    ],
  };

  res.send(JSON.stringify(golfPunkMetaData, null, 4));
});

app.get('/api/image/:punk', function (req, res) {
  const punk = req.params.punk.toString();
  res.sendFile(`./public/images/${punk}.PNG`, { root: __dirname });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

// returns the zodiac sign according to day and month ( https://coursesweb.net/javascript/zodiac-signs_cs )
