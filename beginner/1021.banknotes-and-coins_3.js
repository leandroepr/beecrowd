const input = "576.73\n";
const lines = input.split("\n");

const value = Number(lines[0]);
const bankNotes = [100, 50, 20, 10, 5, 2];
const coins = [1, 0.5, 0.25, 0.1, 0.05, 0.01];

const adaptParams = (lines) => Number(lines[0]);
const changeCurrency = (value, currency) => {
  const amount = Math.floor(value / currency);
  const remaining = Number((value % currency).toFixed(2));
  return { amount, remaining };
};
const prepareNotesAndCoins = (bankNotes, coins) => [...bankNotes, ...coins];
const classifyNotesAndCoins = (totalValue, bankNotesAndCoins) => {
  const initialValue = {
    changesMap: {},
    remainingValue: totalValue,
  };
  const { changesMap } = bankNotesAndCoins.reduce((acc, noteOrCoin) => {
    const { amount, remaining } = changeCurrency(
      acc.remainingValue,
      noteOrCoin
    );
    acc.changesMap[noteOrCoin] = amount;
    acc.remainingValue = remaining;
    return acc;
  }, initialValue);
  return changesMap;
};
const formatAnswer = (bankNotes, coins, changesMap) => {
  const logs = [];
  logs.push("NOTAS:");
  const allFormattedNotes = bankNotes.map((bankNote) => {
    const amount = changesMap[bankNote];
    return `${amount} notas(s) de R$ ${bankNote.toFixed(2)}`;
  });
  logs.push(...allFormattedNotes);
  logs.push("MOEDAS:");
  const formattedCoins = coins.map((coin) => {
    const amount = changesMap[coin];
    return `${amount} moeda(s) de R$ ${coin.toFixed(2)}`;
  });
  logs.push(...formattedCoins);
  return logs.join("\n");
};

const totalValue = adaptParams(lines);
const bankNotesAndCoins = prepareNotesAndCoins(bankNotes, coins);
const answer = classifyNotesAndCoins(totalValue, bankNotesAndCoins);
console.log(formatAnswer(bankNotes, coins, answer));
