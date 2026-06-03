def run_lab_variant(payload: dict) -> dict:
    orders = payload.get("orders", [])
    totals = {}
    for order in orders:
        country = order.get("country") or "UNKNOWN"
        if country not in totals:
            totals[country] = 0
        for item in order.get("items", []):
            totals[country] += item["qty"] * item["price"]
    # Second pass for tax logic
    for c in list(totals.keys()):
        if c == "IT":
            totals[c] = totals[c] * 1.22
        elif c == "DE":
            totals[c] = totals[c] * 1.19
        else:
            totals[c] = totals[c] * 1.10
    return totals
