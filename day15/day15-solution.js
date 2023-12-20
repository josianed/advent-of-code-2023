// part 1

// The current value starts at 0.
// The first character is H; its ASCII code is 72.
// The current value increases to 72.
// The current value is multiplied by 17 to become 1224.
// The current value becomes 200 (the remainder of 1224 divided by 256).
// The next character is A; its ASCII code is 65.
// The current value increases to 265.
// The current value is multiplied by 17 to become 4505.
// The current value becomes 153 (the remainder of 4505 divided by 256).
// The next character is S; its ASCII code is 83.
// The current value increases to 236.
// The current value is multiplied by 17 to become 4012.
// The current value becomes 172 (the remainder of 4012 divided by 256).
// The next character is H; its ASCII code is 72.
// The current value increases to 244.
// The current value is multiplied by 17 to become 4148.
// The current value becomes 52 (the remainder of 4148 divided by 256).

// const testData = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
// const data = testData.split(",");
// const testResult = 1320

const fs = require("fs");

const input = fs.readFileSync("./day15_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const data = input.split(",");

let result = 0;
data.forEach((step) => {
  let currentValue = 0;
  step.split("").forEach((character) => {
    // get ascii code for character
    const asciiValue = character.charCodeAt(0);
    // increment currentValue by asciiValue
    currentValue += asciiValue;
    // multiply by 17
    currentValue = currentValue * 17;
    // get remainder of currentValue when dividing by 256
    currentValue = currentValue % 256;
  });
  result += currentValue;
});

console.log("result", result);
// 501680

// part 2
// step 1: HASH algo on label (letter sequence) = correct box # for that step
// character on label (= or -): operation to perform

// if -:
// remove lens from box # if exists, shift all other lens forward
// if no lens with that label exists in box #, do nothing

// if =:
// if lens exists at box #: replace existing lens number with new one
// if lens doesn't exist at box #: add to box at the end

/*  data structure option 1:
 const boxes = {
  0: [ { rn: 1}, { qp: 3 } ],
  1: [],
  2: [],
  ...,
  255: []
 }

 to add a lens to a box: 
 - use key to find correct box in object
 - iterate through array for that key to find existing label, if found replace value
 - if not found, append to end

 to remove a lens from a box:
 - filter array where label != key and return new array without that object
 */

/*  data structure option 2:
 const boxes = {
  // label: { focalLength: lensFocalLength } - index from 1 for last step
  0: { rn: { focalLength: 1, pos: 1 }, pq: { focalLength: 3, pos: 2 } },
  1: [],
  2: [],
  ...,
  255: []
 }

 to add a lens to a box: 
 - use key to find correct box in object
 - get correct lens by using label to index object
 - if found, replace number
 - if not found, get number of keys in object to find position, and new object with new label as key

 to remove a lens from a box:
 - find using label and store removedPosIndex
 - for all objects with pos > removedPosIndex, decrease pos by 1
 const target = removedPosIndex
 Object.keys(lensObjects).map((lensObject) => {
  if (lensObject.pos > target) {
    const currentPos = lensObject.pos
    return { ...lensObject, pos: currentPos - 1}
  }
  return { ...lensObject }
 })
 */

// create map of all boxes
const boxes = {};
Array.from({ length: 256 }, (_, i) => i).forEach((box) => {
  boxes[box] = {};
});

const processLens = (lens) => {
  let label;
  let operation;
  let lensFocalLength;
  if (lens.includes("=")) {
    operation = "=";
    label = lens.slice(0, lens.indexOf("="));
  } else {
    operation = "-";
    label = lens.slice(0, lens.indexOf("-"));
  }
  lensFocalLength = !Number.isNaN(parseInt(lens.charAt(lens.length - 1)))
    ? parseInt(lens.charAt(lens.length - 1))
    : null;
  return { label, operation, lensFocalLength };
};

// get HASH value to get box number
const lensData = input.split(",");
lensData.forEach((lens) => {
  let boxNumber = 0;
  const { label, operation, lensFocalLength } = processLens(lens);
  label.split("").forEach((character) => {
    // get ascii code for character
    const asciiValue = character.charCodeAt(0);
    // increment currentValue by asciiValue
    boxNumber += asciiValue;
    // multiply by 17
    boxNumber = boxNumber * 17;
    // get remainder of currentValue when dividing by 256
    boxNumber = boxNumber % 256;
  });

  // check what operation to perform
  if (operation === "=") {
    // get object with all lens in current box
    const currentLensInBox = boxes[boxNumber];
    if (currentLensInBox.hasOwnProperty(label)) {
      // if lens exists at box #: replace existing lens number with new one
      const existingLens = currentLensInBox[label];
      boxes[boxNumber] = {
        ...currentLensInBox,
        [label]: { ...existingLens, focalLength: lensFocalLength },
      };
    } else {
      // if lens doesn't exist at box #: add to box at the end
      // find number of lens in box to get new lens position
      const currentLensPosition = Object.keys(currentLensInBox).length;
      boxes[boxNumber] = {
        ...currentLensInBox,
        [label]: { focalLength: lensFocalLength, pos: currentLensPosition },
      };
    }
  } else {
    // operation is '-'
    // get object with all lens in current box
    const currentLensInBox = boxes[boxNumber];
    if (currentLensInBox.hasOwnProperty(label)) {
      // remove lens from box # if exists, shift all other lens forward
      // get position of lens to remove
      const targetLensPosition = currentLensInBox[label].pos;
      // delete lens to remove
      delete boxes[boxNumber][label];
      // shift positions of each remaining lens down 1 if they were behind the deleted lens
      Object.keys(currentLensInBox).forEach((label) => {
        if (boxes[boxNumber][label].pos > targetLensPosition) {
          const currentPos = boxes[boxNumber][label].pos;
          boxes[boxNumber][label] = {
            ...boxes[boxNumber][label],
            pos: currentPos - 1,
          };
        }
      });
    }
    // if no lens with that label exists in box #, do nothing
  }
});

// console.log("boxes", boxes);

// find focusing power of all lens
// formula: boxNumber + 1 * lensPositionInBox * lensFocalLength
let focusingPower = 0;
Object.keys(boxes).forEach((boxNumber) => {
  let boxFocusingPower = 0;
  const boxValue = parseInt(boxNumber) + 1;
  const currentBox = boxes[boxNumber];
  if (Object.keys(currentBox).length > 0) {
    Object.keys(currentBox).forEach((label) => {
      boxFocusingPower +=
        boxValue * (currentBox[label].pos + 1) * currentBox[label].focalLength;
    });
  }
  focusingPower += boxFocusingPower;
});

console.log("focusingPower", focusingPower);
// 241094
