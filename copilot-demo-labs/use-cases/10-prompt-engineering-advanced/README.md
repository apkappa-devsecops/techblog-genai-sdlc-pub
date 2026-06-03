# Lab 10 — Prompt Engineering: Advanced Techniques

**Difficulty**: `Intermediate` | **Duration**: `50 min`

## Goal
Extend Lab 09 with 7 advanced techniques for exploring alternatives, having the AI self-correct, and automating prompt generation.

**Techniques covered:** Tree of Thoughts (ToT) · Directional Stimulus · Reflexion · ReAct · Active Prompt · ART (Automatic Reasoning and Tool-use) · Automatic Prompt Engineer (APE)
>**Reference:** [Prompting Guide — Techniques](https://www.promptingguide.ai/techniques)

## Files
- `specs/scenario.md` — business rules and known issues
- `src/order_management.py` | `src/order_management.ts` | `src/order_management.js` | `src/OrderManagement.cs`

All four source files contain the same order management logic (Inventory, Notification, Order) with intentional bugs. Read the scenario first, then pick a file.

## Steps

> **Note:** Each step is independent. Always start from the original code, not from code modified in previous steps.

### 1 — Tree of Thoughts (ToT) Prompting Technique
Ask Copilot to consider multiple solution approaches for the tax/discount bug before choosing one. Compare the quality of the chosen approach against a direct "fix this" prompt.

**🚫 Direct prompt:**
> "Fix the tax/discount calculation bug in the place() method."

**✅ ToT prompt:**
> "I need to fix the tax/discount calculation bug in the place() method. Consider three different approaches:
>
> **A) Fix in-place** — correct the arithmetic order in the existing method.
> **B) Extract a PriceCalculator** — pull calculation into a separate class/function with clear responsibilities.
> **C) Pipeline pattern** — model the calculation as a sequence of transformations (subtotal → discount → tax → total).
>
> For each approach:
> 1. Describe the implementation
> 2. List pros and cons
> 3. Estimate the complexity and risk of introducing new bugs
>
> Then recommend the best approach and implement it."

> **Observation:** The model weighs trade-offs when asked to compare multiple options. With a direct prompt, it proposes the first approach it thinks of without considering alternatives.

### 2 — Directional Stimulus Prompting Technique
Compare a generic review prompt with one that includes a strategic hint pointing Copilot toward the arithmetic order bug.

**🚫 Without directional stimulus:**
> "Review the Order class and find bugs."

**✅ With directional stimulus:**
> "Review the Order class. Pay special attention to the order of arithmetic operations in the place() method — I suspect the financial calculation might apply tax and discount in the wrong sequence."

> **Observation:** The unguided prompt may focus on surface-level issues (missing null checks). The guided prompt zeros in on the subtler arithmetic bug immediately. Caution: if your hint points in the wrong direction, the analysis will follow that wrong direction.

### 3 — Reflexion Technique
Ask Copilot to fix the bugs, then immediately ask it to critique its own fix. Observe whether the self-review catches edge cases that the initial fix missed.

**🔗 Phase 1 — Generate the fix:**
> "Fix all bugs in the place() method based on the business rules in scenario.md."

**🔗 Phase 2 — Self-review:**
> "Now critically review your own fix:
> 1. Does it handle all edge cases? (empty order, discount = 0, discount = 100%, negative prices)
> 2. Does it respect ALL business rules from scenario.md?
> 3. Is the notification called with complete data (order ID, total, item list)?
> 4. Could this fix introduce any new bugs?
>
> If you find issues, provide a corrected version."

> **Observation:** The self-review phase almost always catches at least one edge case the initial fix missed. Here the AI critiques itself, rather than the user guiding it.

### 4 — ReAct (Reasoning + Acting) Technique
Ask Copilot to debug using a structured Thought → Action → Observation cycle. Compare the depth of analysis with a direct "find the bugs" prompt.

**🚫 Direct prompt:**
> "Find all bugs in the order management code."

**✅ ReAct prompt:**
> "Debug the order management system step by step using this structured approach. For each step:
>
> **THOUGHT:** What do you suspect might be wrong? Why?
> **ACTION:** What specific part of the code will you examine?
> **OBSERVATION:** What did you find in that code?
>
> Repeat this cycle until you've found all bugs. Then summarize your findings and provide fixes.
>
> Start with THOUGHT 1."

> **Observation:** The ReAct format is verbose but produces a traceable debugging log. Each finding is grounded in a specific observation about the code. The direct prompt may list bugs without showing how they were found.

### 5 — Active Prompt Technique
Provide Copilot with examples annotated with your degree of uncertainty, so the AI focuses on the areas where you have the most doubts.

**🚫 Generic prompt:**
> "Find problems in the place() method."

**✅ Active prompt:**
> "Analyze the place() method. Here are my annotations on what seems correct and what doesn't:
>
> - ✅ SURE: the stock check works correctly
> - ❓ UNCERTAIN: the order of tax/discount application — I don't know if it's right
> - ❓ UNCERTAIN: the notification — I'm not sure it gets called
> - ✅ SURE: the order data structure is correct
>
> Focus ONLY on the items marked as UNCERTAIN. For each one, tell me if my doubt is justified and why."

> **Observation:** Annotating uncertainty guides the AI toward the areas that actually matter, avoiding redundant analysis on already-verified parts. Particularly useful on large codebases where you want a targeted review, not a complete one.

### 6 — ART (Automatic Reasoning and Tool-use) Technique
Ask Copilot to combine step-by-step reasoning with explicit use of "tools" (functions, commands, queries) to solve the problem.

**🚫 Prompt without tool-use structure:**
> "The total calculation is wrong. Fix it."

**✅ ART prompt:**
> "Solve the bug in the order total calculation using this structured approach. For each step, alternate reasoning and tool use:
>
> **REASONING:** What is the business rule? (subtotal → discount → tax)
> **TOOL [calculate]:** Calculate the expected result for a 100.00 order with 10% discount and 22% tax.
> **REASONING:** What does the current code produce instead?
> **TOOL [trace]:** Mentally execute the place() method with the same values and show each intermediate step.
> **REASONING:** Where do the two results diverge?
> **TOOL [fix]:** Write the corrected code.
>
> Follow this sequence exactly."

> **Observation:** ART makes explicit *when* the AI reasons and *when* it uses a tool (calculation, trace, code generation). This produces more reliable answers because each conclusion is anchored to a verifiable action.

### 7 — Automatic Prompt Engineer (APE) Technique
Instead of writing the perfect prompt yourself, ask Copilot to generate the best prompt for a given objective. Then use that generated prompt.

**🔗 Phase 1 — Generate the prompt:**
> "My goal is to find all financial bugs in the place() method of this code. Generate 3 different prompts I could use to get the best possible analysis from an AI assistant. For each prompt, explain why it should work well."

**🔗 Phase 2 — Use the best prompt:**
> Copy the prompt that seems most effective among the 3 generated and use it in a new conversation.

**🔗 Phase 3 — Compare:**
> Compare the result obtained with the AI-generated prompt against a prompt you wrote manually.

> **Observation:** The AI often generates more structured and complete prompts than we would write, because it "knows" the patterns that produce the best responses. APE is useful when you don't know where to start or want to optimize an existing prompt.

## Watch Out For
- Tree of Thoughts works best when you ask for 3+ approaches; with only 2, the model may not genuinely compare.
- Directional Stimulus can introduce bias — if your hint is wrong, the analysis will be too.
- Reflexion can produce superficial self-critique if the prompt doesn't demand specificity.
- ReAct is verbose by design — the value is in the reasoning trace.
- Active Prompt requires that you already have a partial understanding of the code — it doesn't work if you're starting from zero.
- ART can produce "fake tools" — make sure intermediate calculations are verifiable.
- APE can generate overly complex prompts — choose the clearest one, not the longest.

## Expected Output
- Tree of Thoughts producing a reasoned comparison of at least 3 fix strategies
- Directional Stimulus finding the tax/discount bug faster than the unguided prompt
- Reflexion catching at least one edge case missed by the initial fix
- ReAct producing a traceable debugging log with clear reasoning
- Active Prompt focusing the analysis only on areas of uncertainty
- ART producing a verifiable reasoning-tool chain step by step
- APE generating a prompt more effective than the one written manually

## Done When
- You have tried all 7 techniques and have a sense of when each is most useful
