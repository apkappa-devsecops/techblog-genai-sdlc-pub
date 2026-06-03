# Quick Lab 02 - Refactoring & Performance

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
- "Refactor this code to improve readability without changing behavior."
- "Optimize for high volumes and explain the complexity before and after."
- "Propose 5 regression tests to validate the refactoring."

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




