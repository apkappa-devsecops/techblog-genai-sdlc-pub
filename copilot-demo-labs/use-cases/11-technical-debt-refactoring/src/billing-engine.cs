using System;
using System.Collections.Generic;
using System.Linq;

namespace Demo;

public sealed class InvoiceLine
{
    public required string Description { get; init; }
    public decimal Price { get; init; }
    public decimal Qty { get; init; }
    public decimal? DiscountPercent { get; init; }
}

public sealed class Customer
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string Country { get; init; }
    public bool IsVip { get; init; }
    public decimal CreditBalance { get; init; }
}

public sealed class Invoice
{
    public required string CustomerId { get; init; }
    public required List<InvoiceLine> Lines { get; init; }
    public decimal Subtotal { get; init; }
    public decimal Discount { get; init; }
    public decimal TaxRate { get; init; }
    public decimal Tax { get; init; }
    public decimal CreditApplied { get; init; }
    public decimal Total { get; init; }
    public required string Currency { get; init; }
    public DateTime IssuedAt { get; init; }
}

public static class BillingEngine
{
    private static readonly Dictionary<string, decimal> TaxRates = new()
    {
        ["IT"] = 0.22m,
        ["DE"] = 0.19m,
        ["FR"] = 0.20m,
        ["US"] = 0.0m,
    };

    private const decimal VipDiscount = 0.05m;

    public static decimal GetTaxRate(string country)
    {
        return TaxRates.TryGetValue(country, out var value) ? value : 0.10m;
    }

    public static decimal ComputeLineTotal(InvoiceLine line)
    {
        var gross = line.Price * line.Qty;
        var discount = line.DiscountPercent.HasValue
            ? gross * (line.DiscountPercent.Value / 100)
            : 0;
        return Math.Round(gross - discount, 2);
    }

    public static Invoice CalculateInvoice(Customer customer, List<InvoiceLine> lines, bool applyCredit = true)
    {
        var subtotal = 0m;
        foreach (var line in lines)
        {
            subtotal += ComputeLineTotal(line);
        }

        var discount = customer.IsVip ? subtotal * VipDiscount : 0;
        var taxableAmount = subtotal - discount;
        var taxRate = GetTaxRate(customer.Country);
        var tax = Math.Round(taxableAmount * taxRate, 2);

        var total = taxableAmount + tax;

        var creditApplied = 0m;
        if (applyCredit && customer.CreditBalance > 0)
        {
            creditApplied = Math.Min(customer.CreditBalance, total);
            total = Math.Round(total - creditApplied, 2);
        }

        return new Invoice
        {
            CustomerId = customer.Id,
            Lines = lines,
            Subtotal = subtotal,
            Discount = discount,
            TaxRate = taxRate,
            Tax = tax,
            CreditApplied = creditApplied,
            Total = total,
            Currency = "EUR",
            IssuedAt = DateTime.Now,
        };
    }

    public static string FormatInvoiceSummary(Invoice invoice)
    {
        var header = $"Invoice for {invoice.CustomerId} - {invoice.IssuedAt:yyyy-MM-dd}";
        var body = string.Join("\n", invoice.Lines.Select(line => $"  {line.Description}: {line.Qty} x EUR{line.Price}"));
        var totals = new List<string>
        {
            $"  Subtotal: EUR{invoice.Subtotal:F2}",
            $"  Tax ({invoice.TaxRate * 100:F0}%): EUR{invoice.Tax:F2}",
            $"  Total: EUR{invoice.Total:F2}",
        };

        if (invoice.Discount > 0)
        {
            totals.Insert(1, $"  VIP discount: -EUR{invoice.Discount:F2}");
        }

        if (invoice.CreditApplied > 0)
        {
            totals.Insert(totals.Count - 1, $"  Credit applied: -EUR{invoice.CreditApplied:F2}");
        }

        return $"{header}\n{body}\n{string.Join("\n", totals)}";
    }
}
