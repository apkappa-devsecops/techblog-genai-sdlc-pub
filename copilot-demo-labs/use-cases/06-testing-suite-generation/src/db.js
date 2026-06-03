// Data access layer (CRUD). Creates the SQLite database, applies the schema,
// and provides functions to insert/read/update customers, orders, and payments.

const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

function createDb(filePath = ":memory:") {
  const db = new Database(filePath);
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
  db.exec(schema);
  return db;
}

function insertCustomer(db, email) {
  const stmt = db.prepare("INSERT INTO customers (email) VALUES (?)");
  return stmt.run(email);
}

function insertOrder(db, customerId, total, couponCode = null, discountTotal = null) {
  const stmt = db.prepare(
    "INSERT INTO orders (customer_id, total, coupon_code, discount_total) VALUES (?, ?, ?, ?)"
  );
  return stmt.run(customerId, total, couponCode, discountTotal);
}

function insertPayment(db, orderId, cardLastFour, amount) {
  const stmt = db.prepare(
    "INSERT INTO payments (order_id, card_last_four, amount) VALUES (?, ?, ?)"
  );
  return stmt.run(orderId, cardLastFour, amount);
}

function updateOrderStatus(db, orderId, status) {
  const stmt = db.prepare("UPDATE orders SET status = ? WHERE id = ?");
  return stmt.run(status, orderId);
}

function updatePaymentStatus(db, paymentId, status) {
  const stmt = db.prepare("UPDATE payments SET status = ? WHERE id = ?");
  return stmt.run(status, paymentId);
}

function getOrderById(db, orderId) {
  return db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId);
}

function getPaymentByOrderId(db, orderId) {
  return db.prepare("SELECT * FROM payments WHERE order_id = ?").get(orderId);
}

module.exports = {
  createDb,
  insertCustomer,
  insertOrder,
  insertPayment,
  updateOrderStatus,
  updatePaymentStatus,
  getOrderById,
  getPaymentByOrderId,
};
