# Codex Project Rules

These rules explain how Codex should work on the Codex Full-Stack Dashboard project.

## 1. Keep Everything Beginner-Friendly

- Use simple English when explaining ideas and changes.
- Explain new technical terms when they are first used.
- Do not assume that Asma already knows advanced concepts.

## 2. Make One Clear Change at a Time

- Break large tasks into small, understandable steps.
- Finish and test one clear change before moving to the next one.
- Avoid mixing unrelated changes together.

## 3. Explain File Changes First

- Before changing files, state which files will be created or updated.
- Briefly explain why each file needs to change.
- Do not change unrelated files.

## 4. Avoid Unnecessary Libraries

- Use features already provided by Next.js, FastAPI, Python, or JavaScript when practical.
- Add a new library only when it has a clear purpose.
- Explain why a new library is needed before adding it.

## 5. Use Simple Code

- Prefer clear and readable code over clever or advanced code.
- Use meaningful names for files, variables, and functions.
- Keep functions and components small when possible.

## 6. Add Helpful Comments

- Add comments when they help a beginner understand why the code works.
- Keep comments short and clear.
- Do not add comments that only repeat what the code already says.

## 7. Give Testing Instructions After Every Change

- After every change, explain exactly how Asma can test it.
- Include the terminal commands that need to be run.
- Explain what result should appear when the change works correctly.
- Mention any important error or failure result that should also be tested.

## 8. Explain Errors Before Fixing Them

- When an error happens, explain its cause in simple English first.
- Identify the file or part of the project connected to the error.
- Then explain and apply the smallest reasonable fix.
- Provide steps to test that the error is fixed.

## 9. Keep Frontend and Backend Separate

- Keep Next.js frontend code inside the `frontend` folder.
- Keep FastAPI backend code inside the `backend` folder.
- Do not mix frontend and backend dependencies or configuration files.
- Connect the two applications through clear API requests.

## 10. Keep Documentation Updated

- Update documentation when the project structure changes.
- Update documentation when important application behavior changes.
- Keep instructions and examples consistent with the current code.
- Store project documentation inside the `docs` folder.

## General Rule

Choose the simplest solution that teaches the required full-stack concept clearly. Each change should be easy for Asma to understand, run, test, and discuss before the project moves forward.
