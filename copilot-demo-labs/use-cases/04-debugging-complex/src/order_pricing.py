# Computes the total price after applying coupon and VIP discount
# amount: original order amount
# is_vip: whether the customer is a VIP (gets extra discount)
# coupon_percent: discount percentage as a decimal (e.g., 0.2 for 20%)

def compute_total(amount: float, is_vip: bool = False, coupon_percent: float = 0) -> float:

    total = amount

    if coupon_percent > 0:
        total = total - amount * coupon_percent

    if is_vip:
        total = total - total * 0.1

    if total < 0:
        total = amount

    return round(total, 2)
