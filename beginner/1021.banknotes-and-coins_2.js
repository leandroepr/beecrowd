const input = "91.01\n";
const lines = input.split("\n");
const bankNotes = [100, 50, 20, 10, 5, 2];
const coins = [1, 0.5, 0.25, 0.1, 0.05, 0.01];

const resolution = (lines, bankNotes, coins) => {
  const adaptParams = (lines) => Number(lines[0]);
  const changeCurrency = (value, currency) => {
    const amount = Math.floor(value / currency);
    const rest = value % currency;
    return { amount, rest };
  };
  const notesAndCoins = [...bankNotes, ...coins];
  const initialValue = {
    changesMap: {},
    subtotal: adaptParams(lines),
  };
  const resultMap = notesAndCoins.reduce((acc, noteOrCoin) => {
    const { amount, rest } = changeCurrency(acc.subtotal, noteOrCoin);
    acc.changesMap[noteOrCoin] = amount;
    acc.subtotal = rest;
    return acc;
  }, initialValue);
  return resultMap.changesMap;
};

const formatAnswer = (changesMap, notes, coins) => {
  const logs = [];
  logs.push("NOTES");
  const formattedNotes = notes.map(
    (note) => `${changesMap[note]} nota(s) de R$ ${note.toFixed(2)}`
  );
  logs.push(...formattedNotes);
  logs.push("MOEDAS");
  const formattedCoins = coins.map(
    (coin) => `${changesMap[coin]} moeda(s) de R$ ${coin.toFixed(2)}`
  );
  logs.push(...formattedCoins);
  return logs.join("\n");
};

const answer = resolution(lines, bankNotes, coins);
console.log(formatAnswer(answer, bankNotes, coins));
