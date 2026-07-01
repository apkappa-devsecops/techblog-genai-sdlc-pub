# Quick Lab 05 - Complex Debugging

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

### 1 — Find the logic bugs
**Techniques used:** Chain-of-Thought · Few-shot

**🚫 Vague prompt:**
> "Find logic bugs in this code with reproducible examples."

**✅ Prompt with technique:**
> "Analyze the logic of this code step by step. For each bug found, provide a reproducible example following this schema:
>
> - Input: `compute_total(100, is_vip=False, coupon_percent=0.2)`
> - Actual result: `80.0`
> - Expected result: `80.0`
> - Bug: none in this case
>
> Use the same schema for every bug you find. Distinguish between symptom (e.g. 'total is wrong') and root cause (e.g. 'the fallback silently ignores valid discounts')."

> **Observation:** Few-shot provides the exact format for the reproducible example, preventing Copilot from describing bugs narratively without demonstrating them. The explicit symptom/root cause distinction counters the main risk: Copilot identifying the symptom without finding the actual cause.

---

### 2 — Fix without changing the public signature
**Technique used:** Reflexion

**🚫 Vague prompt:**
> "Fix them without changing the public function signature."

**✅ Prompt with technique:**

**Phase 1 — Generate the fix:**
> "Fix the bugs found without changing the public signature of `compute_total`."

**Phase 2 — Self-review:**
> "Now critically review the fix you just proposed:
> 1. Has the signature `compute_total(amount, is_vip, coupon_percent)` remained unchanged?
> 2. Is the meaning of each parameter preserved?
> 3. Are there edge cases where the fix produces a different result from the original code on valid inputs?
> 4. Could the fix introduce new bugs?
>
> If you find issues, propose a corrected version."

> **Observation:** The self-review phase forces Copilot to explicitly check the public contract and edge cases, reducing the risk that an apparently correct fix breaks valid behaviors or silently changes the semantics of the parameters.

---

### 3 — Generate tests on boundary cases
**Technique used:** Generate Knowledge

**🚫 Vague prompt:**
> "Generate unit tests covering discounts and VIP scenarios."

**✅ Prompt with technique:**
> "First list all relevant input combinations for `compute_total`: boundary values of `coupon_percent` (0, 1, >1), combinations with `is_vip`, extreme values of `amount` (0, negative, very large).
>
> Then, for each combination listed, generate a unit test that verifies the correct behavior. Each test must fail with the original buggy code and pass with the corrected code."

> **Observation:** Generate Knowledge forces Copilot to build the map of relevant cases first, then write the tests. This prevents tests from covering only typical scenarios (VIP with standard discount) while ignoring the boundary cases that were at the root of the bugs.

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




