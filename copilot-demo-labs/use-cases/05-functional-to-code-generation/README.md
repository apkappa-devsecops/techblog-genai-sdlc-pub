# Lab 05 - From Requirements to Code

**Difficulty**: `Intermediate` | **Duration**: `20 min`

## Goal
Design APIs from a user story, then implement and test them using acceptance criteria.

## File
- `specs/user_story.md`

> **Note:** In this lab, you will generate the code in your preferred language. The prompts below use Python as an example, but feel free to adapt them to any language of your choice.

## Steps
1. Open and read the user story in `specs/user_story.md` to understand the requirements.
2. Ask Copilot to generate the service skeleton (classes, methods, types) from the user story, with placeholder methods and TODO comments.
3. Ask Copilot to analyze the user story and verify whether the API design in the draft code covers all requirements.
4. Ask Copilot to implement the TODO methods in the source file.
5. Ask Copilot to generate acceptance tests traceable to the user story criteria.

## Sample Prompts
- "Read the user story in `specs/user_story.md` and generate the skeleton of a Python service in `src/todo_service.py`: define classes, types/enums, and public methods with full signatures. Do not implement the logic: each method should only contain a TODO comment describing what to do and an exception due to unimplemented method."
> **Watch out:** AI may add features not mentioned in the user story (scope creep). To avoid this, try adding an instruction like: *"List every public method you generated and quote the exact acceptance criterion from `specs/user_story.md` that justifies it. Flag any method that has no matching criterion."*
- "Analyze this user story and check if the API design in my code covers all requirements."
- "Implement the TODO methods in the selected file."
> **Watch out:** Acceptance criteria may not be fully covered in the implementation. To avoid this, try adding an instruction like: *"For each acceptance criterion in `specs/user_story.md`, show the specific line(s) of code that satisfy it. Flag any criterion that is not yet implemented."*
- "Generate acceptance tests traceable to the user story criteria."
> **Watch out:** Generated tests may test the implementation rather than the requirements, and thus pass even if the code is wrong. To avoid this, try adding an instruction like: *"Review the generated tests and identify any test that would still pass if the corresponding acceptance criterion were deliberately broken. Suggest a fix for each."*

## Expected Output
- Service skeleton with classes, types, and placeholder methods
- API design validation
- Method implementation
- Acceptance tests

## Done When
- There is a clear path from requirement to code
