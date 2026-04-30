---
name: translate-skill
description: Use this project-level skill when translating, refreshing, or reviewing content from mattpocock/skills into the Simplified Chinese localization repo vinvcn/mattpocock-skills-zh-CN. Use it for skill files, README content, CLAUDE.md, CONTEXT.md, docs, and other user-facing upstream content where behavior-critical identifiers must be preserved.
---

# Translate Skill

Use this skill to translate upstream `mattpocock/skills` content into Simplified Chinese for `vinvcn/mattpocock-skills-zh-CN`.

This skill is for **content localization**, not Git synchronization.

## Operating principle

Translate user-facing English prose into natural Simplified Chinese while preserving all behavior-critical content exactly.

The target repo is an independent Simplified Chinese localized edition. It should receive translated content, not upstream repository metadata.

## What to translate

Translate natural-language prose, including:

```text
README explanations
skill instructions
skill descriptions
agent-facing guidance
maintainer-facing guidance
docs prose
examples that are written as prose
```

## What to preserve exactly

Do not translate or rewrite:

```text
directory names
skill names
slash commands
CLI commands
code blocks
inline code
file paths
package names
tool identifiers
API identifiers
environment variable names
frontmatter keys
JSON/YAML/TOML keys
Markdown link URLs
behavior-critical labels
```

Preserve Markdown structure, heading levels, list nesting, tables, link targets, relative paths, and code fences.

## Repository-path localization

When translating user-facing installation examples, replace the upstream repo path:

```text
mattpocock/skills
```

with the localized repo path:

```text
vinvcn/mattpocock-skills-zh-CN
```

Only make this replacement where the command or prose is telling users how to install or use the localized repo.

Do not remove attribution to the upstream project.

## Frontmatter rules

Preserve frontmatter keys exactly.

For frontmatter values:

- Keep `name` values unchanged.
- Keep identifiers, commands, paths, package names, URLs, and tool names unchanged.
- Translate `description` only when it is natural-language prose.
- Flag ambiguous values rather than guessing.

## Translation style

Use Simplified Chinese that is:

```text
natural
developer-friendly
concise
accurate
consistent with existing repo tone
```

Keep common engineering terms in English when the English term is standard among developers or when translating it would reduce clarity.

## Workflow for a single file

When translating one file:

1. Identify the file path and file type.
2. Classify the file as translatable prose, mixed content, config/metadata, or non-translatable.
3. Protect behavior-critical spans before translation.
4. Translate only natural-language prose.
5. Restore protected spans exactly.
6. Check that commands, code blocks, paths, URLs, identifiers, and frontmatter keys are unchanged.
7. Check that localized install commands use `vinvcn/mattpocock-skills-zh-CN`.
8. Return the translated file content or a patch, plus any review flags.

## Workflow for a repo refresh

When refreshing from upstream:

1. Treat upstream as a content source, not as Git history.
2. Identify new, changed, and removed content files.
3. Translate new and changed prose-bearing files.
4. Copy or preserve non-translatable support files only when they are in scope.
5. Preserve the localized repo’s README positioning and install path.
6. Flag ambiguous files, removed files, or risky transformations for maintainer review.
7. Summarize translated files, copied files, removed files, skipped files, and review flags.

## Required output format for review

When reviewing a translation refresh, provide:

```text
Changed files:
- ...

Translated files:
- ...

Copied or preserved files:
- ...

Removed or stale files:
- ...

Review flags:
- ...

Invariant checks:
- install commands point to vinvcn/mattpocock-skills-zh-CN
- code blocks preserved
- frontmatter keys preserved
- paths and identifiers preserved
- Markdown structure preserved
```

## Fail-closed rule

When unsure whether text is behavior-critical, preserve it and flag it.

Do not silently rewrite anything that could affect installation, skill discovery, command execution, file references, API calls, tool use, or agent behavior.
