class ShoppingCart:
    def __init__(self):
        self.items = []
        self.discount = 0

    def add(self, name, price, qty):
        for i in self.items:
            if i["name"] == name:
                i["qty"] += qty
                return
        self.items.append({"name": name, "price": price, "qty": qty})

    def remove(self, name):
        self.items = [i for i in self.items if i["name"] != name]

    def set_discount(self, pct):
        self.discount = pct

    def total(self):
        t = 0
        for i in self.items:
            t += i["price"] * i["qty"]
        if self.discount:
            t = t - t * self.discount / 100
        if t < 0:
            t = 0
        return round(t, 2)

    def summary(self):
        lines = []
        for i in self.items:
            lines.append(f"{i['name']} x{i['qty']} = {i['price'] * i['qty']}")
        lines.append(f"Discount: {self.discount}%")
        lines.append(f"Total: {self.total()}")
        return "\n".join(lines)
