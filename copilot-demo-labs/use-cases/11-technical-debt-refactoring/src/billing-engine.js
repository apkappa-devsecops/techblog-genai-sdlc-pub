const TAX_RATES = {
  IT: 0.22,
  DE: 0.19,
  FR: 0.2,
  US: 0.0,
};

const VIP_DISCOUNT = 0.05;

function getTaxRate(country) {
  return TAX_RATES[country] ?? 0.1;
}

function computeLineTotal(line) {
  const gross = line.price * line.qty;
  const discount = line.discountPercent ? gross * (line.discountPercent / 100) : 0;
  return Math.round((gross - discount) * 100) / 100;
}

function calculateInvoice(customer, lines, applyCredit = true) {
  let subtotal = 0;
  for (const line of lines) {
    subtotal += computeLineTotal(line);
  }

  const discount = customer.isVip ? subtotal * VIP_DISCOUNT : 0;
  const taxableAmount = subtotal - discount;
  const taxRate = getTaxRate(customer.country);
  const tax = Math.round(taxableAmount * taxRate * 100) / 100;

  let total = taxableAmount + tax;

  let creditApplied = 0;
  if (applyCredit && customer.creditBalance > 0) {
    creditApplied = Math.min(customer.creditBalance, total);
    total = Math.round((total - creditApplied) * 100) / 100;
  }

  return {
    customerId: customer.id,
    lines,
    subtotal,
    discount,
    taxRate,
    tax,
    creditApplied,
    total,
    currency: "EUR",
    issuedAt: new Date(),
  };
}

function formatInvoiceSummary(invoice) {
  const header = `Invoice for ${invoice.customerId} - ${invoice.issuedAt.toISOString().slice(0, 10)}`;
  const body = invoice.lines
    .map((line) => `  ${line.description}: ${line.qty} x EUR${line.price}`)
    .join("\n");
  const totals = [
    `  Subtotal: EUR${invoice.subtotal.toFixed(2)}`,
    invoice.discount > 0 ? `  VIP discount: -EUR${invoice.discount.toFixed(2)}` : null,
    `  Tax (${(invoice.taxRate * 100).toFixed(0)}%): EUR${invoice.tax.toFixed(2)}`,
    invoice.creditApplied > 0 ? `  Credit applied: -EUR${invoice.creditApplied.toFixed(2)}` : null,
    `  Total: EUR${invoice.total.toFixed(2)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `${header}\n${body}\n${totals}`;
}

module.exports = {
  calculateInvoice,
  computeLineTotal,
  formatInvoiceSummary,
  getTaxRate,
};
