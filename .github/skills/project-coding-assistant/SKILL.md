---
name: Project Coding Assistant
description: Guide workspace-specific frontend and route development for the barbearia-kairos project, including React components, TanStack Router routes, and styling conventions.
user-invocable: true
---

# Project Coding Assistant

This skill helps contributors work effectively in the `barbearia-kairos` repository by providing a structured workflow for project-specific coding tasks.

## Use when

- You need to add or modify React UI components under `src/components`.
- You need to adjust routes or page structure in `src/routes`, `router.tsx`, or `routeTree.gen.ts`.
- You need to follow the repository conventions for styling, component patterns, or error handling.

## What it does

- Identifies the exact feature or bug to implement.
- Uses repository-specific structure and conventions for frontend code.
- Recommends the correct file locations and component patterns.
- Confirms changes are aligned with the project’s existing style and routing approach.

## Workflow

1. Clarify the goal:
   - Ask what feature or bug is being addressed.
   - Ask whether the change should be a new component, route update, style adjustment, or utility fix.
2. Review the repository structure:
   - Check `src/components`, `src/routes`, `src/router.tsx`, and `src/lib` for relevant patterns.
   - Respect the existing use of TanStack Router and component-based UI.
3. Create or modify code:
   - Keep changes in workspace-specific files only.
   - Prefer existing UI patterns and naming conventions.
   - Keep routes and components separated according to the repository structure.
4. Validate the result:
   - Ensure code follows the repository’s file layout.
   - Confirm no unnecessary files are added.
   - If applicable, recommend running `npm run lint` or `npm run format`.

## Completion criteria

- The requested change is clearly implemented in the repository.
- File path, naming, and structure follow existing workspace conventions.
- The skill output explains the exact files changed and why.
- The result is ready for review or integration into the current project.
