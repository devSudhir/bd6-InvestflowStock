const request = require("supertest");
const { app } = require("../index");
const http = require("http");
const { createTrade } = require("../trade");

jest.mock("../trade.js", () => ({
  ...jest.requireActual("../trade.js"),
  createTrade: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3006, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Trade Functions TEST", () => {
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

    createTrade.mockResolvedValue({ tradeId: 4, ...mockTrade });

    const result = await request(server).post("/trades/new").send(mockTrade);
    expect(createTrade).toHaveBeenCalledWith(mockTrade);
    const tradeFunctionResult = await createTrade(mockTrade);
    console.log(result.body, tradeFunctionResult);
    expect(result.body).toEqual({ trade: tradeFunctionResult });
    expect(result.statusCode).toBe(201);
  });
});
