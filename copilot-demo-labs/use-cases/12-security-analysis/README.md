# Lab 12 - Security Analysis

**Difficulty**: `Intermediate` | **Duration**: `15 min`

## Goal
Detect security vulnerabilities in code and propose practical fixes with severity-based prioritization.

## Context
You are given an authentication service with intentional vulnerabilities (weak cryptography, hardcoded credentials, predictable tokens). Your task is to:
1. Perform a complete, prioritized security review
2. Propose minimal patches for critical issues
3. Produce a prevention checklist specific to the analyzed code

## Files
- `src/AuthService.py` | `src/AuthService.ts` | `src/AuthService.js` | `src/AuthService.cs` — authentication logic

The files contain equivalent logic in different languages and can be used as alternative starting points for the lab.

## Steps
1. Open the `AuthService` file in your preferred language.
2. Ask Copilot for a complete security review.
3. Ask for a minimal patch for high-severity issues.
4. Ask for a prevention checklist for the team, aimed at avoiding reintroducing the same vulnerabilities in the future.

## Sample Prompts

> **Note:** Prompts 1, 2, and 3 form a logical sequence (review → patch → checklist) but are independent — they can be executed individually. Running them in the same conversation produces more coherent results.

### Prompt 1 — Security review
📎 **Context to include:** `src/AuthService.py` (or your chosen language)

> "Perform a complete security review of this code. First identify critical vulnerabilities related to weak cryptography, authentication, and credential management, then analyze other categories. For each finding indicate: (1) vulnerability type, (2) impact, (3) concrete exploit scenario. Order by severity (critical, high, medium, low)."

**Techniques used:** Role-based (implicit: security reviewer) · Meta Prompting (structured output imposed for each finding) · Directional Stimulus ("first identify critical vulnerabilities related to weak cryptography" focuses the analysis)

---

### Prompt 2 — Minimal patches
📎 **Context to include:** `src/AuthService.py` (or your chosen language)

> "Propose a minimal patch for high-severity issues, showing the code before and after the change. For each proposed patch, explain the implications (e.g., additional dependencies, async handling, breaking changes). Verify that the fix does not introduce new vulnerabilities."

**Techniques used:** Meta Prompting (before/after format) · Chain-of-Thought ("explain the implications" and "verify that the fix does not introduce new vulnerabilities") · Reflexion (self-verification integrated in the prompt)

---

### Prompt 3 — Prevention checklist
📎 **Context to include:** `src/AuthService.py` (or your chosen language)

The goal is to produce concrete rules the team can adopt to avoid reintroducing the same vulnerabilities in the future.

> "Generate a prevention checklist specific to this code. For each checklist item, cite the specific vulnerability found in `src/AuthService` that justifies it. Avoid generic advice not tied to the security review findings."

**Techniques used:** Generate Knowledge (the previous review provides context) · Directional Stimulus ("cite the specific vulnerability" anchors the checklist to real findings) · Meta Prompting (constrained checklist format)

<details>
<summary>🔬 Advanced variant — Self-Consistency</summary>

**When it's useful:** when you want to distinguish real vulnerabilities from false positives, especially on code more complex than this example.

> Run 4 different prompts in the same conversation:
>
> **Prompt A:** "Act as a penetration tester. What inputs to this authentication service would cause a bypass or incorrect behavior?"
>
> **Prompt B:** "Act as an application security auditor. What OWASP and CWE standards are violated by this code?"
>
> **Prompt C:** "Write unit tests that demonstrate the vulnerabilities in this code. Each test should fail in a way that highlights the problem."
>
> **Prompt D:** "Act as an ISO 27001 auditor. Which controls from the standard are violated by this code? For each violated control, indicate the specific non-conformity."
>
> **Synthesis:** "Compare the four analyses. List only vulnerabilities confirmed by at least two perspectives. Flag as secondary fixes those cited only once."

**Additional technique:** Self-Consistency (Lab 9) — four different angles reduce false positives.

</details>

## Expected Output
- Security findings prioritized by severity with exploit scenarios
- Proposed patches with before/after code and implication analysis
- Prevention checklist specific to and anchored in the actual analysis findings

## Done When
- Every finding has a clear risk level and remediation
- Patches are implementable without introducing new vulnerabilities
- The checklist is specific and refers to actual analysis findings
