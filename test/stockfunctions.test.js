const request = require("supertest");
const { app } = require("../index");
const http = require("http");
const { retrieveAllStocks } = require("../stock");

jest.mock("../stock.js", () => ({
  ...jest.requireActual("../stock.js"),
  retrieveAllStocks: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3005, done);
});

afterAll((done) => {
  server.close(done);
});

describe("STOCK Functions TEST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should return all the stocks", async () => {
    const mockStocks = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ];
    retrieveAllStocks.mockResolvedValue(mockStocks);
    const result = await request(server).get("/stocks");
    expect(retrieveAllStocks).toHaveBeenCalled();
    const stockFunctionResult = await retrieveAllStocks();
    expect(result.body).toEqual({ stocks: stockFunctionResult });
    expect(result.body.stocks).toEqual(mockStocks);
    expect(result.body.stocks.length).toBe(3);
    expect(stockFunctionResult).toEqual(mockStocks);
  });
});
