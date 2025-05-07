let img;
const keypoints = [];
let threshold = 10;
let limit = 8;

// Region calculation variablea
const regionRadius = 3;

function preload() {
  img = loadImage("images/book.jpeg");
}

function setup() {
  createCanvas(360, 400);
  background(0);
  
  FAST();
  image(img, 0, 0);
  
  //Drawing the keypoints
  for (let i = 0; i < keypoints.length; i++) {
    stroke(0, 255, 0);
    point(keypoints[i][0], keypoints[i][1]);
  }
}



function isKeypoint(region, current, pixels) {
  let counter = 0;
  for (let pixel of region) {
    let diff = abs(pixels[pixel] - pixels[current]);
    if (diff > threshold)
      counter++;
  }
  
  if (counter > limit)
    return 1;
  else
    return 0;
}

// Used to get the index in p5 pixel array
function getIndex(x, y, w) {
  return (x + y * w) * 4;
}

// Using midpoint circle drawing alghorithm
function getCircleRegion(cx, cy)
{
  const region = [];
  let x = 0;
  let y = regionRadius;
  let p = 1 - regionRadius;
  while (x < y) {
    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
    
    for (let l = -1; l <= 1; l++) {
      for (let m = -1; m <= 1; m++) {
        if (l != 0 && m != 0) {
          region.push(getIndex(cx + x*l, cy + y*m, img.width));
          region.push(getIndex(cx + y*l, cy + x*m, img.width));
        }
      }
    }
  }
  
  return region;
}

function FAST() {
  img.resize(width, 0);
  img.filter(GRAY);
  pixelDensity(1);
  img.loadPixels();
  
  //NOTE: loop ignors edges
  for (let i = regionRadius; i < width - regionRadius; i++) {
      for (let j = regionRadius; j < height - regionRadius; j++)
    {
      const region = getCircleRegion(i, j);
      let current = getIndex(i, j, img.width);
      let pixel = isKeypoint(region, current, img.pixels);
      if (pixel == 1)
      {
        keypoints.push([i, j]);
      }
      //break;
    }
    //break;
  }
  
  img.updatePixels();
}