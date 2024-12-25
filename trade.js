let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
];

async function createTrade(tradeData) {
  const newTradeData = {
    tradeId: trades.length + 1,
    ...tradeData,
  };
  trades.push(newTradeData);
  console.log("New trade data", tradeData);
  return newTradeData;
}

module.exports = { createTrade };
