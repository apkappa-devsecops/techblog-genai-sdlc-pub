
const TAX_RATE = 0.22;

interface OrderItem {
  product: string;
  qty: number;
  price: number;
}

export class Inventory {
  private stock: Record<string, number> = {};

  restock(product: string, qty: number): void {
    this.stock[product] = (this.stock[product] ?? 0) + qty;
  }

  check(product: string, qty: number): boolean {
    return (this.stock[product] ?? 0) >= qty;
  }

  reserve(product: string, qty: number): void {
    this.stock[product] -= qty;
  }
}

export class Notification {
  sendConfirmation(orderId: string, total: number, items: OrderItem[]): void {
    console.log(`Order ${orderId} confirmed: ${JSON.stringify(items)}, total=${total}`);
  }
}

export class Order {
  private counter = 0;

  constructor(
    private inventory: Inventory,
    private notification: Notification
  ) {}

  place(items: OrderItem[], discountPct: number = 0): { orderId: string; total: number; items: OrderItem[] } {
    for (const item of items) {
      if (!this.inventory.check(item.product, item.qty)) {
        throw new Error(`Out of stock: ${item.product}`);
      }
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    // BUG: tax applied before discount
    const taxed = subtotal + subtotal * TAX_RATE;
    const total = taxed - (taxed * discountPct) / 100;

    for (const item of items) {
      this.inventory.reserve(item.product, item.qty);
    }

    this.counter++;
    const orderId = `ORD-${String(this.counter).padStart(4, '0')}`;

    // BUG: notification never called

    return { orderId, total: Math.round(total * 100) / 100, items };
  }
}
