import { test } from "node:test";
import assert from "node:assert/strict";
import { readingTime } from "./reading-time.ts";

test("empty content is 1 minute", () => {
  assert.equal(readingTime(""), 1);
  assert.equal(readingTime("   \n  "), 1);
});

test("230 words is 1 minute, 231 is 2", () => {
  assert.equal(readingTime(Array(230).fill("w").join(" ")), 1);
  assert.equal(readingTime(Array(231).fill("w").join(" ")), 2);
});

test("ignores markdown code fences and image syntax noise", () => {
  const md = "word ".repeat(460) + "\n```ts\nconst x = 1;\n```\n![alt](/a.png)";
  assert.equal(readingTime(md), 2);
});

test("CJK characters count roughly as words", () => {
  assert.equal(readingTime("字".repeat(460)), 2);
});
