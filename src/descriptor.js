const patchSize = 31;
const half = Math.floor(patchSize / 2);

function BRIEF(points, nBits, srcImage) {
  const descriptors = [];
 
  let sampP = generateSamplingPattern(nBits);
    //console.log(sampP);
//  console.log(srcImage.pixels);
  srcImage.loadPixels();
  for (let i = 0; i < points.length; i++) {
    const x = points[i][0];
    const y = points[i][1];
     
    let binaryStr = '';
    for (let j = 0; j < nBits; j++) { 
      const index1 = getIndex(x + sampP[j][0], y + sampP[j][1], patchSize);
      const index2 = getIndex(x + sampP[j][2], y + sampP[j][3], patchSize);
      /*stroke(255, 0, 0); 
      point( x + sampP[j][0], y + sampP[j][1]);
      stroke(0, 255, 0); 
      point( x + sampP[j][2], y + sampP[j][3]);*/

      if (srcImage.pixels[index1] > srcImage.pixels[index2]) {
        binaryStr += '1';
      } 
      else {
        binaryStr += '0';
      }
      //console.log(srcImage.pixels[index1], srcImage.pixels[index2]);
      //break;
    }
  
    descriptors.push(binaryStr);
    //break; 
  }
  return descriptors;
}

function generateSamplingPattern(nBits) {
  let array = []; 
  for (let i = 0; i < nBits; i++) {
    let pair = []; 
    for (let j = 0; j < 4; j++) {
      pair.push(floor(random(-half, half))); 
    }
    array.push(pair); 
  }
  return array;  
}
