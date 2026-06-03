
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  add(name, price, qty) {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.qty += qty;
      return;
    }
    this.items.push({ name, price, qty });
  }

  remove(name) {
    this.items = this.items.filter(i => i.name !== name);
  }

  setDiscount(pct) {
    this.discount = pct;
  }

  total() {
    let t = 0;
    for (const i of this.items) {
      t += i.price * i.qty;
    }
    if (this.discount) {
      t = t - (t * this.discount) / 100;
    }
    if (t < 0) t = 0;
    return Math.round(t * 100) / 100;
  }

  summary() {
    const lines = [];
    for (const i of this.items) {
      lines.push(`${i.name} x${i.qty} = ${i.price * i.qty}`);
    }
    lines.push(`Discount: ${this.discount}%`);
    lines.push(`Total: ${this.total()}`);
    return lines.join('\n');
  }
}

module.exports = { ShoppingCart };
