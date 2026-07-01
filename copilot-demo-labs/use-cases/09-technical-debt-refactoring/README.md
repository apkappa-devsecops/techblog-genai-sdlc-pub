# Lab 09 - Technical Debt Analysis and Refactoring

**Difficulty**: `Intermediate` | **Duration**: `20 min`

## Goal
Analyze the technical debt of an existing system, propose refactoring to resolve it, and evaluate risks and impact of the changes.

## Context
You've inherited a distributed billing system with documented technical debt. The previous team identified architectural issues but didn't have time to resolve them. Your task is to:
1. Analyze each technical debt item and understand its impact on the system
2. Propose concrete refactoring to solve the problems
3. Evaluate risks, breaking changes, and intervention priorities

## Files
- `docs/technical_documentation.md` — architectural overview with Technical Debt section
- `src/billing-engine.py` | `src/billing-engine.ts` | `src/billing-engine.js` | `src/billing-engine.cs` — invoice calculation logic

The `billing-engine` files contain equivalent logic in different languages and can be used as alternative starting points for the lab.

## Steps
1. Read the `docs/technical_documentation.md` file, particularly the Technical Debt section.
2. Open the `billing-engine` file in your preferred language.
3. For each technical debt item, ask Copilot to analyze the system impact (what failure scenarios can it cause? what data can become inconsistent?).
4. Ask it to propose a concrete refactoring to solve the most critical problem.
5. Ask it to evaluate risks, breaking changes, and estimated effort for each proposed fix.
6. Ask for a prioritized intervention roadmap.

## Sample Prompts

> **Note:** Prompts 1, 2, and 3 are independent — they can be executed in any order. Prompt 4 is also independent, but produces more accurate results if executed in the same conversation after the others, because it leverages the context of analyses and solutions already discussed.

### Prompt 1 — Impact analysis
📎 **Context to include:** `docs/technical_documentation.md`

> "Analyze the Technical Debt section in `docs/technical_documentation.md`. For each item, explain: (1) what failure scenario it can cause, (2) what impact it has on end users, (3) what data can become inconsistent. For each failure scenario, show a concrete example with input data and final inconsistent state. Use the components and flows described in `docs/technical_documentation.md`. Order by severity."

**Techniques used:** Meta Prompting (numbered structure imposed on output) · Chain-of-Thought (explicit reasoning scenario → impact → inconsistency) · Generate Knowledge (the technical document provides domain context before the analysis)

---

### Prompt 2 — Refactoring with error handling
📎 **Context to include:** `docs/technical_documentation.md` + `src/billing-engine.py` (or your chosen language)

> "Consider this technical debt: 'Credit balance deduction and invoice write are not in the same DB transaction'. Propose a refactoring of the code in `src/billing-engine.py` to solve this problem. Show the code before and after the change. In the proposed solution, explicitly handle: (1) rollback on error, (2) retry logic, (3) logging for troubleshooting. Explain the reason for each choice."

**Techniques used:** Directional Stimulus (exact quote of the debt item to focus the analysis) · Meta Prompting (before/after structure + 3 numbered constraints) · Chain-of-Thought ("explain the reason for each choice")

<details>
<summary>🔬 Advanced variant — Tree of Thoughts</summary>

**When it's useful:** when the problem has multiple valid architectural solutions (single transaction, saga pattern, eventual consistency) and you want to compare them before choosing.

> "Consider this technical debt: 'Credit balance deduction and invoice write are not in the same DB transaction'. Propose 3 different approaches to solve the problem:
>
> **A) Single transaction** — wrap credit deduction and invoice write in the same DB transaction.
> **B) Saga pattern** — use compensating events to handle rollback.
> **C) Eventual consistency** — write the invoice and reconcile the credit asynchronously.
>
> For each approach: (1) show the implementation in code, (2) list pros and cons, (3) evaluate risk of data inconsistency and operational complexity. Then recommend the best approach for this system and justify the choice."

**Additional technique:** Tree of Thoughts (Lab 02) — explores alternatives before converging on a solution.

</details>

---

### Prompt 3 — Circuit breaker
📎 **Context to include:** `docs/technical_documentation.md` + `src/billing-engine.py` (or your chosen language)

> "Consider this technical debt: 'No circuit breaker on the SMTP integration'. Propose an implementation solution with language-specific libraries/patterns. Include: configuration, fallback handling, metrics to monitor. The solution must be implementable with the standard libraries of the chosen language and must integrate with the architecture described in `docs/technical_documentation.md`."

**Techniques used:** Directional Stimulus (exact quote of the debt item) · Generate Knowledge (integration constraint with the documented architecture) · Meta Prompting (structured output: configuration, fallback, metrics)

---

### Prompt 4 — Prioritized roadmap
📎 **Context to include:** `docs/technical_documentation.md` + `src/billing-engine.py` (or your chosen language)

> "For each technical debt item, evaluate and write in an analysis document: (1) estimated effort (hours/days), (2) risk of breaking changes, (3) performance impact, (4) dependencies to resolve first. For each estimate, list the concrete activities needed: code modification, unit tests, integration tests, data migration, deployment, rollback plan. Justify the estimate. Create a prioritized intervention roadmap."

**Techniques used:** Meta Prompting (4-dimension structure + concrete activities format) · Chain-of-Thought ("justify the estimate" forces explicit reasoning) · Prompt Chaining (this prompt closes the chain: analysis → refactoring → evaluation → roadmap)

<details>
<summary>🔬 Advanced variant — Reflexion</summary>

**When it's useful:** when you want to validate the produced roadmap, especially the effort estimates that AI tends to underestimate.

> After obtaining the roadmap, add in the same conversation:
>
> "Now critically review the roadmap you just produced:
> 1. Are the effort estimates realistic for a team of 2-3 developers?
> 2. Are there hidden dependencies between interventions that you haven't considered?
> 3. Which intervention could take longer than expected and why?
> 4. Does the proposed sequence minimize the risk of regressions?
>
> If you find problems, correct the roadmap."

**Additional technique:** Reflexion (Lab 02) — the AI critiques its own output and improves it autonomously.

</details>

## Expected Output
- Impact analysis for each technical debt item with concrete failure scenarios
- Proposed refactoring for the most critical problems
- Risk, effort, and breaking change evaluation for each fix
- Prioritized intervention roadmap

## Done When
- Each technical debt item has an impact analysis, remediation implementation proposal with related estimate
- The roadmap is realistic and accounts for dependencies between interventions
