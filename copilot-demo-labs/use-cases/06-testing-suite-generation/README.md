# Lab 06 - Test Suite Generation

**Difficulty**: `Intermediate` | **Duration**: `40 min`

## Goal
Generate a test suite that includes unit, integration, load, security, and UI tests.

## Web Application
A minimal payment service built with Node.js and Express. The user enters an email, amount, card number, and an optional coupon through an HTML form. The server validates the card, applies any discount, persists the order and payment to an SQLite database, and returns the result. Two endpoints are exposed: `POST /pay` to process a payment and `GET /orders/:id` to retrieve the associated order.

## Run the App (Optional)
1. Install [Node.js](https://nodejs.org) (v14+).
2. From this folder, run:
   ```bash
   npm install
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

## Files
- `src/payment.js` — payment logic (validation, discount, processing).
- `src/db.js` — DB access layer (insert/read customers, orders, payments).
- `src/server.js` — Express server exposing `POST /pay` and `GET /orders/:id`.
- `src/public/index.html` — minimal payment form (UI).
- `src/schema.sql` — DB schema (customers, orders, payments).

## Steps
1. Add the `src` folder as conversation context with Copilot and ask it to generate comprehensive unit tests, including edge cases and explaining how the test handles anomalous situations or invalid inputs.
2. Also provide `src/schema.sql` as context and ask for integration scenarios covering the end-to-end payment flow (validation → persistence → states).
3. Ask for a test plan for load, security, and UI tests: which scenarios to test and how to measure whether the test passes or fails, optionally suggesting the tool/framework to use.

## Sample Prompts
- "Generate unit tests for the project source files using the Jest framework, without running them. Include edge cases (zero amount, negative values, invalid coupon, card with wrong length) and explain the handling of anomalous situations and invalid inputs. Before the code, produce a summary table (scenario → expected result)."
> **Watch out:** AI-generated tests may import non-existent modules or use wrong framework syntax. To avoid this, try adding to the prompt an instruction like *List every import and external dependency used in the generated tests. For each one, confirm whether it exists in the project or is a real installable package.*
- "Based on the source code analysis, propose integration tests for the project's REST APIs using Jest and Supertest, without running them. The tests should verify the main end-to-end flows, including DB persistence and error handling. For each test indicate: scenario, preconditions, steps, expected outcome."
> **Watch out:** AI-generated unit and integration tests may assert what the code *does* rather than what it *should* do — they'll pass but won't catch bugs. For example, if the code applies a discount when it shouldn't, the generated test will confirm that wrong behavior instead of flagging it. To avoid this, try adding to the prompt an instruction like *For each test, explain what business rule it validates. Flag any test that only asserts the current return value without verifying correspondence with a business rule.*
- "Based on the source code analysis, create a structured outline for load, security, and UI tests. For each category list: recommended tool/framework, at least 3 specific scenarios with measurable pass/fail criteria. The artifact should be a document ready to share with developers." / "Based on the source code analysis, create a structured outline for load, security, and UI tests. For each category list at least 3 specific scenarios with measurable pass/fail criteria. The reference tools are: JMeter for load tests, OWASP ZAP for security tests, Selenium for UI tests. The artifact should be a document ready to share with developers."
> **Watch out:** AI-generated scenarios for integration and load tests may be too abstract to be actionable. To avoid this, try adding to the prompt an instruction like *For each test scenario, add a concrete example with prerequisites, tool configuration, input data, specific endpoint or function call, and a measurable pass/fail threshold.*

## Expected Output
- Executable unit test files for the chosen language
- Structured list of integration scenarios tied to the DB schema
- List of steps for load, security, and UI tests with suggested/specified tools and measurable criteria

## Done When
- Unit tests cover edge cases (e.g. null or negative values, missing/invalid coupon, card too short/long)
- Integration tests reference tables and constraints from the provided DB schema
- Each test category has at least 3 scenarios with pass/fail criteria
