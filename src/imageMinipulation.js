// Used to get the index in p5 pixel array
function getIndex(x, y, w) {
  return (x + y * w) * 4;
}

function copyImage(srcImage) {
  const buffer = createImage(srcImage.width, srcImage.height);
  buffer.copy(srcImage, 0, 0, srcImage.width, srcImage.height, 0, 0, srcImage.width, srcImage.height); //createImage(srcImage.width * pow(rez, i), srcImage.height * pow(rez, i));
  return buffer;
}

function imagePyramid(srcImage) {
  let array = [];
  for (let i = 0; i < levels; i++) {
    const imgCp = copyImage(srcImage);
    imgCp.resize(srcImage.width * pow(rez, i), srcImage.height * pow(rez, i));

    array.push(imgCp);
  }
  return array;
}

function blurImages(srcImage, iteration) {
  let array = [];
  for (let i = 0; i < iteration; i++) {
    const imgCp = copyImage(srcImage);
    imgCp.filter(BLUR, i);
    array.push(imgCp);
  }
  return array;
}

// At this point images are all
// of the same size
// image is grey scale
function subtractImages(imgArray) {
  const cols = imgArray[0].width;
  const rows = imgArray[0].height;
  const buffer = createImage(cols, rows);
  buffer.loadPixels();
  // loading the pixel array foreach image
  for (let i = 0; i < imgArray.length; i++) {
    imgArray[i].loadPixels();
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const index = getIndex(i, j, cols);
      let val = 0;
      for (let k = 0; k < imgArray.length; k++) {
        val -= imgArray[k].pixels[index];
      }
      val = abs(val);
      buffer.pixels[index] = val;
      buffer.pixels[index + 1] = val;
      buffer.pixels[index + 2] = val;
      buffer.pixels[index + 3] = 255;
    }
  }
  
  buffer.updatePixels();

  return buffer;
}