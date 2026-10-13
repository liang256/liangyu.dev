import { test } from "node:test";
import assert from "node:assert/strict";
import { splitMarkdownSections } from "./markdown-sections.ts";

test("splits on level-1 headings only", () => {
  const md = "# A\ntext a\n### sub\nmore\n# B\ntext b\n";
  assert.deepEqual(splitMarkdownSections(md), [
    { heading: "A", body: "text a\n### sub\nmore" },
    { heading: "B", body: "text b" },
  ]);
});

test("text before first heading becomes an unnamed section", () => {
  assert.deepEqual(splitMarkdownSections("intro\n# A\nx"), [
    { heading: "", body: "intro" },
    { heading: "A", body: "x" },
  ]);
});

test("no headings returns one unnamed section; empty returns []", () => {
  assert.deepEqual(splitMarkdownSections("just text"), [{ heading: "", body: "just text" }]);
  assert.deepEqual(splitMarkdownSections(""), []);
});

test("does not split on # inside code fences", () => {
  const md = "# A\n```sh\n# comment\n```\n";
  assert.deepEqual(splitMarkdownSections(md), [{ heading: "A", body: "```sh\n# comment\n```" }]);
});
