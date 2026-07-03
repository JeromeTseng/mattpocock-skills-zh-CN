Skills 按 bucket folder 组织在 `skills/` 下：

- `engineering/` — 日常代码工作
- `productivity/` — 日常非代码工作流工具
- `misc/` — 保留但很少使用
- `in-progress/` — 仍在开发，暂不推广
- `personal/` — 绑定我自己的设置，不推广
- `deprecated/` — 不再使用

`engineering/`、`productivity/` 或 `misc/` 中的每个 skill，都必须在顶层 `README.md` 中有引用，并在 `.claude-plugin/plugin.json` 中有条目。`personal/`、`in-progress/` 和 `deprecated/` 中的 skills 不能出现在这两个位置。

顶层 `README.md` 中的每个 skill 条目都必须把 skill 名链接到对应的 `SKILL.md`。

每个 bucket folder 都有一个 `README.md`，列出该 bucket 中的所有 skills，并给出一行描述；skill 名需要链接到对应的 `SKILL.md`。
