// a simple express server to serve the fake API that returns fake data for the functions in the subgraph
// http://localhost:8101/payment-status?order_id=${order_id} _returns a random payment status "PAID| "IN_PROGRESS| "FAILED"| "NOT_INITIATED"| "UNKNOWN";

import express from "express";


const app = express();
app.use(express.json());

app.get("/payment-status", (req, res) => {
  const { order_id } = req.query;
  if (!order_id) {
    res.status(400).send("order_id is required");
    return;
  }
  const statuses = [
    "PAID",
    "IN_PROGRESS",
    "FAILED",
    "NOT_INITIATED",
    "UNKNOWN",
  ];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  res.json({ status: randomStatus });
});

app.listen(8101, () => {
  console.log("Fake API listening on port 8101");
});