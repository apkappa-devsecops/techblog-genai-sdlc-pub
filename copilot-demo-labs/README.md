# Copilot Use Cases Demo Labs

Hands-on labs for testing GitHub Copilot on real-world use cases.

## Who Is This For
- Back/Front maintenance developers
- Back/Front feature developers
- IaC / DevOps engineers
- Functional analysts

## Goal
Let teams try Copilot on realistic examples with a guided, repeatable workflow.

## What's Inside
- A `use-cases/` folder with one lab per subfolder.
- Each lab has source files + a `README.md` with step-by-step instructions.
- Some labs include equivalent executable logic in C#, Python, TypeScript, and JavaScript.
- Other labs are driven by a canonical artifact such as a user story, a policy file, a log file, Terraform, or an MCP config.
- Each lab README explicitly lists the files that are equivalent starting points and calls out when `src/` files are only placeholders.

## Prerequisites

| Category | Component | Required | Minimum version | Notes |
| --- | --- | --- | --- | --- |
| Editor (option 1) | VS Code | Required (if you use VS Code) | Latest stable version | Copilot Chat evolves in lockstep with VS Code; staying updated is recommended for Ask/Edit/Agent modes. |
| VS Code extension | GitHub Copilot Chat | Required | Latest stable version compatible with your IDE | Primary required extension for Copilot features in these labs (chat, edit, agent, suggestions). |
| VS Code extension | GitHub Copilot | Not required (deprecated) | N/A | Marked as deprecated in VS Code; use GitHub Copilot Chat instead. |
| Editor (option 2) | Visual Studio 2022 | Optional (alternative to VS Code) | 17.10+ | Practical baseline for full Copilot experience documented for VS 2022. |
| Visual Studio extension | GitHub Copilot (Visual Studio) | Required if you use Visual Studio | Latest stable version compatible with Visual Studio 2022 | Required for Copilot capabilities in Visual Studio. |
| Runtime | Node.js | Recommended | 18+ | For running TypeScript/JavaScript files. |
| Runtime | Python | Recommended | 3.10+ | For Python variants available in selected labs. |
| SDK | .NET SDK | Recommended | 8+ | For compiling C# files. |
| CLI | Terraform | Recommended | Latest stable version | For IaC labs. |

### Setup
1. Clone this repo and open the `copilot-demo-labs` folder in your IDE.
2. Verify Copilot is active: open Any file, start typing, and check for inline suggestions.
3. Verify Copilot Chat is active: in VS Code, open the Chat panel (Ctrl+Shift+I / Cmd+Shift+I). In Visual Studio, open View > GitHub Copilot Chat.
4. Pick a use case and follow the lab README.

> **Note**: You do not need to compile or run the source files. The labs are designed for Copilot interaction — reading, explaining, and transforming code. Install language SDKs only if you want to verify Copilot's output.

## Tested Copilot Features
- Code completion (inline suggestions)
- Copilot Chat (Ask / Edit / Agent mode)
- Guided refactoring
- Test generation
- Documentation generation
- Security review and policy checks
- Italian prompt quality

## Lab Map

| # | Lab | Difficulty | Duration |
|---|-----|-----------|----------|
| 01 | [Prompt Engineering Core](use-cases/01-prompt-engineering-core/) | Beginner | 50 min |
| 02 | [Prompt Engineering Advanced](use-cases/02-prompt-engineering-advanced/) | Intermediate | 50 min |
| 03 | [Code Explanation & Docs](use-cases/03-code-explanation-docs/) | Beginner | 10 min |
| 04 | [Simple Debugging](use-cases/04-debugging-simple/) | Beginner | 10 min |
| 05 | [Complex Debugging](use-cases/05-debugging-complex/) | Intermediate | 15 min |
| 06 | [Refactoring & Performance](use-cases/06-refactoring-performance/) | Intermediate | 15 min |
| 07 | [Test Suite Generation](use-cases/07-testing-suite-generation/) | Intermediate | 40 min |
| 08 | [From Requirements to Code](use-cases/08-functional-to-code-generation/) | Intermediate | 20 min |
| 09 | [Technical Debt Analysis and Refactoring](use-cases/09-technical-debt-refactoring/) | Intermediate | 20 min |
| 10 | [Security Analysis](use-cases/10-security-analysis/) | Intermediate | 15 min |
| 11 | [Policy & Compliance](use-cases/11-policy-compliance/) | Intermediate | 15 min |
| 12 | [Log Analysis & Correlation](use-cases/12-log-analysis-correlation/) | Intermediate | 15 min |