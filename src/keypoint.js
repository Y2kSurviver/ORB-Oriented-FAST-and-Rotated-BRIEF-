const patch = 32;

function isKeypoint(region, current, pixels) {
  let counter = 0;
  let score = pixels[current];
  for (let pixel of region) {
    let diff = abs(pixels[pixel] - pixels[current]);
    if (diff > threshold) {
      counter++;
      score -= pixels[pixel]; 
    }        
  }
  score = abs(score);
  if (counter > limit)
    return score;
  else
    return null;
}

// Using midpoint circle drawing alghorithm
function getCircleRegion(cx, cy, srcImage) {
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
          region.push(getIndex(cx + x*l, cy + y*m, srcImage.width));
          region.push(getIndex(cx + y*l, cy + x*m, srcImage.width));
        }
      }
    }
  }

  return region;
}

function FAST(srcImage) {
  const points = [];

  // for every level in the image pyramid
  srcImage.loadPixels();

  //NOTE: loop ignors edges
  /*for (let i = regionRadius; i < srcImage.width - regionRadius; i++) {
    for (let j = regionRadius; j < srcImage.height - regionRadius; j++) {
      const region = getCircleRegion(i, j, srcImage);
      let current = getIndex(i, j, srcImage.width);
      let pixel = isKeypoint(region, current, srcImage.pixels);
      if (pixel)
        points.push({ score: pixel, 
                      x: i, 
                      y: j });
      //break;
    }
    //break;
  }*/

  const cols = floor(srcImage.width / patch);
  const rows = floor(srcImage.height / patch);
  console.log(cols, rows); 
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let comparePixels = [];
      for (let offsetX = regionRadius; offsetX <= patch - regionRadius; offsetX++) {
        for (let offsetY = regionRadius; offsetY <= patch - regionRadius; offsetY++) { 
            // const index = getIndex(i + offsetX, j + offsetY, srcImage.width);
            const x = i * patch + offsetX;
            const y = j * patch + offsetY; 
            const region = getCircleRegion(x, y, srcImage);
            const current = getIndex(x, y, srcImage.width);
            const pixel = isKeypoint(region, current, srcImage.pixels);
            if (pixel) 
              comparePixels.push({ score: pixel, x, y }); 
        }
      }
      if (comparePixels.length > 0) { 
        comparePixels = comparePixels.sort((a, b) => b.score - a.score);
        points.push(comparePixels[0]);
      } 
    }
  } 
  console.log(points); 
  return points;
}
