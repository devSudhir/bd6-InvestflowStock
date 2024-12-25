//stocks API validation
//--/stocks/AAPL (Get stock by ticker)
function validateTickerName(tickerName) {
  let error = null;
  if (!tickerName || typeof tickerName != "string") {
    error = "Invalid ticker name!. It should be a string";
  }
  return error;
}

function validateTradeObject(tradeData) {
  let error = null;

  if (!tradeData) {
    error = "Invalid Trade Data";
  } else if (!tradeData.stockId || typeof tradeData.stockId != "number") {
    error = "Invalid trade stockId!. It should be a number";
  } else if (!tradeData.quantity || typeof tradeData.quantity != "number") {
    error = "Invalid trade quantity!. It should be a number";
  } else if (!tradeData.tradeType || typeof tradeData.tradeType != "string") {
    error = "Invalid trade tradeType!. It should be a string";
  } else if (
    !tradeData.tradeDate ||
    typeof tradeData.tradeDate != "string" ||
    !isValidDateString(tradeData.tradeDate)
  ) {
    error =
      "Invalid trade tradeDate!. It should be a valid date(yyyy-mm-dd) string";
  }
  return error;
}

function isValidDateString(dateString) {
  // Regular expression to match the format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Test if the date string matches the format
  if (!regex.test(dateString)) {
    return false;
  }

  return true;
}

module.exports = { validateTickerName, validateTradeObject };
