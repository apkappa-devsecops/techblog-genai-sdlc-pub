using System;

namespace Demo;

public static class OrderPricing
{
    // Computes the total price after applying coupon and VIP discount
    // amount: original order amount
    // isVip: whether the customer is a VIP (gets extra discount)
    // couponPercent: discount percentage as a decimal (e.g., 0.2 for 20%)
    public static decimal ComputeTotal(decimal amount, bool isVip = false, decimal couponPercent = 0)
    {
        var total = amount;

        if (couponPercent > 0)
        {
            total = total - amount * couponPercent;
        }

        if (isVip)
        {
            total = total - total * 0.1m;
        }

        if (total < 0)
        {
            total = amount;
        }

        return Math.Round(total, 2);
    }
}
