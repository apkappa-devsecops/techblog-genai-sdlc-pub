# Lab 11 - Policy and Compliance

**Difficulty**: `Intermediate` | **Duration**: `15 min`

## Goal
Check code compliance against a local security policy.

## Files
- `policy/security-policy.md`
- `src/api.js`
- `src/api.py`
- `src/api.ts`
- `src/api.cs`

The `api` files contain equivalent intentionally non-compliant logic and can be used as alternative starting points for the lab.

## Steps
1. Open the policy file and the API file.
2. Ask Copilot to find violations citing specific policy rules.
3. Ask for a compliant patch and a PR checklist.

## Sample Prompts

**Techniques used:** Directional Stimulus · Meta Prompting (additional instruction)
- "Check this file against the security policy and list violations."
> **Warning:** The AI may flag issues not directly related to the policy, or miss clearly indicated violations. To avoid this, try adding an instruction like: *For each violation detected, cite the exact section of the policy in `policy/security-policy.md` that is violated. Flag any issue that does not have a direct reference in the policy.*

**Techniques used:** Directional Stimulus (additional instruction) · Prompt Chaining
- "Propose a compliant patch and explain each change."
> **Warning:** Remediation patches may resolve the identified occurrence but not the underlying pattern (e.g., parameterizing one query but not another). To avoid this, try adding an instruction like: *Analyze the entire file and identify all points where the same violation pattern repeats. Ensure the patch resolves all occurrences.*

**Techniques used:** Meta Prompting · Generate Knowledge
- "Generate a GitHub PR template as a compliance checklist."
> **Warning:** Checklists may mix real policy rules with generic advice added by the AI. To avoid this, try adding an instruction like: *For each checklist item, indicate whether it derives from an explicit rule in `policy/security-policy.md` (citing the section) or if it is an additional AI suggestion. Separate the two categories.*

## Expected Output
- Violation-to-rule mapping
- Remediation patch

## Done When
- Remediation is clear and verifiable




