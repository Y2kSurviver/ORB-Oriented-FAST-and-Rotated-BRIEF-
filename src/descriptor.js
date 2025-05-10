const patchSize = 5;

function BRIEF(points, nBits, srcImage) {
  const descriptors = [];
  const half = floor(patchSize / 2);

  srcImage.loadPixels();
  for (let i = 0; i < points.length; i++) {
    const x = points[i][0];
    const y = points[i][1];
    for (let j = -2; j <= 2; j++) {
      for (let k = -2; k <= 2; k++) {

        const index = getIndex(x + j, y + k, patchSize);
      }
    }
  }
  return descriptors;
}

function generateSamplingPattern() {
  
}