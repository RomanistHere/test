const { createHash } = require("crypto");

exports.deterministicPartitionKey = event => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event)
    return "0";

  if (!event.partitionKey) {
    const data = JSON.stringify(event);
    return createHash("sha3-512").update(data).digest("hex");
  }

  const { partitionKey } = event;
  const candidate = typeof partitionKey === "string"
                    ? partitionKey
                    : JSON.stringify(partitionKey);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

exports.deterministicPartitionKeyOld = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};