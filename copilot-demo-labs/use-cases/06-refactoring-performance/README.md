# Quick Lab 06 - Refactoring & Performance

**Difficulty**: `Intermediate` | **Duration**: `15 min`

## Goal
Improve readability and performance without changing behavior.

## Files
- `src/ReportProcessor.cs`
- `src/ReportProcessor.py`
- `src/ReportProcessor.ts`
- `src/ReportProcessor.js`

All files contain equivalent report-processing logic in different languages and can be used as alternative starting points for the lab.

## Steps
1. Open the file in your preferred language and ask Copilot to identify code smells and bottlenecks.
2. Ask for a minimal refactoring patch.
3. Ask for optimization for large inputs.
4. Ask for a regression test plan.

## Prompts

### 1 — Refactoring for readability
**Technique used:** Role-based

**🚫 Vague prompt:**
> "Refactor this code to improve readability without changing behavior."

**✅ Prompt with technique:**
> "Act as a senior developer doing a code review before a merge. Identify the readability issues in this code and propose a minimal patch to fix them. For each change explain what improves and why. Do not add features that are not already present and do not change the signature of `run_lab_variant`."

> **Observation:** The "reviewer before merge" role focuses Copilot on conservative and justified changes, reducing the risk that it restructures the architecture instead of only improving readability.

---

### 2 — Optimization for large inputs
**Technique used:** Chain-of-Thought

**🚫 Vague prompt:**
> "Optimize for high volumes and explain the complexity before and after."

**✅ Prompt with technique:**
> "Analyze the performance of this code step by step:
> 1. What is the current complexity¹? Identify each loop and explain whether it is O(n), O(n²), or other
> 2. What are the bottlenecks with large inputs (e.g. thousands of orders with many items)?
> 3. Propose a concrete optimization and calculate the new complexity
> 4. Verify that the optimization does not change the final result
>
> Show your reasoning for each point before proposing the code."

> **Observation:** CoT forces Copilot to demonstrate complexity¹ by analyzing the actual loops instead of declaring it generically. The explicit point 4 counters the risk that the optimization silently changes the behavior.

---

### 3 — Regression test plan
**Technique used:** Self-Consistency

**🚫 Vague prompt:**
> "Propose 5 regression tests to validate the refactoring."

**✅ Prompt with technique:**

**📝 Prompt A:**
> "You are the author of the refactoring. What tests would you write to prove that the behavior has not changed?"

**📝 Prompt B:**
> "You are the QA engineer who must approve the merge. What scenarios would you want covered before giving the green light?"

**📝 Prompt C:**
> "You are a developer using `run_lab_variant` in production. Which inputs would concern you most after a refactoring?"

**🔍 Prompt D:**
> "Compare the three lists. Which scenarios appear in all three? Those are the essential regression tests. Generate the code for each one."

> **Observation:** The three perspectives produce different angles — the author tends to cover typical cases, QA covers edge cases, the production developer covers anomalous inputs. The intersection produces the most robust tests.

## Expected Output
- Refactoring patch
- Performance improvement with explanation
- Short test plan

## Done When
- Code is cleaner
- No obvious regressions introduced

## Watch Out For
- Refactored code may silently change behavior (e.g., different rounding, different null handling). Diff carefully.
- Big-O claims may be wrong — AI sometimes says "O(n)" without checking nested loops.
- Proposed tests may only cover the happy path and miss the tricky cases the refactoring was supposed to preserve.

## Note
> ¹ **Computational complexity (Big-O notation):** measures how execution time grows as the input size increases. O(n) means time grows linearly with the number of elements; O(n²) means doubling the input quadruples the time. In this lab, two nested loops over `orders` and `items` produce O(n×m) where n is the number of orders and m is the average number of items per order.




