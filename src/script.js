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

  image(img, 0, 0);
  const blurImgs = blurImages(img, levels);
  const resultantImg = subtractImages(blurImgs);
  const keypoints = FAST(img)
  const descriptors = BRIEF(keypoints, 128, img);
  console.log(descriptors); 

  //Drawing the keypoints NOTE: change this to best fitting keypoints
  /*for (let i = 0; i < keypoints.length; i++) {
    stroke(0, 255, 0);
    point(keypoints[i][0], keypoints[i][1]);
  }*/
}
