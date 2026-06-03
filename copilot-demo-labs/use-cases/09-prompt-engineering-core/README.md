# Lab 09 — Prompt Engineering: Core Techniques

**Difficulty**: `Beginner` | **Duration**: `50 min`

## Goal
Master 9 core prompting techniques for effective interaction with Copilot.

**Why does this matter?**
A weak prompt leads to a superficial code review. A good prompt can find bugs *before* they reach production. This lab shows how to get precise answers and compares them with the results of generic questions.

**Prompting Techniques covered:** Zero-shot · Few-shot · Role-based · Chain-of-Thought (CoT) · Meta Prompting · Self-Consistency · Generate Knowledge · Prompt Chaining · Anti-pattern Recognition
>**Reference:** [Prompting Guide — Techniques](https://www.promptingguide.ai/techniques)

## Files
- `src/shopping_cart.py` | `src/shopping_cart.ts` | `src/shopping_cart.js` | `src/ShoppingCart.cs`

All four source files are equivalent in terms of logic. Pick one to follow the lab.

## Steps

> **Note:** Each step is independent. Always start from the original code, not from code modified in previous steps.

### 1 — Zero-Shot Prompting Technique in Code Review: Vague Prompt vs. Specific Prompt
Run the vague zero-shot prompt on the code, then the specific one.

**🚫 Vague prompt:**
> "Review this code."

**✅ Specific zero-shot prompt:**
> "Review this ShoppingCart class acting as a senior developer. Focus on input validation, edge cases (negative prices, zero quantities, discount > 100%), and naming conventions. List issues by severity."

> **Observation:** The specific prompt produces a more structured and actionable review, while the vague one offers a generic overview. Being specific forces Copilot to assume the indicated "Senior Reviewer" role and focus on the indicated tasks.

### 2 — Zero-Shot Prompting Technique in Code Refactoring: Vague Prompt vs. Specific Prompt
Run the vague zero-shot prompt on the code, then the specific one that includes constraints.

**🚫 Vague prompt:**
> "Refactor this code."

**✅ Specific prompt:**
> "Refactor the total() method to extract discount calculation into a separate pure function. Keep backward compatibility. Explain each change."

> **Observation:** The specific prompt extracts calculations cleanly, while the vague one just rearranges and renames variables.

### 3 — Few-shot Prompting Technique and Comparison with Zero-Shot Prompting
Run the zero-shot prompt on the code, then the few-shot prompt containing the example of the desired validation pattern.

**🚫 Without example (zero-shot):**
> "Add validation to the add method."

**✅ With example (few-shot):**
> "Add validation to the add method. For reference, here's the pattern to use:
> - If name is empty, raise ValueError('Name is required')
> - If price < 0, raise ValueError('Price must be non-negative')
> Follow this same pattern for qty validation."

> **Observation:** The few-shot prompt allows Copilot to use the predefined error-handling style instead of proposing a generic one. Show Copilot what you want to achieve through examples, don't just explain it in words.

### 4 — Role-based Prompting Technique
Ask Copilot to analyze the same code as a **security auditor**, then again as a **performance engineer**.

**🔒 Role (security):**
> "Act as a security auditor reviewing this code before production deployment. Identify any input that could cause unexpected behavior, data corruption, or financial miscalculation."

**🚀 Role (performance):**
> "Act as a performance engineer. Analyze this ShoppingCart class for bottlenecks, unnecessary iterations, and memory inefficiencies. Suggest optimizations."

> **Observation:** Notice how the focus shifts completely from input vulnerabilities to memory bottlenecks.

### 5 — Chain-of-Thought Prompting Technique
Ask a direct question and compare the answer with a prompt that enforces step-by-step reasoning (CoT).

**🚫 Direct prompt:**
> "Is the total() method correct?"

**✅ CoT prompt:**
> "Analyze the total() method step by step:
> 1. What does it calculate first?
> 2. When is the discount applied? Is the formula correct?
> 3. What happens with edge cases: discount = 0, discount = 100, discount > 100?
> 4. Is the rounding correct?
> Show your reasoning for each step before giving a final verdict."

> **Observation:** CoT forces the AI to "show its work," surfacing aspects that the direct prompt may ignore.

### 6 — Meta Prompting Technique
Provide Copilot with the structure to follow when producing the answer.

**🚫 Content-only prompt:**
> "Find bugs in this code and fix them."

**✅ Structure-driven (meta) prompt:**
> "Analyze my code and for each issue found, respond using EXACTLY this structure:
>
> **Issue Category** (validation | logic | security | performance)
> **Location:** method name and line
> **Problem:** description of the problem
> **Impact:** what could go wrong in production
> **Fix:** proposed code correction
>
> Report all issues using only this format."

> **Observation:** The response adheres to the requested structure. A standardized and predictable output could theoretically be the input of a CI/CD pipeline, enabling automation.

### 7 — Self-Consistency Technique
Ask the same question to Copilot in three different ways and find the intersections in the answers.

**📝 Prompt A:**
> "What bugs does my code have?"

**📝 Prompt B:**
> "If I use this code with edge cases (negative prices, discount = 150%, quantity = 0, empty name), what breaks?"

**📝 Prompt C:**
> "Write unit tests that would fail with this implementation. Focus on edge cases."

**🔍 Then compare (Prompt D):**
> "Compare the three analyses just done. Which issues appeared in all three? Those are the confirmed bugs. Which appeared in only one? Those need investigation."

> **Observation:** Issues flagged in all three outputs are confirmed bugs. Issues found in only one might be hallucinations.

### 8 — Generate Knowledge Prompting Technique
This consists of having the AI generate the theoretical context *before* having it analyze the code. Instead of having it look for bugs right away, ask Copilot to theoretically list what the ideal rules for a perfect e-commerce cart would be (e.g., discount cannot exceed 100%, prices cannot be negative, etc.). Once this "checklist" is generated, have it evaluate the code against the rules it just wrote.

**🧠 Step 1 (Knowledge):**
> "List the business rules that a production-ready shopping cart should enforce: input validation, pricing rules, discount constraints, edge cases, and financial accuracy requirements."

**🔍 Step 2 (Grounded analysis):**
> "Now compare the current ShoppingCart implementation against these rules. For each rule, state whether it is enforced, partially enforced, or missing. Provide the fix for each missing rule."

> **Observation:** The AI catches gaps that would have been missed with a simple code review. Generate Knowledge stimulates the AI's focus on the specific domain, transforming an abstract check into a complete verification checklist.

### 9 — Prompt Chaining Technique
Run the 4 prompts in sequence, passing the output of the previous step as the prompt for the next one each time.

**🔗 Prompt 1:**
> "List all public methods in my code, their parameters, and return types."

**🔗 Prompt 2:**
> "For each method listed above, identify if input validation is missing. Be specific about which checks are missing."

**🔗 Prompt 3:**
> "Generate the validation code for all the issues found in the previous step. Keep the existing method signatures unchanged."

**🔗 Prompt 4:**
> "Write unit tests for the validation logic added in the previous step. Cover both valid and invalid inputs."

> **Observation:** Complex tasks become simple when broken into pieces. The entire pipeline (analysis -> patch -> unit testing) works in a few clicks.

### 10 — Anti-pattern Recognition Prompting Technique
Run the "generic error handling" prompt, then the prompt that targets specific validations.

**☠️ Dangerous prompt:**
> "Add error handling to all methods."

**🛡️ Safer prompt:**
> "Implement strict and immediate logical validation on input parameters. If an input is invalid (e.g., negative quantities, discounts > 100%), immediately raise a descriptive exception and block the operation. Mandatory: DO NOT use generic catch blocks (like try-catch or try-except) to ignore or silence logical exceptions."

> **Observation:** Simply asking Copilot to "avoid crashes" can guide it toward a dangerous anti-pattern (the so-called *Pokemon Exception Handling*), leading it to insert empty `catch` / `except` blocks everywhere. This can hide potential bugs. A safe prompt instead enforces a *Zero Tolerance* (or Immediate Block) approach: an anomaly must raise an obvious error and block the flow, so it can be properly analyzed.

## Watch Out For
- Vague prompts may still produce decent output on simple code — the gap becomes obvious on complex logic.
- Role-based prompts may cause Copilot to over-focus on one area (e.g., security) while ignoring others.
- Few-shot examples can bias the output too strongly — Copilot may copy the pattern even where it doesn't apply.
- CoT prompts may produce verbose output — that's expected and part of the reasoning value.
- Self-consistency works best when the three prompts are genuinely different in angle, not just paraphrases of the same request.

## Recap — Combining Techniques 🧩
The techniques above become even more powerful when combined in a single prompt or a sequence. Here are 3 practical examples.

---

### Example 1: Role-based + Chain-of-Thought + Meta Prompting
A structured security audit with explicit reasoning.

> "Act as a **senior security auditor**. Analyze the ShoppingCart class step by step:
> 1. Which user inputs are not validated?
> 2. Which boundary values can cause unexpected behavior?
> 3. Which financial calculations can produce incorrect results?
>
> For each issue found, respond using this structure:
> **Severity:** (critical | high | medium | low)
> **Location:** method and line
> **Problem:** description
> **Exploit:** how a malicious user could exploit it
> **Fix:** corrective code"

**Why it works:** The role focuses the analysis on security, CoT forces systematic reasoning, meta prompting ensures uniform and actionable output.

---

### Example 2: Generate Knowledge + Prompt Chaining + Few-shot
A complete validation driven by domain rules.

> **Prompt 1:** "List the business rules that a production-ready e-commerce shopping cart must enforce (input validation, pricing constraints, discount limits, financial accuracy)."
>
> **Prompt 2:** "Compare the ShoppingCart code against the rules you just listed. For each missing rule, generate validation code following this pattern:
> - If `price < 0`, raise `ValueError('Price must be non-negative')`
> - If `discount > 100`, raise `ValueError('Discount cannot exceed 100%')`
> Apply the same style to all missing validations."

**Why it works:** Generate Knowledge creates the reference checklist, chaining connects analysis to implementation, few-shot standardizes the generated code style.

---

### Example 3: Self-Consistency + Role-based + Anti-pattern Recognition
Multi-perspective triangulation to separate real bugs from false positives.

> **Prompt A (tester role):** "Act as a software tester. If you wrote tests for this class (including edge cases like negative prices, discounts over 100%, zero quantity), which tests would fail? For each one, explain why."
>
> **Prompt B (attacker role):** "Act as a penetration tester. Which inputs would cause incorrect behavior or wrong calculations?"
>
> **Prompt C (anti-pattern):** "Identify anti-patterns in this code (e.g., generic error handling, missing validation). For each one, explain the concrete risk in production."
>
> **Prompt D (synthesis):** "Compare the three analyses above. List only the issues confirmed by at least two perspectives. Ignore issues mentioned only once."

**Why it works:** Three different angles reduce hallucinations. The final synthesis filters noise and produces a high-confidence bug list.

## Expected Output
- Visible quality gap between vague and specific prompts
- CoT prompts surfacing bugs that direct prompts miss
- Meta prompting producing consistently structured output
- Self-consistency revealing confirmed vs. false-positive issues
- Generate Knowledge catching rule violations that direct prompts might miss
- Prompt chaining yielding a complete solution from validation to tests
- Anti-pattern recognition showing how generic error handling hides bugs
- Combined techniques producing superior results compared to individual techniques used in isolation

## Done When
- You have run both prompts for each pair and compared the outputs.
- You have tried at least one of the 3 combination examples and observed the difference compared to a single technique.
