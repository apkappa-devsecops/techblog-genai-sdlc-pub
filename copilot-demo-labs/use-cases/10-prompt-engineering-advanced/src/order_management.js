
const TAX_RATE = 0.22;

class Inventory {
  constructor() {
    this.stock = {};
  }

  restock(product, qty) {
    this.stock[product] = (this.stock[product] ?? 0) + qty;
  }

  check(product, qty) {
    return (this.stock[product] ?? 0) >= qty;
  }

  reserve(product, qty) {
    this.stock[product] -= qty;
  }
}

class Notification {
  sendConfirmation(orderId, total, items) {
    console.log(`Order ${orderId} confirmed: ${JSON.stringify(items)}, total=${total}`);
  }
}

class Order {
  constructor(inventory, notification) {
    this.inventory = inventory;
    this.notification = notification;
    this.counter = 0;
  }

  place(items, discountPct = 0) {
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

module.exports = { Inventory, Notification, Order };
