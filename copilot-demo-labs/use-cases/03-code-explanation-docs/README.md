# Quick Lab 03 - Code Explanation & Documentation

**Difficulty**: `Beginner` | **Duration**: `10 min`

## Goal
Quickly understand unfamiliar code and produce technical and functional documentation.

## Files
- `src/LegacyParser.cs`
- `src/LegacyParser.py`
- `src/LegacyParser.ts`
- `src/LegacyParser.js`

All four files contain equivalent parser logic in different languages and can be used as alternative starting points for the lab.

## Steps
1. Open the file in your preferred language.
2. Ask Copilot for an end-to-end explanation of the flow.
3. Ask for a Markdown technical documentation page.
4. Ask for a short functional summary for non-technical stakeholders.

## Prompts

### 1 — Code explanation
**Techniques used:** Role-based · Chain-of-Thought

**🚫 Vague prompt:**
> "Explain this file as if I were a new team member."

**✅ Prompt with technique:**
> "Act as a senior developer onboarding a new team member. Explain this file step by step:
> 1. What is the overall purpose of this code?
> 2. What does each function do, and how do they relate to each other?
> 3. What are the inputs and outputs of each function?
> 4. What assumptions does the code make that a new developer should know?
>
> Show your reasoning for each point before giving a final summary."

> **Observation:** The role focuses the explanation on what is useful for someone unfamiliar with the code. CoT forces Copilot to not skip intermediate details, reducing the risk that it describes what the code *should* do instead of what it *actually* does.

---

### 2 — Technical documentation
**Technique used:** Meta Prompting

**🚫 Vague prompt:**
> "Generate technical documentation covering inputs, outputs, edge cases, and known limitations."

**✅ Prompt with technique:**
> "Generate a technical documentation page for this file in Markdown. Use EXACTLY this structure:
>
> **Overview** — one paragraph describing the purpose of the module
> **Functions** — for each function: signature, parameters (name, type, description), return value, exceptions raised
> **Edge Cases** — only edge cases the code *actually handles*, with the specific line that handles them
> **Known Limitations** — behaviors the code does NOT handle, with a concrete example of input that would produce incorrect output
>
> Do not add sections not listed above."

> **Observation:** Meta Prompting produces a document with a predictable and reusable structure. The explicit distinction between "edge cases actually handled" and "known limitations" directly counters the main risk of this lab: Copilot listing generic edge cases without verifying them against the code.

---

### 3 — Functional summary
**Technique used:** Role-based (role switch)

**🚫 Vague prompt:**
> "Write a short functional summary for non-technical stakeholders."

**✅ Prompt with technique:**
> "Act as a business analyst writing a functional summary for a product manager with no technical background. Describe:
> - What business problem this code solves
> - What it receives as input, in plain language
> - What it produces as output, in plain language
> - One concrete example of how it would be used in practice
>
> Do not use technical terms. If you must use one, explain it in parentheses."

> **Observation:** Switching the role from "developer" to "business analyst" completely shifts the language register. The "no technical terms" constraint prevents the summary from sounding polished but remaining incomprehensible to non-technical stakeholders.

## Expected Output
- Complete explanation of the code
- Technical document ready for a wiki
- Reusable functional summary

## Done When
- Edge cases and assumptions are covered
- The text is clear and actionable

## Watch Out For
- AI may describe what the code *should* do instead of what it *actually* does. Verify claims against the source.
- Edge cases might be listed generically (e.g., "null input") without checking if the code actually handles them.
- Functional summaries may sound polished but contain inaccuracies — always cross-check with the code.




