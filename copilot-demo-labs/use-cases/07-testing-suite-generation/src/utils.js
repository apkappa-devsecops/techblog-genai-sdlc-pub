// Utility helpers: card validation (length check), coupon discount logic,
// amount rounding, and card number masking.

function applyDiscount(total, coupon = null) {
  if (!coupon) {
    return total;
  }
  if (coupon === "SAVE10") {
    return total * 0.9;
  }
  if (coupon === "SAVE20" && total > 200) {
    return total * 0.8;
  }
  return total;
}

function validateCard(cardNumber) {
  return cardNumber.length === 16;
}

function roundAmount(value) {
  return Math.round(value * 100) / 100;
}

function maskCard(cardNumber) {
  return cardNumber.slice(-4);
}

module.exports = { applyDiscount, validateCard, roundAmount, maskCard };
