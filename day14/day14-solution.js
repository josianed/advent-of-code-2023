const fs = require("fs");

const input = fs.readFileSync("./day14_input.txt", {
  encoding: "utf8",
  flag: "r",
});

const data = input.split("\n");

const sample = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

const shiftedSample = [
  "OOOO.#.O..",
  "OO..#....#",
  "OO..O##..O",
  "O..#.OO...",
  "........#.",
  "..#....#.#",
  "..O..#.O.O",
  "..O.......",
  "#....###..",
  "#....#....",
];

// transpose rows so each column can be shifted based on items it contains
const transposedRows = [];
for (let i = 0; i < data.length; i++) {
  let row = "";
  for (let j = 0; j < data.length; j++) {
    row += data[j].charAt(i);
  }
  transposedRows.push(row);
}

// shift items in rows and push new row configuration to array
const shiftedRows = [];
transposedRows.forEach((transposedRow) => {
  const splitRow = transposedRow.split("");
  let newRow = "";
  let roundRocks = 0;
  let emptySpaces = 0;
  splitRow.forEach((item) => {
    if (item === "O") {
      // count round rocks
      roundRocks += 1;
    } else if (item === ".") {
      // count empty spaces
      emptySpaces += 1;
    } else if (item === "#") {
      for (let j = 0; j < roundRocks; j++) {
        newRow += "O";
      }
      for (let k = 0; k < emptySpaces; k++) {
        newRow += ".";
      }
      newRow += "#";
      roundRocks = 0;
      emptySpaces = 0;
    }
  });
  // at end of a row with no square rocks
  for (let j = 0; j < roundRocks; j++) {
    newRow += "O";
  }
  for (let k = 0; k < emptySpaces; k++) {
    newRow += ".";
  }
  roundRocks = 0;
  emptySpaces = 0;
  shiftedRows.push(newRow);
});

// transpose rows back to columns
const transposedColumns = [];
for (let i = 0; i < shiftedRows.length; i++) {
  let row = "";
  for (let j = 0; j < shiftedRows.length; j++) {
    row += shiftedRows[j].charAt(i);
  }
  transposedColumns.push(row);
}

// calculate load
let sum = 0;
const totalRows = transposedColumns.length;
transposedColumns.forEach((column, index) => {
  let numberSquareRocks = 0;
  column.split("").forEach((item) => {
    if (item === "O") numberSquareRocks += 1;
  });
  const rowLoad = numberSquareRocks * (totalRows - index);
  sum += rowLoad;
});

console.log("result", sum);
// 108955
