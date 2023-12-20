const fs = require("fs");

const data = fs.readFileSync("./day4_input.txt", {
  encoding: "utf8",
  flag: "r",
});
// console.log("data", data);

const sample =
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";
const sampleSolution = 13;

let totalPoints = 0;
data.split("\n").forEach((card) => {
  const [_, numbers] = card.split(":");

  const splitNumbers = numbers.split("|");

  const winningNumbers = splitNumbers[0]
    .trim()
    .split(" ")
    // remove empty spaces
    .filter((number) => number)
    .map((number) => {
      const trimmedNumber = number.trim();
      return parseInt(trimmedNumber);
    });

  const chosenNumbers = splitNumbers[1]
    .trim()
    .split(" ")
    // remove empty spaces
    .filter((number) => number)
    .map((number) => {
      const trimmedNumber = number.trim();
      return parseInt(trimmedNumber);
    });

  // find chosen numbers that are winners
  const winners = winningNumbers.filter((number) =>
    chosenNumbers.includes(number)
  );

  // if any winners in this card
  if (winners.length > 0) {
    totalPoints += 2 ** (winners.length - 1);
  }
});

console.log("total points", totalPoints);
// 24848
