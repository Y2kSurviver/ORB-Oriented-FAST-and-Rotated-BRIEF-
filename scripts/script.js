let img;
const keypoints = [];
let regionRadius = 5;
let threshold = 20;
let limit = 8;

function preload() {
  img = loadImage("images/me_and_buses.jpg");
}

function setup() {
  createCanvas(300, 400);
  background(0);
  img.resize(300, 0);
  img.filter(GRAY);
  
  pixelDensity(1);
  img.loadPixels();
  //loadPixels();
  for (let i = regionRadius; i < width - regionRadius; i++)
  {
    for (let j = regionRadius; j < height - regionRadius; j++)
    {
      const region = [];
      // circular region
      for (let l = -regionRadius; l <= regionRadius; l++)
      {
        for (let m = -regionRadius; m <= regionRadius; m++)
        {
          if (onCircle(i + l, j + m, i, j, regionRadius)) {
            const index = getIndex(i + l, j + m, img.width);
            region.push(index);
          }
        }
      }
      
      // Square Region
      // for (let l = -1; l < 2; l++)
      // {
      //   for (let m = -1; m < 2; m++)
      //   {
      //     const index = getIndex(i + l, j + m, img.width);
      //     region.push(index);
      //   }
      // }
      
      let current = getIndex(i, j, img.width);
      let pixel = isKeypoint(region, current, img.pixels);
      if (pixel == 1)
      {
        keypoints.push([i, j]);
      }
      // break;
    }
    // break;
  }
  
  img.updatePixels();
  
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

function getIndex(x, y, w) {
  return (x + y * w) * 4;
}

function onCircle(x, y, h, k, r) {
  const val = (x - h) * (x - h) + (y - k) * (y - k);
  return abs(val - r * r) < 0.5;
}

function FAST() {
  
}