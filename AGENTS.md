# Repository Guidance

Skills are organized by bucket folder under `skills/`:

- `engineering/` - 日常代码工作
- `productivity/` - 日常非代码工作流工具
- `misc/` - 保留但很少使用
- `in-progress/` - 仍在开发，暂不推广
- `personal/` - 绑定我自己的设置，不推广
- `deprecated/` - 不再使用

Every skill in `engineering/`, `productivity/`, or `misc/` must be referenced in the top-level `README.md` and listed in `.claude-plugin/plugin.json`. Skills in `personal/` and `deprecated/` must not appear in either place.
Skills in `in-progress/` must stay out of the top-level `README.md` and `.claude-plugin/plugin.json` until they graduate to a stable bucket.

Every top-level `README.md` skill entry must link the skill name to its `SKILL.md`.

Every bucket folder has a `README.md` that lists all skills in that bucket and gives a one-line description; each skill name should link to its `SKILL.md`. Bucket `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true`, reachable only by the human) or model-invoked (model- or user-reachable). For definitions, description conventions, and why a user-invoked skill can invoke model-invoked skills but never another user-invoked one, see [docs/invocation.md](./docs/invocation.md).

## Translation Refresh

For upstream content refreshes from `mattpocock/skills`, use `.skills/translate-skill/SKILL.md` before changing files. This repo uses skill-guided content localization, not Git fork-sync: preserve the Simplified Chinese localized identity, keep install commands pointed at `vinvcn/mattpocock-skills-zh-CN`, and do not import upstream repository-management state.
