import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveTheme } from "./theme.ts";

test("stored valid value wins", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
});

test("missing or garbage falls back to system", () => {
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("blue", false), "light");
  assert.equal(resolveTheme("", true), "dark");
});
