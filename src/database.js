const fs = require('fs');
const imageFolder = './public/images';
let golfPunks;
console.log(__dirname);
module.exports = new Promise(function (resolve, reject) {
  fs.readFileSync(imageFolder, (err, files) => {
    golfPunks = files.map((punk) => {
      let punkName = punk.replace(/\.[^/.]+$/, '');
      punkName = punkName.replace(' -', '-');
      return { name: punkName, fileName: punk, background: 'some color' };
    });
    resolve(golfPunks);
  });
});
