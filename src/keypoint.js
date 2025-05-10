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
  for (let i = regionRadius; i < srcImage.width - regionRadius; i++) {
    for (let j = regionRadius; j < srcImage.height - regionRadius; j++) {
      const region = getCircleRegion(i, j, srcImage);
      let current = getIndex(i, j, srcImage.width);
      let pixel = isKeypoint(region, current, srcImage.pixels);
      if (pixel == 1)
        points.push([i, j]);
      //break;
    }
    //break;
  }

  return points;
}