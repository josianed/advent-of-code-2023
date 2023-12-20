const fs = require("fs");

const data = fs.readFileSync("./day17_input.txt", {
  encoding: "utf8",
  flag: "r",
});

// part 1
const sample =
  "2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533"
    .split("\n")
    .map((line) => line.split(""));

const sampleOptimalPath =
  "2>>34^>>>1323\n32v>>>35v5623\n32552456v>>54\n3446585845v52\n4546657867v>6\n14385987984v4\n44578769877v6\n36378779796v>\n465496798688v\n456467998645v\n12246868655<v\n25465488877v5\n43226746555v>";

const sampleHeatLoss = 102;

/*
const grid = [
  ["2", "4", "1", "3", "4", "3", "2", "3", "1", "1", "3", "2", "3"],
  ["3", "2", "1", "5", "4", "5", "3", "5", "3", "5", "6", "2", "3"],
  ["3", "2", "5", "5", "2", "4", "5", "6", "5", "4", "2", "5", "4"],
  ["3", "4", "4", "6", "5", "8", "5", "8", "4", "5", "4", "5", "2"],
  ["4", "5", "4", "6", "6", "5", "7", "8", "6", "7", "5", "3", "6"],
  ["1", "4", "3", "8", "5", "9", "8", "7", "9", "8", "4", "5", "4"],
  ["4", "4", "5", "7", "8", "7", "6", "9", "8", "7", "7", "6", "6"],
  ["3", "6", "3", "7", "8", "7", "7", "9", "7", "9", "6", "5", "3"],
  ["4", "6", "5", "4", "9", "6", "7", "9", "8", "6", "8", "8", "7"],
  ["4", "5", "6", "4", "6", "7", "9", "9", "8", "6", "4", "5", "3"],
  ["1", "2", "2", "4", "6", "8", "6", "8", "6", "5", "5", "6", "3"],
  ["2", "5", "4", "6", "5", "4", "8", "8", "8", "7", "7", "3", "5"],
  ["4", "3", "2", "2", "6", "7", "4", "6", "5", "5", "5", "3", "3"],
];
*/

// store representation of grid as a graph
const graph = {};

for (let i = 0; i < sample.length; i++) {
  for (let j = 0; j < sample[i].length; j++) {
    const destinations = {};
    if (j + 1 >= 0 && j + 1 < sample[i].length)
      destinations[i + "," + (j + 1)] = parseInt(sample[i][j + 1]);
    if (i + 1 >= 0 && i + 1 < sample.length)
      destinations[i + 1 + "," + j] = parseInt(sample[i + 1][j]);
    if (j - 1 >= 0 && j - 1 < sample[i].length)
      destinations[i + "," + (j - 1)] = parseInt(sample[i][j - 1]);
    if (i - 1 >= 0 && i - 1 < sample.length)
      destinations[i - 1 + "," + j] = parseInt(sample[i - 1][j]);

    // start node
    if (i === 0 && j === 0) {
      graph[i + "," + j] = { next: destinations };
    } else if (i === sample.length - 1 && j === sample[i].length - 1) {
      // end node
      graph[i + "," + j] = { next: Infinity };
    } else {
      graph[i + "," + j] = { next: { ...destinations } };
    }
  }
}

// console.log("graph", graph);

// store cost to get from start to end
// only the loss values from the start node are known at the beginning
const losses = {};
// store parent nodes for each node
const parents = {};
// set all parents to null
Object.keys(graph).forEach((node) => {
  Object.keys(graph[node].next).forEach((childKey) => {
    losses[childKey] = Infinity;
    parents[childKey] = undefined;
  });
});
// set loss values and parents for the first children nodes
Object.keys(graph["0,0"].next).forEach((secondNode) => {
  losses[secondNode] = parseInt(graph["0,0"].next[secondNode]);
  parents[secondNode] = "0,0";
});

const findLowestLossNode = (losses, processed) => {
  let lowestCost = Infinity;
  let lowestCostNode = undefined;
  Object.keys(losses).forEach((node) => {
    const lossToCheck = losses[node];
    if (lossToCheck < lowestCost && !processed.includes(node)) {
      lowestCost = lossToCheck;
      lowestCostNode = node;
    }
  });
  return lowestCostNode;
};

// keep track of all nodes that were processed
const processed = ["0,0"];

let nodeToProcess = findLowestLossNode(losses, processed);
while (nodeToProcess !== undefined) {
  const currentLoss = losses[nodeToProcess];
  const neighbours = graph[nodeToProcess].next;

  Object.keys(neighbours).forEach((neighbour) => {
    const newLoss = currentLoss + neighbours[neighbour];
    if (losses[neighbour] > newLoss) {
      losses[neighbour] = newLoss;
      parents[neighbour] = nodeToProcess;
    }
  });
  processed.push(nodeToProcess);
  nodeToProcess = findLowestLossNode(losses, processed);
}

console.log("parents", parents);

console.log("losses", losses);

const totalLoss = losses["12,12"];
console.log("total loss", totalLoss);
