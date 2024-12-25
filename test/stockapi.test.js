const request = require("supertest");
const { app } = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe("STOCK API TEST", () => {
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

    const result = await request(server).get("/stocks");
    expect(result.statusCode).toBe(200);
    expect(result.body.stocks).toEqual(mockStocks);
    expect(result.body.stocks.length).toBe(3);
  });

  test("Should return the specific stock related to a ticker", async () => {
    const mockStock = {
      stockId: 1,
      ticker: "AAPL",
      companyName: "Apple Inc.",
      price: 150.75,
    };

    const result = await request(server).get("/stocks/AAPL");
    expect(result.statusCode).toBe(200);
    expect(result.body.stock).toEqual(mockStock);
  });

  test("Should return error if stocks related to ticker not found", async () => {
    const result = await request(server).get("/stocks/DUMMY");
    expect(result.statusCode).toBe(404);
    expect(result.body.error).toEqual("Stocks related to ticker not found");
  });
});
