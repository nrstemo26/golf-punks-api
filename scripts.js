const imagesFolder = './public/images';
const dataFolder = './src/';
const fs = require('fs');
const papaparse = require('papaparse');
const papa = require('papaparse');

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
    console.log(punkName);
    return { [index]: { name: punkName, image: url } };
    // return `{'${index}': { name:'${punkName}', image: '${url}'}}`;
  });
  createCSV(files);
  let dataString = JSON.stringify(files, '{}');
  dataString = `const oy = [${files}]
  module.exports = oy`;
  fs.writeFile(`${dataFolder}db.js`, dataString, (err) => {
    console.log(err);
  });
});
const createCSV = (punks = []) => {
  const csvPunks = punks.map((punk, index) => {
    console.log(punk);
    return {
      name: punk[index].name,
      index: index,
      attribute1: null,
      attribute2: null,
      attribute3: null,
      attribute4: null,
      attribute5: null,
      'example attribute hat': Math.random() > 0.5 ? 'blue hat' : 'green hat',
      'attribute etc..': null,
      image:
        'https://golf-punks.s3.amazonaws.com/images/' +
        punk[index].image +
        '.png',
    };
  });
  const dataCsv = papaparse.unparse(csvPunks);
  fs.writeFile(`${dataFolder}db.csv`, dataCsv, (err) => {
    console.log(err);
  });
};
