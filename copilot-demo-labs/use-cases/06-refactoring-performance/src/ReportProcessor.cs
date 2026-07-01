namespace Demo;

public static class ReportProcessor
{
    public static Dictionary<string, decimal> SummarizeOrders(List<Order> orders)
    {
        var totals = new Dictionary<string, decimal>();

        for (var i = 0; i < orders.Count; i++)
        {
            var order = orders[i];
            var country = order.Country ?? "UNKNOWN";

            if (!totals.ContainsKey(country))
            {
                totals[country] = 0;
            }

            for (var j = 0; j < order.Items.Count; j++)
            {
                var item = order.Items[j];
                totals[country] = totals[country] + (item.Qty * item.Price);
            }
        }

        // Second pass, intentionally suboptimal for refactoring exercise.
        foreach (var c in totals.Keys.ToList())
        {
            if (c == "IT") totals[c] = totals[c] * 1.22m;
            else if (c == "DE") totals[c] = totals[c] * 1.19m;
            else totals[c] = totals[c] * 1.10m;
        }

        return totals;
    }
}

public sealed class Order
{
    public string? Country { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}

public sealed class OrderItem
{
    public decimal Qty { get; set; }
    public decimal Price { get; set; }
}
