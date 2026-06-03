# Quick Lab 04 - Complex Debugging

**Difficulty**: `Intermediate` | **Duration**: `15 min`

## Goal
Find logic bugs and prevent regressions.

## Files
- `src/order_pricing.py`
- `src/order_pricing.ts`
- `src/order_pricing.js`
- `src/order_pricing.cs`

All four files contain equivalent pricing logic in different languages and can be used as alternative starting points for the lab.

## Steps
1. Read the expected behavior described in the comments.
2. Ask Copilot to find logic bugs with examples.
3. Ask for a fix that keeps the public signature unchanged.
4. Ask for tests on boundary cases.

## Prompts
- "Find logic bugs in this code with reproducible examples."
- "Fix them without changing the public function signature."
- "Generate unit tests covering discounts and VIP scenarios."

## Expected Output
- List of defects with proof
- Corrective patch
- Unit tests

## Done When
- Bugs are verified and covered by tests

## Watch Out For
- AI may identify symptoms but miss the root cause (e.g., noting "total is wrong" without finding the division-vs-percentage bug).
- Proposed fixes may accidentally change the public API contract.
- Make sure your tests cover edge cases and possible bugs, not just typical scenarios.




