
from datetime import datetime


TAX_RATES = {
    "IT": 0.22,
    "DE": 0.19,
    "FR": 0.20,
    "US": 0.0,
}

VIP_DISCOUNT = 0.05


def get_tax_rate(country: str) -> float:
    return TAX_RATES.get(country, 0.10)


def compute_line_total(line: dict) -> float:
    gross = line["price"] * line["qty"]
    discount = gross * (line.get("discountPercent", 0) / 100) if line.get("discountPercent") else 0
    return round(gross - discount, 2)


def calculate_invoice(customer: dict, lines: list[dict], apply_credit: bool = True) -> dict:
    subtotal = 0.0
    for line in lines:
        subtotal += compute_line_total(line)

    discount = subtotal * VIP_DISCOUNT if customer["isVip"] else 0
    taxable_amount = subtotal - discount
    tax_rate = get_tax_rate(customer["country"])
    tax = round(taxable_amount * tax_rate, 2)

    total = taxable_amount + tax

    credit_applied = 0.0
    if apply_credit and customer["creditBalance"] > 0:
        credit_applied = min(customer["creditBalance"], total)
        total = round(total - credit_applied, 2)

    return {
        "customerId": customer["id"],
        "lines": lines,
        "subtotal": subtotal,
        "discount": discount,
        "taxRate": tax_rate,
        "tax": tax,
        "creditApplied": credit_applied,
        "total": total,
        "currency": "EUR",
        "issuedAt": datetime.now(),
    }


def format_invoice_summary(invoice: dict) -> str:
    header = f"Invoice for {invoice['customerId']} - {invoice['issuedAt'].isoformat()[:10]}"
    body = "\n".join(
        f"  {line['description']}: {line['qty']} x EUR{line['price']}"
        for line in invoice["lines"]
    )

    totals = [
        f"  Subtotal: EUR{invoice['subtotal']:.2f}",
        f"  VIP discount: -EUR{invoice['discount']:.2f}" if invoice["discount"] > 0 else None,
        f"  Tax ({invoice['taxRate'] * 100:.0f}%): EUR{invoice['tax']:.2f}",
        f"  Credit applied: -EUR{invoice['creditApplied']:.2f}" if invoice["creditApplied"] > 0 else None,
        f"  Total: EUR{invoice['total']:.2f}",
    ]

    return f"{header}\n{body}\n{"\n".join(value for value in totals if value)}"
