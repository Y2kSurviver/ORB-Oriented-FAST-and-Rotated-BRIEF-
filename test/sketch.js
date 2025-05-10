let testImg;
let buffer;

function preload() {
  testImg = loadImage("res/test.jpg");
}

function setup() {
  createCanvas(360, 500);
  testImg.resize(360, 0);
  buffer = createImage(100, 100);
}

function draw() {
  buffer.copy(testImg, mouseX, mouseY, 100, 100, 0, 0, 100, 100);
  image(testImg, 0, 0);
  image(buffer, 0, 0);
}