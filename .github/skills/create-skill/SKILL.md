---
name: create-skill
description: "Guide the developer through creating a workspace-scoped SKILL.md for this repository, including scope, structure, and validation."
user-invocable: true
---

# Create a Skill

This skill helps you create a new `SKILL.md` file for this workspace by following the `agent-customization` workflow.

## Use when

- You need a new workspace-specific skill for the project.
- You want a repeatable process to define skill purpose, scope, and content.
- You want to validate a `SKILL.md` before saving it.

## What it does

- Identifies whether the customization should be workspace-scoped or user-scoped.
- Selects the correct skill location and naming convention.
- Creates a `SKILL.md` file with YAML frontmatter and a clear workflow body.
- Verifies the file has a meaningful `description` and valid frontmatter.

## Workflow

1. Clarify the goal:
   - What outcome should this skill produce?
   - Is it for the current repository only, or should it be reusable across workspaces?
   - Is this a full multi-step workflow or a small, focused helper?
2. Choose the location:
   - Workspace-scoped skills: `.github/skills/<skill-name>/SKILL.md`
   - Personal/user-level skills: not supported as workspace file, but use `{{VSCODE_USER_PROMPTS_FOLDER}}` for user-level customizations.
3. Create the file:
   - Add YAML frontmatter with `name`, `description`, and `user-invocable: true`.
   - Add body sections describing purpose, steps, and completion criteria.
4. Validate:
   - Confirm the file path and name are correct.
   - Check that the frontmatter is valid YAML.
   - Ensure the `description` includes trigger keywords and a clear use case.

## Completion checklist

- [ ] Skill goal is clearly defined.
- [ ] File is under `.github/skills/<skill-name>/SKILL.md`.
- [ ] Frontmatter includes `name` and `description`.
- [ ] Body contains a step-by-step workflow.
- [ ] The skill is explicitly user-invocable.

## Example prompts to try

- "Create a workspace skill for generating component templates."
- "Build a SKILL.md that guides code review for this project."
- "Help me define a new skill for project-specific testing workflows."
