let img;
//const pyramid = []; // The image pyramid containing images of different scales
const threshold = 10;
const limit = 8;
const rez = 0.5;
const levels = 2;

// Region calculation variablea
const regionRadius = 3;

function preload() {
  img = loadImage("res/book.jpeg");
}


function setup() {
  createCanvas(360, 400);
  img.resize(width, 0); // initial size of image
  img.filter(GRAY);
  pixelDensity(1);

  //getImagePyramid(img);
  // for (let i = 0; i < levels; i++) {
  //   FAST(pyramid[i]);
  //   console.log(allKeypoints[i].length);
  // }

  const blurImgs = blurImages(img, levels);
  const resultantImg = subtractImages(blurImgs);
  const keypoints = FAST(resultantImg)
  const descriptors = BRIEF(keypoints, 128, resultantImg);
  image(img, 0, 0);

  //Drawing the keypoints NOTE: change this to best fitting keypoints
  // for (let i = 0; i < allKeypoints[0].length; i++) {
  //   stroke(0, 255, 0);
  //   point(allKeypoints[0][i][0], allKeypoints[0][i][1]);
  // }
}