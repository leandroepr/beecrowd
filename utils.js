/**
 * Create a custom spy console
 * @returns {{logs: String[], log: (...data:any[]) => void}}
 */
const createCustomConsole = () => {
  const logs = [];
  const log = (...entries) => logs.push(entries.join(" "));
  return { log, logs };
};

/**
 * Compare output with answer
 * @param {String[]} output
 * @param {String[]} answer
 * @returns {Boolean}
 */
const isCorrect = (output, answer) => output.join("\n") === answer.join("\n");

/**
 * Evaluate the result by passing the input to the resolution
 * and comparing the answer with the output
 * @param {(lines: String[], console: (...data: any[]) => void)} resolution
 * @param {String} input
 * @param {String[]} output
 * @returns {{status: String, input: String, output: String[], answer: String[]}}
 */
const evaluateSingle = (resolution, sample) => {
  const lines = sample.input.split("\n");
  const customConsole = createCustomConsole();
  resolution(lines, customConsole);
  const answer = customConsole.logs;
  const status = isCorrect(sample.output, answer) ? "CORRECT" : "FAIL";
  return { status, input: sample.input, output: sample.output, answer };
};

/**
 * Evaluate the resolution with all samples
 * @param {{input: String, output: String[]}[]} samples
 * @param {(lines: String[], console: (...data: any[])=> void) => void} resolution
 * @returns {{status: String, input: String, output: String[], answer: String[]}[]}
 */
const evaluateAll = (resolution, samples) => {
  return samples.map((sample) => evaluateSingle(resolution, sample));
};

module.exports = {
  createCustomConsole,
  isCorrect,
  evaluateSingle,
  evaluateAll,
};
