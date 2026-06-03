namespace Demo;

public class CartItem
{
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Qty { get; set; }
}

public class ShoppingCart
{
    private readonly List<CartItem> _items = new();
    private decimal _discount;

    public void Add(string name, decimal price, int qty)
    {
        var existing = _items.FirstOrDefault(i => i.Name == name);
        if (existing is not null)
        {
            existing.Qty += qty;
            return;
        }
        _items.Add(new CartItem { Name = name, Price = price, Qty = qty });
    }

    public void Remove(string name)
    {
        _items.RemoveAll(i => i.Name == name);
    }

    public void SetDiscount(decimal pct)
    {
        _discount = pct;
    }

    public decimal Total()
    {
        var t = _items.Sum(i => i.Price * i.Qty);
        if (_discount > 0)
        {
            t -= t * _discount / 100;
        }
        if (t < 0) t = 0;
        return Math.Round(t, 2);
    }

    public string Summary()
    {
        var lines = _items.Select(i => $"{i.Name} x{i.Qty} = {i.Price * i.Qty}").ToList();
        lines.Add($"Discount: {_discount}%");
        lines.Add($"Total: {Total()}");
        return string.Join("\n", lines);
    }
}
