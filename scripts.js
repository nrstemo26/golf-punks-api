const imagesFolder = './public/images';
const dataFolder = './';
const fs = require('fs');

fs.readdir(imagesFolder, (err, files) => {
  files = files.map((punk, index) => {
    let punkName = punk.replace(/\.[^/.]+$/, '');

    punkName = punkName.replace(' -', '-');
    punkName = punkName.replace(" '", "'");
    if (punkName && punkName[punkName.length - 1] === ' ') {
      punkName = punkName.substring(0, punkName.length - 1);
    }
    console.log('____');
    console.log(punkName.length);
    return `{'${index}': { name:'${punkName}'}}`;
  });
  console.log(files.toString());
  let dataString = JSON.stringify(files, '{}');
  dataString = `const oy = [${files}]
  module.exports = oy`;
  //   fs.writeFile();
  fs.writeFile(`${dataFolder}test.js`, dataString, (err) => {
    console.log(err);
  });
});
