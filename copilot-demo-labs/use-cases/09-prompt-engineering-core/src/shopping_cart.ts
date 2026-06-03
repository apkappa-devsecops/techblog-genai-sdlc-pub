
interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export class ShoppingCart {
  items: CartItem[] = [];
  discount: number = 0;

  add(name: string, price: number, qty: number): void {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.qty += qty;
      return;
    }
    this.items.push({ name, price, qty });
  }

  remove(name: string): void {
    this.items = this.items.filter(i => i.name !== name);
  }

  setDiscount(pct: number): void {
    this.discount = pct;
  }

  total(): number {
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

  summary(): string {
    const lines: string[] = [];
    for (const i of this.items) {
      lines.push(`${i.name} x${i.qty} = ${i.price * i.qty}`);
    }
    lines.push(`Discount: ${this.discount}%`);
    lines.push(`Total: ${this.total()}`);
    return lines.join('\n');
  }
}
