const { deterministicPartitionKey } = require("./dpk");

describe("test deterministicPartitionKey for correct output", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns string type", () => {
    const key = deterministicPartitionKey(null);
    expect(typeof key).toBe("string");
  });

  it("Lenght of a string less than 256", () => {
    const key = deterministicPartitionKey(undefined);
    expect(key.length).toBeLessThanOrEqual(256);
  });
});
