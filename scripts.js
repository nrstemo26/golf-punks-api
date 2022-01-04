const imagesFolder = './public/images';
const dataFolder = './src/';
const fs = require('fs');

fs.readdir(imagesFolder, (err, files) => {
  files = files.map((punk, index) => {
    console.log(punk);
    let punkName = punk.replace(/\.[^/.]+$/, '');
    // this will be the image url
    const url = punk.replace(/\.[^/.]+$/, '');
    // remove spaces in name
    punkName = punkName.replace(' -', '-');
    punkName = punkName.replace(" '", "'");
    if (punkName && punkName[punkName.length - 1] === ' ') {
      punkName = punkName.substring(0, punkName.length - 1);
    }
    console.log('____');
    console.log(punkName.length);
    return `{'${index}': { name:'${punkName}', image: '${url}'}}`;
  });
  console.log(files.toString());
  let dataString = JSON.stringify(files, '{}');
  dataString = `const oy = [${files}]
  module.exports = oy`;
  //   fs.writeFile();
  fs.writeFile(`${dataFolder}db.js`, dataString, (err) => {
    console.log(err);
  });
});
