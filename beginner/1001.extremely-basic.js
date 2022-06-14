const { evaluateAll } = require("../utils");

const samples = [
  {
    input: "10\n9",
    output: ["X = 19"],
  },
  {
    input: "-10\n4",
    output: ["X = -6"],
  },
  {
    input: "15\n-7",
    output: ["X = 8"],
  },
];

const resolution = (lines, console) => {
  const [a, b] = lines.map(Number);
  const result = a + b;
  console.log(`X = ${result}`);
};

console.table(evaluateAll(resolution, samples));
