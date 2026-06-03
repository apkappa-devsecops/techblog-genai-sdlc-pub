# Scenario: Order Management API

A small e-commerce backend with three interconnected modules.

## Modules
1. **Inventory** — tracks product stock levels
2. **Order** — creates orders, validates stock, calculates totals
3. **Notification** — sends order confirmation (stub)

## Business Rules
- An order cannot be placed if any item is out of stock.
- Order total must include tax (22%) applied after any discount.
- Notifications must include order ID, total, and item list.

## Known Issues
- Discounts over 100% are not rejected (missing upper-bound validation).
- Tax is applied before discount instead of after.
- The notification module is never called after order creation.

## Your Task
Use prompt engineering techniques of this lab to:
1. Ask Copilot to analyze the three modules together and find the bugs.
2. Iteratively refine your prompts to get better fixes.
3. Build a prompt cheatsheet for common SDLC tasks based on what worked.
