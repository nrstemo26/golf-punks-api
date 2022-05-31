const { readdirSync, rename } = require("fs");
const { resolve } = require("path");

// Get path to image directory

const imagesFolder = "./public/images/new-surfers";
const imageDirPath = resolve(__dirname, imagesFolder);

// Get an array of the files inside the folder
let files = readdirSync(imageDirPath);

// Loop through each file that was retrieved
// const orderedFiles = files.map((file) => {
//   rename(
//     imageDirPath + `/${file}`,
//     imageDirPath + `/${file.replace(/_(.*?)\./, ".")}`,
//     (err) => console.log(err)
//   );
// });
console.log(files.length);
files = files.sort(() => Math.random() - 0.5);
console.log(files.length);
files.forEach((x, index) => {
  // console.log(x);
  const newIndex = index;
  rename(imageDirPath + `/${x}`, imageDirPath + `/${newIndex}.png`, (err) =>
    console.log(err)
  );
});
