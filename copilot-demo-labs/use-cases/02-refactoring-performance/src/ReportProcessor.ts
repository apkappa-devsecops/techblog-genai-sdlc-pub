interface OrderItem {
  qty: number;
  price: number;
}

interface Order {
  country?: string;
  items: OrderItem[];
}

export function runLabVariant(payload: { orders: Order[] }): Record<string, number> {
  const orders = payload.orders || [];
  const totals: Record<string, number> = {};
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const country = order.country || "UNKNOWN";
    if (!totals.hasOwnProperty(country)) {
      totals[country] = 0;
    }
    for (let j = 0; j < order.items.length; j++) {
      const item = order.items[j];
      totals[country] += item.qty * item.price;
    }
  }
  // Second pass for tax logic
  Object.keys(totals).forEach(c => {
    if (c === "IT") totals[c] = totals[c] * 1.22;
    else if (c === "DE") totals[c] = totals[c] * 1.19;
    else totals[c] = totals[c] * 1.10;
  });
  return totals;
}
