---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

## Philosophy

**Core principle**：Tests 应通过 public interfaces 验证 behavior，而不是 implementation details。代码可以完全改变；tests 不该随之改变。

**Good tests** 是 integration-style：它们通过 public APIs 走真实 code paths。它们描述系统 _做什么_，不是 _怎么做_。一个好 test 读起来像 specification："user can checkout with valid cart" 能清楚说明能力是什么。这些 tests 能承受 refactors，因为它们不关心 internal structure。

**Bad tests** 与 implementation 耦合。它们 mock internal collaborators，测试 private methods，或绕过 interface 用外部方式验证（例如直接查询 database）。警告信号：你 refactor 时 test 失败，但 behavior 没变。如果只重命名 internal function 就导致 tests fail，那些 tests 测的是 implementation，不是 behavior。

示例见 [tests.md](tests.md)，mocking 规则见 [mocking.md](mocking.md)。

## Anti-Pattern: Horizontal Slices

**不要先写所有 tests，再写所有 implementation。** 这是 "horizontal slicing"：把 RED 理解成 "write all tests"，把 GREEN 理解成 "write all code"。

这会产出 **crap tests**：

- 批量写出的 tests 测的是 _想象中的_ behavior，而不是真实 behavior
- 你会测试东西的 _shape_（data structures、function signatures），而不是 user-facing behavior
- Tests 会对真实变化不敏感：behavior 坏了它们仍 pass；behavior 没坏它们却 fail
- 你会跑到 headlights 之外，在理解 implementation 前就承诺 test structure

**正确方式**：通过 tracer bullets 做 vertical slices。一个 test -> 一个 implementation -> repeat。每个 test 都回应上一轮学到的东西。因为你刚写过代码，所以知道哪些 behavior 真重要，以及如何验证。

```text
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED->GREEN: test1->impl1
  RED->GREEN: test2->impl2
  RED->GREEN: test3->impl3
  ...
```

## Workflow

### 1. Planning

探索 codebase 时，读取 `CONTEXT.md`（如果存在），让 test names 和 interface vocabulary 与项目 domain language 对齐，并尊重你触碰区域的 ADRs。

写任何代码前：

- [ ] 与用户确认需要哪些 interface changes
- [ ] 与用户确认要测试哪些 behaviors（排序）
- [ ] 识别 deep modules 机会（small interface, deep implementation）；运行 `/codebase-design` skill 来获得词汇和 testability checks
- [ ] 列出要测试的 behaviors（不是 implementation steps）
- [ ] 取得用户对 plan 的批准

询问："What should the public interface look like? Which behaviors are most important to test?"

**你无法测试所有东西。** 与用户精确确认哪些 behaviors 最重要。把测试精力放在 critical paths 和复杂 logic 上，而不是每个可能 edge case。

### 2. Tracer Bullet

写 ONE test，确认系统的一件事：

```text
RED:   Write test for first behavior -> test fails
GREEN: Write minimal code to pass -> test passes
```

这是 tracer bullet：证明路径 end-to-end 可用。

### 3. Incremental Loop

对每个剩余 behavior：

```text
RED:   Write next test -> fails
GREEN: Minimal code to pass -> passes
```

规则：

- 一次一个 test
- 只写让当前 test pass 所需的代码
- 不预判未来 tests
- 让 tests 聚焦 observable behavior

### 4. Refactor

所有 tests pass 后，寻找 [refactor candidates](refactoring.md)：

- [ ] Extract duplication
- [ ] Deepen modules（把复杂度移到简单 interfaces 后面）
- [ ] 自然时应用 SOLID principles
- [ ] 思考新代码暴露了 existing code 的哪些问题
- [ ] 每个 refactor step 后运行 tests

**RED 时永远不要 refactor。** 先到 GREEN。

## Checklist Per Cycle

```text
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] Test would survive internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
```
