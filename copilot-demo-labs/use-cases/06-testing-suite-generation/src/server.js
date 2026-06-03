// Entry point of the web app. Initializes the Express server, serves the static UI,
// and exposes POST /pay (process payment) and GET /orders/:id (retrieve order).

// Express is a lightweight web framework that lets us define HTTP endpoints
const express = require("express");
const path = require("path");
const { processAndPersistPayment, getOrderWithPayment, PaymentError } = require("./payment");
const { createDb } = require("./db");

// Create the Express app
const app = express();
// Parse incoming JSON request bodies (e.g. from the payment form)
app.use(express.json());
// Serve static files (index.html) from the public/ folder
app.use(express.static(path.join(__dirname, "public")));

// Create an in-memory SQLite database, initialized with schema.sql
const db = createDb();

// POST /pay — receives { email, total, cardNumber, coupon? }, returns the created order and payment
app.post("/pay", (req, res) => {
  const { email, total, cardNumber, coupon } = req.body;

  if (!email || total == null || !cardNumber) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    const result = processAndPersistPayment(db, { email, total, cardNumber, coupon });
    return res.json(result);
  } catch (err) {
    // 422 (Unprocessable Entity) for business-logic errors (e.g. invalid card)
    if (err instanceof PaymentError) {
      return res.status(422).json({ error: err.message });
    }
    // 500 for anything unexpected
    return res.status(500).json({ error: "internal server error" });
  }
});

// GET /orders/:id — retrieves a previously created order by its ID
app.get("/orders/:id", (req, res) => {
  const result = getOrderWithPayment(db, req.params.id);
  if (!result) return res.status(404).json({ error: "order not found" });
  return res.json(result);
});

// Start the server on port 3000 (or the PORT env variable)
// After running `npm start`, open http://localhost:3000 to see the payment form
// Start the server only when run directly (not when imported by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Payment server running on :${PORT}`));
}

module.exports = app;
