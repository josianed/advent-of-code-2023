const fs = require("fs");

const data = fs.readFileSync("./day3_input.txt", {
  encoding: "utf8",
  flag: "r",
});
// console.log("data", data);

/* 
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
*/

const sample =
  "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..";
const sampleExcludedNumber = [114, 58];
const sampleSum = 4361;

/*
(-1,+1) ( 0,+1) (+1,+1) 
(-1, 0) ( 0, 0) (+1, 0)
(-1,-1) ( 0,-1) (+1,-1)

x,y --> position of number
adjacent positions:
x-1, y+1
x, y+1
x+1, y+1
x-1, y
x, y
x+1, y
x-1, y-1
x, y-1
x+1, y-1
*/

const grid = data.split("\n").map((row) => row.split(""));

const adjacentNumbers = [];
let currentNumber = "";
let isAdjacent = false;
for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[row].length; column++) {
    // check if item is a number
    const isNumber = !Number.isNaN(parseInt(grid[row][column]));
    // check all neighbours to see if adjacent to a symbol
    // need to make sure indexes are within grid's bounds
    let neighbours = [];
    if (isNumber) {
      currentNumber += grid[row][column];
      if (row - 1 >= 0) {
        neighbours = [...neighbours, grid[row - 1][column]];
      }
      if (row + 1 < grid.length) {
        neighbours = [...neighbours, grid[row + 1][column]];
      }
      if (column - 1 >= 0) {
        neighbours = [...neighbours, grid[row][column - 1]];
      }
      if (column + 1 < grid[row].length) {
        neighbours = [...neighbours, grid[row][column + 1]];
      }
      if (row - 1 >= 0 && column + 1 < grid[row].length) {
        neighbours = [...neighbours, grid[row - 1][column + 1]];
      }
      if (row + 1 < grid.length && column + 1 < grid[row].length) {
        neighbours = [...neighbours, grid[row + 1][column + 1]];
      }
      if (row - 1 >= 0 && column - 1 >= 0) {
        neighbours = [...neighbours, grid[row - 1][column - 1]];
      }
      if (row + 1 < grid.length && column - 1 >= 0) {
        neighbours = [...neighbours, grid[row + 1][column - 1]];
      }

      neighbours.forEach((neighbour) => {
        // if neighbour isn't a . and isn't a number, must be a symbol
        if (neighbour !== "." && Number.isNaN(parseInt(neighbour))) {
          // has a symbol as a neighbour, update flag
          isAdjacent = true;
        }
      });
      // if next character exists and isn't a number
      if (
        column + 1 < grid[row].length &&
        Number.isNaN(parseInt(grid[row][column + 1]))
      ) {
        // we processed the last digit in the current number
        // if isAdjacent is true, one of the digits in that number has a symbol neighbour
        // add to array
        if (isAdjacent) {
          adjacentNumbers.push(parseInt(currentNumber));
        }
        // if it isn't adjacent to a symbol, found a number with no symbol neighbours
        // reset number string
        currentNumber = "";
        isAdjacent = false;
      }
    }
  }
}

const sumOfSymbolNumber = adjacentNumbers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log("sumOfSymbolNumber", sumOfSymbolNumber);
// 3248021
