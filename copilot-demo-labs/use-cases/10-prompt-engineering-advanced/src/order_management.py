TAX_RATE = 0.22


class Inventory:
    def __init__(self):
        self._stock = {}

    def restock(self, product: str, qty: int):
        self._stock[product] = self._stock.get(product, 0) + qty

    def check(self, product: str, qty: int) -> bool:
        return self._stock.get(product, 0) >= qty

    def reserve(self, product: str, qty: int):
        self._stock[product] -= qty


class Notification:
    def send_confirmation(self, order_id: str, total: float, items: list):
        print(f"Order {order_id} confirmed: {items}, total={total}")


class Order:
    def __init__(self, inventory: Inventory, notification: Notification):
        self.inventory = inventory
        self.notification = notification
        self._counter = 0

    def place(self, items: list[dict], discount_pct: float = 0) -> dict:
        # items: [{"product": "X", "qty": 2, "price": 10.0}, ...]
        for item in items:
            if not self.inventory.check(item["product"], item["qty"]):
                raise ValueError(f"Out of stock: {item['product']}")

        subtotal = sum(i["price"] * i["qty"] for i in items)

        # BUG: tax applied before discount
        taxed = subtotal + subtotal * TAX_RATE
        total = taxed - taxed * discount_pct / 100

        for item in items:
            self.inventory.reserve(item["product"], item["qty"])

        self._counter += 1
        order_id = f"ORD-{self._counter:04d}"

        # BUG: notification never called

        return {"order_id": order_id, "total": round(total, 2), "items": items}
