export type InvoiceLine = {
  description: string;
  price: number;
  qty: number;
  discountPercent?: number;
};

export type Customer = {
  id: string;
  name: string;
  country: string;
  isVip: boolean;
  creditBalance: number;
};

export type Invoice = {
  customerId: string;
  lines: InvoiceLine[];
  subtotal: number;
  discount: number;
  taxRate: number;
  tax: number;
  creditApplied: number;
  total: number;
  currency: string;
  issuedAt: Date;
};

const TAX_RATES: Record<string, number> = {
  IT: 0.22,
  DE: 0.19,
  FR: 0.20,
  US: 0.0,
};

const VIP_DISCOUNT = 0.05;

export function getTaxRate(country: string): number {
  return TAX_RATES[country] ?? 0.10;
}

export function computeLineTotal(line: InvoiceLine): number {
  const gross = line.price * line.qty;
  const discount = line.discountPercent
    ? gross * (line.discountPercent / 100)
    : 0;
  return Math.round((gross - discount) * 100) / 100;
}

export function calculateInvoice(
  customer: Customer,
  lines: InvoiceLine[],
  applyCredit = true,
): Invoice {
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

export function formatInvoiceSummary(invoice: Invoice): string {
  const header = `Invoice for ${invoice.customerId} — ${invoice.issuedAt.toISOString().slice(0, 10)}`;
  const body = invoice.lines
    .map((l) => `  ${l.description}: ${l.qty} x €${l.price}`)
    .join("\n");
  const totals = [
    `  Subtotal: €${invoice.subtotal.toFixed(2)}`,
    invoice.discount > 0 ? `  VIP discount: -€${invoice.discount.toFixed(2)}` : null,
    `  Tax (${(invoice.taxRate * 100).toFixed(0)}%): €${invoice.tax.toFixed(2)}`,
    invoice.creditApplied > 0 ? `  Credit applied: -€${invoice.creditApplied.toFixed(2)}` : null,
    `  Total: €${invoice.total.toFixed(2)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `${header}\n${body}\n${totals}`;
}
