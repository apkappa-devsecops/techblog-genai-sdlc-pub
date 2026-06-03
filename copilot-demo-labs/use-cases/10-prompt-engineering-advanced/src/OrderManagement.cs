namespace Demo;

public record OrderItem(string Product, int Qty, decimal Price);

public class Inventory
{
    private readonly Dictionary<string, int> _stock = new();

    public void Restock(string product, int qty)
    {
        _stock[product] = _stock.GetValueOrDefault(product) + qty;
    }

    public bool Check(string product, int qty)
    {
        return _stock.GetValueOrDefault(product) >= qty;
    }

    public void Reserve(string product, int qty)
    {
        _stock[product] -= qty;
    }
}

public class Notification
{
    public void SendConfirmation(string orderId, decimal total, List<OrderItem> items)
    {
        Console.WriteLine($"Order {orderId} confirmed: {string.Join(", ", items)}, total={total}");
    }
}

public class Order
{
    private const decimal TaxRate = 0.22m;
    private readonly Inventory _inventory;
    private readonly Notification _notification;
    private int _counter;

    public Order(Inventory inventory, Notification notification)
    {
        _inventory = inventory;
        _notification = notification;
    }

    public (string OrderId, decimal Total, List<OrderItem> Items) Place(List<OrderItem> items, decimal discountPct = 0)
    {
        foreach (var item in items)
        {
            if (!_inventory.Check(item.Product, item.Qty))
                throw new InvalidOperationException($"Out of stock: {item.Product}");
        }

        var subtotal = items.Sum(i => i.Price * i.Qty);

        // BUG: tax applied before discount
        var taxed = subtotal + subtotal * TaxRate;
        var total = taxed - taxed * discountPct / 100;

        foreach (var item in items)
        {
            _inventory.Reserve(item.Product, item.Qty);
        }

        _counter++;
        var orderId = $"ORD-{_counter:D4}";

        // BUG: notification never called

        return (orderId, Math.Round(total, 2), items);
    }
}
