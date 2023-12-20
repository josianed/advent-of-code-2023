/*
Sample:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

Solution: 8
*/

const fs = require("fs");

const data = fs.readFileSync("./day2_input.txt", {
  encoding: "utf8",
  flag: "r",
});
// console.log("data", data);

// const input = data.split("\n");
// console.log("input", input);

// const sample =
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
// const sampleSolution = 8;

const input = data.split("\n");
// console.log("input", input);

const targets = {
  red: 12,
  green: 13,
  blue: 14,
};

let possibleGamesSum = 0;

input.forEach((game) => {
  // get index of : to format data
  const colonIndex = game.indexOf(":");
  // get game number by splitting string into array at colon index and getting last item in array
  const gameNumber = parseInt(game.substring(0, colonIndex).split(" ")[1]);
  // extract all game samples into an array
  const gameSamples = game.substring(colonIndex + 1, game.length);
  // split each game sample into an array of pairs of colours and number of cubes of that colour
  const cubesPeeked = gameSamples
    .split(";")
    .map((sample) => sample.trim())
    .map((cubes) => cubes.split(",").map((pair) => pair.trim()));

  // initialize variable to keep track of whether a game is possible or not
  let isPossibleGame = true;

  // cubesPeeked represent a single set of the samples shown
  cubesPeeked.forEach((colourSet) => {
    // colourSet is an array of cube numbers of each colour pairs
    colourSet.forEach((pair) => {
      // for each pair, split out number and colour
      const [number, colour] = pair.split(" ");
      // check if number of a certain colour exceeds target colour
      // target colour can be accesed directly from targets object when indexed by colour
      if (parseInt(number) > targets[colour]) {
        // if number of cubes of a colour exceeds target, set isPossibleGame to false
        isPossibleGame = false;
      }
    });
  });

  // done checking game, if isPossibleGame is true
  //  add game number to sum of existing possible games
  if (isPossibleGame) {
    possibleGamesSum += gameNumber;
  }
});

console.log("possibleGamesSum", possibleGamesSum);
// 2377
