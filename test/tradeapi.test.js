const request = require("supertest");
const { app } = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3003, done);
});

afterAll((done) => {
  server.close(done);
});

describe("TRADE API TEST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should create a new trade", async () => {
    const mockTrade = {
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    };

    const result = await request(server).post("/trades/new").send(mockTrade);
    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual({
      trade: { tradeId: 4, ...mockTrade },
    });
  });

  //invalid stockId
  test("Should return error if trade data is invalid", async () => {
    const invalidStockIdResult = await request(server)
      .post("/trades/new")
      .send({
        stockId: "1",
        quantity: 15,
        tradeType: "buy",
        tradeDate: "2024-08-08",
      });
    expect(invalidStockIdResult.statusCode).toBe(400);
    expect(invalidStockIdResult.body.error).toEqual(
      "Invalid trade stockId!. It should be a number"
    );
    //invalid quantity
    const invalidQuantityResult = await request(server)
      .post("/trades/new")
      .send({
        stockId: 1,
        quantity: "15",
        tradeType: "buy",
        tradeDate: "2024-08-08",
      });
    expect(invalidQuantityResult.statusCode).toBe(400);
    expect(invalidQuantityResult.body.error).toEqual(
      "Invalid trade quantity!. It should be a number"
    );
    //invalid tradeType
    const invalidTradeTypeResult = await request(server)
      .post("/trades/new")
      .send({
        stockId: 1,
        quantity: 15,
        tradeType: 123,
        tradeDate: "2024-08-08",
      });
    expect(invalidTradeTypeResult.statusCode).toBe(400);
    expect(invalidTradeTypeResult.body.error).toEqual(
      "Invalid trade tradeType!. It should be a string"
    );
    //invalid trade date
    const invalidTradeDateResult = await request(server)
      .post("/trades/new")
      .send({
        stockId: 1,
        quantity: 15,
        tradeType: "buy",
        tradeDate: "08-08-2024",
      });
    expect(invalidTradeDateResult.statusCode).toBe(400);
    expect(invalidTradeDateResult.body.error).toEqual(
      "Invalid trade tradeDate!. It should be a valid date(yyyy-mm-dd) string"
    );
  });
});
