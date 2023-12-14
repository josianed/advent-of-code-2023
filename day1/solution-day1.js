const fs = require("fs");

const data = fs.readFileSync("./day1_input.txt", {
  encoding: "utf8",
  flag: "r",
});

// part 1
// sanitize data
const input = data
  // split string into array of strings
  .split("\n")
  // split each string into array of chars
  .map((inputString) => inputString.split(""))
  // check if string is numerical character and convert to number
  .map((charsArray) =>
    charsArray.map((char) =>
      Number.isNaN(parseInt(char)) ? char : parseInt(char)
    )
  );

let sum = 0;

input.forEach((inputChars) => {
  // initialize number string to construct final 2-digit number
  let number = "";

  // iterate through array of characters and find first number in array
  for (let i = 0; i < inputChars.length; i++) {
    if (typeof inputChars[i] === "number") {
      number += inputChars[i];
      break;
    }
  }

  // reverse array
  reversedInputChars = inputChars.reverse();
  // iterate through reversed array of characters and find first number in array (last in original array)
  for (let j = 0; j < reversedInputChars.length; j++) {
    if (typeof reversedInputChars[j] === "number") {
      number += reversedInputChars[j];
      break;
    }
  }
  // convert number string to number and add to total sum
  sum += parseInt(number);
});

console.log("sum", sum);
// 53334

// part 2
let total = 0;
const numberDict = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const inputData = data
  // split string into array of strings
  .split("\n");

for (let i = 0; i < inputData.length; i++) {
  const charString = inputData[i];

  let firstNumberIndex = charString.length - 1;
  let firstNumber = undefined;
  let lastNumberIndex = 0;
  let lastNumber = undefined;

  // check if numerical number exists that comes before current first number
  const charArray = charString.split("");
  for (let j = 0; j < charArray.length; j++) {
    if (!Number.isNaN(parseInt(charArray[j])) && j <= firstNumberIndex) {
      firstNumberIndex = j;
      firstNumber = parseInt(charArray[j]);
    }
  }

  // check if numerical number exists that comes after current last number
  for (let k = charArray.length - 1; k >= 0; k--) {
    if (!Number.isNaN(parseInt(charArray[k])) && k >= lastNumberIndex) {
      lastNumberIndex = k;
      lastNumber = parseInt(charArray[k]);
    }
  }

  // if first found number is not at first index
  // or last found number is not at last index
  // look for spelled out numbers
  if (firstNumberIndex !== 0 || lastNumberIndex !== charString.length - 1) {
    Object.keys(numberDict).forEach((numberString) => {
      let currentFirstIndex = charString.indexOf(numberString);
      let currentLastIndex = charString.lastIndexOf(numberString);

      // search for first instance of spelled-out number
      if (currentFirstIndex != -1 && currentFirstIndex <= firstNumberIndex) {
        firstNumberIndex = currentFirstIndex;
        firstNumber = numberDict[numberString];
      }

      // search for last instance of spelled-out number
      if (currentLastIndex != -1 && currentLastIndex >= lastNumberIndex) {
        lastNumberIndex = currentLastIndex;
        lastNumber = numberDict[numberString];
      }
    });
  }

  total += firstNumber * 10 + lastNumber;
}

console.log("total", total);
// 52834
