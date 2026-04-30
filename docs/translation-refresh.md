# 翻译内容刷新工作流

本仓库是 `mattpocock/skills` 的简体中文本地化版本。刷新内容时，把上游仓库当作英文内容来源，而不是 Git 历史来源。

## 运行方式

预览上游差异：

```sh
node scripts/refresh-content.mjs --upstream-dir ../skills
```

从 GitHub 获取上游内容并生成预览摘要：

```sh
node scripts/refresh-content.mjs
```

应用刷新时，需要提供翻译命令：

```sh
node scripts/refresh-content.mjs \
  --upstream-dir ../skills \
  --translator-command ./scripts/translate-with-provider.mjs \
  --apply
```

翻译命令从 stdin 读取 JSON，并向 stdout 写出 JSON：

```json
{
  "text": "翻译后的文本"
}
```

输入 JSON 包含 `file`、`sourceLanguage`、`targetLanguage`、`preservePlaceholders` 和 `text` 字段。`text` 中的 `__SKILLS_ZH_CN_*__` 占位符必须原样保留。

## 输出

脚本会写入 `TRANSLATION_REFRESH_SUMMARY.md`，列出：

- 新增文件
- 变更文件
- 已移除或疑似过期文件
- 已翻译文件
- 已复制文件
- 已跳过文件
- 需要维护者复核的风险点

应用刷新后，脚本会更新 `.translation-refresh/upstream-manifest.json`。这个 manifest 只记录上游内容文件的 hash，用于下次识别新增、变更和移除，不会导入上游 Git 历史、分支、issue、PR、label、release 或仓库设置。

## 保护规则

脚本在调用翻译命令前会保护 Markdown 中的行为关键内容：

- 代码块
- 行内代码
- 链接目标
- URL
- frontmatter keys

用户可见的安装命令中，`mattpocock/skills` 会被替换为 `vinvcn/mattpocock-skills-zh-CN`。其他命令内容不应被改写。

刷新 `README.md` 时，脚本还会检查并补回本仓库的简体中文本地化说明，避免把 README 变成上游英文 README 的直接镜像。

如果没有提供 `--translator-command`，脚本只生成差异摘要和复核标记，不会把英文上游内容写入本地化文件。这是刻意的 fail-closed 行为。
