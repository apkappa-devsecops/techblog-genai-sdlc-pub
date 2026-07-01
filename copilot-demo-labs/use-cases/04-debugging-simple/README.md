# Quick Lab 04 - Simple Debugging

**Difficulty**: `Beginner` | **Duration**: `10 min`

## Goal
Find and fix obvious errors (syntax or immediate runtime issues).

## Files
- `src/config_loader.py`
- `src/config_loader.ts`
- `src/config_loader.js`
- `src/config_loader.cs`

All four files contain equivalent config-loading logic in different languages and can be used as alternative starting points for the lab.

## Steps
1. Open the file in your preferred language.
2. Ask Copilot to find obvious bugs and suggest a minimal fix.
3. Ask for 3 quick checks to validate the fix.

## Prompts

### 1 — Find and fix the bugs
**Technique used:** Chain-of-Thought

**🚫 Vague prompt:**
> "Find the bugs in this file and fix them, explaining the applied fix."

**✅ Prompt with technique:**
> "Analyze this file step by step to find the bugs:
> 1. Read each line and identify any syntax or runtime errors
> 2. For each bug found: indicate the exact line, explain why it causes an error and what the runtime effect is
> 3. Propose a minimal patch that fixes only the bug without restructuring the code
>
> Do not modify anything that is not directly related to the bug."

> **Observation:** CoT forces Copilot to reason line by line instead of rewriting the code. The "minimal patch" and "do not modify anything unrelated to the bug" constraints counter the main risk: Copilot restructuring the code instead of fixing the typo.

---

### 2 — Validate the fix
**Technique used:** Meta Prompting

**🚫 Vague prompt:**
> "Give me a minimal patch and 3 quick validation checks."

**✅ Prompt with technique:**
> "Generate 3 validation checks to verify the fix is correct. For each check use EXACTLY this structure:
>
> **Input:** the value or condition to test
> **Action:** what to execute
> **Expected result:** the exact value expected
> **Result without the fix:** what would have happened before the correction
>
> Checks must be specific and verifiable, not generic like 'verify that it works'."

> **Observation:** Meta Prompting turns vague checks into verifiable assertions. The "result without the fix" column forces Copilot to prove that the check would have actually failed before the correction, avoiding useless checklists.

## Expected Output
- Targeted fix
- Quick verification checklist

## Done When
- The file runs without blocking errors

## Watch Out For
- AI may fix the wrong thing — e.g., restructure the code instead of fixing the actual typo.
- Validation checks may be too vague ("test that it works") instead of specific assertions.




