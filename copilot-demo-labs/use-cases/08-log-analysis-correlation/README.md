# Quick Lab 08 - Log Analysis & Correlation

**Difficulty**: `Intermediate` | **Duration**: `15 min`

## Goal
Reconstruct an incident timeline, correlate errors across services, and propose alerting rules to catch critical patterns before they cascade into failures.

## File
- `logs/app.log` — logs from a distributed system with checkout, payment, order, and notification traces

## Steps
1. Open and analyze the `logs/app.log` file to identify error patterns.
2. Ask Copilot to build an event timeline correlating events by `request_id`.
3. Ask it to correlate timeouts and errors across services and propose a probable root cause.
4. Ask for alerting rules in pseudocode to catch the pattern before it becomes critical.
5. Ask for implementation suggestions for the alerting rules.

## Sample Prompts
- "Summarize this log as an incident timeline."
- "Correlate timeouts and errors and propose a probable root cause."
- "Suggest alerting rules to catch this pattern earlier in pseudocode format, based on fields already present in the logs. Provide implementation suggestions."
> **Watch Out For:** AI may invent correlations not supported by the data (e.g., linking unrelated request IDs). Verify that timestamps and request IDs actually connect and that the root cause is backed by evidence in the log.
- "Propose metrics and dashboards to monitor this pattern in production."

## Expected Output
- Timeline of events correlated by request_id
- Root cause analysis with evidence from the log
- Alerting rules in pseudocode based on present fields
- Implementation suggestions (monitoring stack, circuit breaker, timeout tuning)

## Done When
- The timeline shows the sequence of events for each request_id
- Correlations are backed by timestamps and request IDs in the log
- Alerting rules catch the specific pattern (not generic like "alert on any error")
- Implementation suggestions are concrete and actionable
