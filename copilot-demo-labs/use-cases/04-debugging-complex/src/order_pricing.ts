// Computes the total price after applying coupon and VIP discount
// amount: original order amount
// isVip: whether the customer is a VIP (gets extra discount)
// couponPercent: discount percentage as a decimal (e.g., 0.2 for 20%)
export function computeTotal(amount: number, isVip: boolean = false, couponPercent: number = 0): number {
  let total = amount;

  if (couponPercent > 0) {
    total = total - amount * couponPercent;
  }

  if (isVip) {
    total = total - total * 0.1;
  }

  if (total < 0) {
    total = amount;
  }

  return Math.round(total * 100) / 100;
}
