const { evaluateAll } = require("../utils");

const samples = [
  {
    input: "",
    output: ["Hello World!"],
  },
];

const resolution = (lines, console) => {
  const greeting = "Hello World!";
  console.log(greeting);
};

console.table(evaluateAll(resolution, samples));
