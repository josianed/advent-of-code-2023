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
console.log("data", data);

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
