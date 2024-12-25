const express = require("express");
const cors = require("cors");
const { retrieveAllStocks, retrieveStockByTicker } = require("./stock");
const { validateTickerName, validateTradeObject } = require("./validations");
const { createTrade } = require("./trade");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to InvestFlow Stock Trading Project");
});

app.get("/stocks", async (req, res) => {
  try {
    const result = await retrieveAllStocks();
    if (result.length === 0) {
      return res.status(404).json({ error: "Stocks not found" });
    } else {
      return res.json({ stocks: result });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/stocks/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const error = validateTickerName(ticker);
    if (error) {
      return res.status(400).json({ error: error });
    }
    const result = await retrieveStockByTicker(ticker);
    if (result) {
      return res.json({ stock: result });
    } else {
      return res
        .status(404)
        .json({ error: "Stocks related to ticker not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/trades/new", async (req, res) => {
  const tradeData = req.body;
  try {
    const error = validateTradeObject(tradeData);
    if (error) {
      return res.status(400).json({ error: error });
    }
    const result = await createTrade(tradeData);
    if (result) {
      return res.status(201).json({ trade: result });
    } else {
      return res.status(404).json({
        error: "Something wrong happened while creating a new trade!",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
