# Repository Guidance

Skills are organized by bucket folder under `skills/`:

- `engineering/` — 日常代码工作
- `productivity/` — 日常非代码工作流工具
- `misc/` — 保留但很少使用
- `personal/` — 绑定我自己的设置，不推广
- `deprecated/` — 不再使用

Every skill in `engineering/`, `productivity/`, or `misc/` must be referenced in the top-level `README.md` and listed in `.claude-plugin/plugin.json`. Skills in `personal/` and `deprecated/` must not appear in either place.

Every top-level `README.md` skill entry must link the skill name to its `SKILL.md`.

Every bucket folder has a `README.md` that lists all skills in that bucket and gives a one-line description; each skill name should link to its `SKILL.md`.

## Translation Refresh

For upstream content refreshes from `mattpocock/skills`, read `TRANSLATION_REFRESH_HARNESS.md` before changing files. This repo uses a content refresh workflow, not a Git fork-sync workflow: preserve the Simplified Chinese localized identity, keep install commands pointed at `vinvcn/mattpocock-skills-zh-CN`, and do not import upstream repository-management state.
