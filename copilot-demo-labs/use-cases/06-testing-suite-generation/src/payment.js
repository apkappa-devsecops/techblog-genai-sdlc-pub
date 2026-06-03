// Core payment logic. Validates the card, applies coupon discounts, orchestrates
// the full payment flow (validate → persist → update statuses), and returns saved data.

const { applyDiscount, validateCard, roundAmount, maskCard } = require("./utils");
const {
  insertCustomer,
  insertOrder,
  insertPayment,
  updateOrderStatus,
  updatePaymentStatus,
  getOrderById,
  getPaymentByOrderId,
} = require("./db");

class PaymentError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaymentError";
  }
}

function processPayment(total, cardNumber, coupon = null) {
  if (total <= 0) throw new PaymentError("amount must be positive");
  if (!validateCard(cardNumber)) throw new PaymentError("invalid card number");

  const discountTotal = applyDiscount(total, coupon);

  return {
    order: {
      total,
      coupon_code: coupon,
      discount_total: roundAmount(discountTotal),
      status: "paid",
    },
    payment: {
      card_last_four: maskCard(cardNumber),
      amount: roundAmount(discountTotal),
      status: "captured",
    },
  };
}

// Orchestrates the full payment flow: validate, compute, persist to DB, return saved data.
function processAndPersistPayment(db, { email, total, cardNumber, coupon }) {
  const result = processPayment(total, cardNumber, coupon);

  // Find or create customer
  let customerId;
  const existing = db
    .prepare("SELECT id FROM customers WHERE email = ?")
    .get(email);
  if (existing) {
    customerId = existing.id;
  } else {
    customerId = insertCustomer(db, email).lastInsertRowid;
  }

  // Persist order and payment
  const orderId = insertOrder(
    db,
    customerId,
    result.order.total,
    result.order.coupon_code,
    result.order.discount_total
  ).lastInsertRowid;

  insertPayment(db, orderId, result.payment.card_last_four, result.payment.amount);

  // Update statuses
  updateOrderStatus(db, orderId, "paid");
  updatePaymentStatus(db, orderId, "captured");

  // Return persisted data
  return {
    order: getOrderById(db, orderId),
    payment: getPaymentByOrderId(db, orderId),
  };
}

// Retrieves an order and its payment by order ID.
function getOrderWithPayment(db, orderId) {
  const order = getOrderById(db, orderId);
  if (!order) return null;
  const payment = getPaymentByOrderId(db, orderId);
  return { order, payment };
}

module.exports = { PaymentError, processPayment, processAndPersistPayment, getOrderWithPayment };
