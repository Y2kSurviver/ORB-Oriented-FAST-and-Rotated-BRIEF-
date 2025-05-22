let img;
//const pyramid = []; // The image pyramid containing images of different scales
const threshold = 10;
const limit = 8;
const rez = 0.5;
const levels = 2;
let capture;
let cropImg;
let keypoints;

// Region calculation variables
const regionRadius = 3;

function preload() {
  img = loadImage("res/book.jpeg");
}


function setup() {
  createCanvas(360, 360);
  img.resize(300, 0); // initial size of image
  img.filter(GRAY);
  pixelDensity(1);

  capture = createCapture(VIDEO, { flipped: true });
  capture.hide();
  //getImagePyramid(img);
  // for (let i = 0; i < levels; i++) {
  //   FAST(pyramid[i]);
  //   console.log(allKeypoints[i].length);
  //}
  cropImg = img.get(90, 80, 120, 180); 

  const blurImgs = blurImages(cropImg, levels);
  const resultantImg = subtractImages(blurImgs);
  //const keypoints = FAST(img); 
  keypoints = FAST(resultantImg); // after blur 
  //const descriptors = BRIEF(keypoints, 128, img);
  //console.log(descriptors); 
  //keypoints = keypoints.sort((a, b) => b.score - a.score); 
  //console.log(keypoints);
  //Drawing the keypoints NOTE: change this to best fitting keypoints
 }

function draw() {
  //capture.resize(width, 0);
  image(capture, 0, 0,  width * capture.width / capture.height,  height * capture.width / capture.height);

  image(cropImg, 0, 0);
  for (let i = 0; i < keypoints.length; i++) {
    stroke(0, 255, 0);
    circle(keypoints[i].x, keypoints[i].y, 10);
  }

}
