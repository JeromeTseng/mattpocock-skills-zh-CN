# Translation Refresh Harness

## Problem

`vinvcn/mattpocock-skills-zh-CN` is a Simplified Chinese localized edition of `mattpocock/skills`.

The maintainer needs an easy way to keep the Chinese repo current when upstream adds, removes, or edits skill content. The desired result is not a Git mirror. The desired result is current, usable, translated content for Chinese users.

The workflow should reduce maintainer effort while protecting the parts of the repo that make the skills installable and executable.

## Core decision

Build a **content refresh workflow**, not a fork sync workflow.

Treat `mattpocock/skills` as the canonical upstream source of English content. Treat `vinvcn/mattpocock-skills-zh-CN` as an independent Simplified Chinese localized edition.

The workflow should fetch upstream content as source material, translate or copy the appropriate files, preserve behavior-critical identifiers, and update the Chinese repo’s content.

The workflow must not attempt to mirror upstream Git history, issues, pull requests, labels, branches, releases, Actions history, or repository settings.

## Goals

The workflow should:

1. Fetch the latest upstream content from `mattpocock/skills`.
2. Identify content that is new, changed, or removed upstream.
3. Translate user-facing English prose into natural Simplified Chinese.
4. Preserve behavior-critical identifiers exactly.
5. Preserve this repo’s localized identity and install path.
6. Keep the update result simple for the maintainer to review.
7. Support repeatable updates without requiring the maintainer to reason about upstream Git operations.
8. Provide enough validation to catch translation mistakes that could break installation or agent behavior.

## Non-goals

The workflow should not:

1. Merge upstream Git history.
2. Rebase this repo on upstream.
3. Use GitHub fork-sync behavior as the primary update mechanism.
4. Sync upstream issues, pull requests, labels, milestones, releases, branches, Actions runs, or repository settings.
5. Replace localized repo messaging with a plain copy of upstream English messaging.
6. Translate or rewrite behavior-critical text.
7. Optimize for perfect automation at the cost of translation quality.
8. Hide risky changes from the maintainer.

## Content scope

The workflow should focus on files that affect the user experience of the skills repo.

### In scope: translate when changed

These files and folders are content-bearing and normally contain user-facing or agent-facing prose:

```text
README.md
CLAUDE.md
CONTEXT.md
skills/**
docs/**
.out-of-scope/**
```

The workflow should translate natural-language prose in these areas while preserving all behavior-critical spans.

### In scope: copy or preserve carefully

These files and folders may contain configuration, metadata, or installer-related behavior:

```text
.claude-plugin/**
package metadata, if present
configuration files, if explicitly selected
```

The workflow should not blindly translate these files. It should copy, preserve, or selectively localize only when the change is clearly user-facing and safe.

### Out of scope unless explicitly requested

The workflow should not automatically import these from upstream:

```text
.git/**
.github/**
scripts/**
node_modules/**
temporary build output
upstream repository settings
upstream issue/PR metadata
```

Repository automation for the Chinese repo should remain owned by the Chinese repo.

## Translation rules

Translate:

```text
natural-language documentation
skill instructions
skill descriptions
README prose
agent-facing explanatory text
maintainer-facing explanatory text
examples written as prose
```

Do not translate:

```text
directory names
skill names
slash commands
CLI commands
code blocks
inline code
file paths
package names
repository names, except intentional localized install-path replacement
tool identifiers
API names
environment variable names
frontmatter keys
JSON/YAML/TOML keys
Markdown link URLs
behavior-critical labels
```

### Frontmatter policy

Preserve frontmatter keys exactly.

For frontmatter values:

- Preserve `name` values exactly.
- Preserve values that are identifiers, commands, paths, URLs, package names, or tool names.
- Translate `description` values only when they are natural-language prose and are not used as strict identifiers.
- Flag ambiguous values for maintainer review rather than guessing.

### Markdown policy

Preserve:

```text
heading hierarchy
list structure
tables
blockquote structure
fenced code blocks
inline code spans
links and link targets
relative paths
image paths
admonition syntax, if present
```

Markdown link display text may be translated when it is natural-language prose. Markdown link targets must not be changed unless the only intended change is replacing an upstream install path with the localized repo path.

### Command and install-path policy

Preserve commands exactly, except for intentional localization of installation examples.

When a user-facing install command points to the upstream repo, localize only the repo path:

```text
mattpocock/skills
```

to:

```text
vinvcn/mattpocock-skills-zh-CN
```

Do not otherwise rewrite commands.

### Style policy

The Simplified Chinese translation should be:

```text
natural
developer-friendly
concise
accurate
consistent with existing repo tone
```

Common engineering terms may remain in English when the English term is the standard developer term or when translating it would reduce clarity.

## Localized repo invariants

The workflow must preserve these project-level invariants:

1. The repo remains clearly branded as the Simplified Chinese localization of `mattpocock/skills`.
2. User-facing install commands point to `vinvcn/mattpocock-skills-zh-CN`.
3. Original project attribution remains intact.
4. Original license attribution remains intact.
5. Directory names remain compatible with the upstream skill installer.
6. Skill names remain compatible with the upstream skill installer.
7. Commands, code, file paths, package names, tool identifiers, and API identifiers remain operationally intact.
8. The Chinese README keeps localization context instead of becoming only a direct translation of upstream README.
9. The workflow does not import upstream repository-management state.
10. Updates are reviewable by the maintainer before they are treated as final.

## Success criteria

The workflow is successful when:

1. A new upstream skill appears in the Chinese repo at the corresponding path, with Chinese prose and unchanged behavior-critical identifiers.
2. An edited upstream skill updates the Chinese version without corrupting commands, paths, code blocks, or skill names.
3. Removed upstream content is either removed from the Chinese repo or clearly flagged according to the chosen removal policy.
4. User-facing install commands remain localized to `vinvcn/mattpocock-skills-zh-CN`.
5. Code blocks remain unchanged except for intentional localized install-path replacement when explicitly allowed.
6. Markdown structure remains valid.
7. Frontmatter keys remain unchanged.
8. Behavior-critical frontmatter values remain unchanged.
9. Ambiguous content is flagged for maintainer review instead of silently rewritten.
10. The maintainer receives a simple summary of changed files, removed files, translated files, copied files, and review flags.
11. The workflow does not import upstream issues, pull requests, labels, branches, commit history, or repository metadata.
12. The project-level skill exists at `.skill/translate-skill/SKILL.md` and gives maintainers a reusable way to request safe translation work.

## Main risk and remedy

### Main risk

The main risk is **translation corrupting behavior-critical content**.

For this repository, a bad translation can break more than readability. It can break installation, skill discovery, command execution, file references, tool references, or agent behavior.

A secondary risk is that the workflow accidentally turns into a Git sync system and starts optimizing for upstream repository state instead of localized content quality.

### Remedy

The workflow should fail closed and protect behavior-critical content before translation.

The remedy should include:

1. Treat upstream files as source content, not Git history.
2. Protect code blocks, inline code, commands, paths, URLs, package names, repo names, tool identifiers, frontmatter keys, JSON/YAML/TOML keys, and environment variables before translation.
3. Translate only natural-language prose.
4. Restore protected spans exactly after translation.
5. Validate that protected spans were not changed.
6. Validate that localized install commands point to `vinvcn/mattpocock-skills-zh-CN`.
7. Validate that upstream install paths do not leak into user-facing localized install examples unless intentionally referenced as attribution.
8. Validate that Markdown and frontmatter remain parseable where practical.
9. Produce a review summary with flags for ambiguous cases.
10. Keep the maintainer in control of final acceptance.
