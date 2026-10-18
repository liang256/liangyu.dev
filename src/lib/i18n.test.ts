import { test } from "node:test";
import assert from "node:assert/strict";
import { alternatesFor, isLocale, localePath, splitLocale } from "./i18n.ts";

test("isLocale accepts only known locales", () => {
  assert.equal(isLocale("ja"), true);
  assert.equal(isLocale("zh-tw"), true);
  assert.equal(isLocale("fr"), false);
  assert.equal(isLocale(undefined), false);
});

test("splitLocale strips non-default prefixes", () => {
  assert.deepEqual(splitLocale("/ja/posts/x"), { locale: "ja", path: "/posts/x" });
  assert.deepEqual(splitLocale("/zh-tw"), { locale: "zh-tw", path: "/" });
  assert.deepEqual(splitLocale("/posts/x"), { locale: "en", path: "/posts/x" });
  assert.deepEqual(splitLocale("/"), { locale: "en", path: "/" });
});

test("splitLocale strips the internal /en prefix seen during prerender", () => {
  assert.deepEqual(splitLocale("/en/about"), { locale: "en", path: "/about" });
  assert.deepEqual(splitLocale("/en"), { locale: "en", path: "/" });
});

test("localePath leaves the default locale unprefixed", () => {
  assert.equal(localePath("en", "/posts"), "/posts");
  assert.equal(localePath("ja", "/posts"), "/ja/posts");
  assert.equal(localePath("zh-tw", "/"), "/zh-tw");
  assert.equal(localePath("ja", "mailto:a@b.c"), "mailto:a@b.c");
  assert.equal(localePath("ja", "https://x.com"), "https://x.com");
});

test("alternatesFor emits canonical and hreflang for every locale", () => {
  const a = alternatesFor("https://s.dev", "ja", "/about");
  assert.equal(a.canonical, "https://s.dev/ja/about");
  assert.deepEqual(a.languages, {
    en: "https://s.dev/about",
    "zh-Hant-TW": "https://s.dev/zh-tw/about",
    ja: "https://s.dev/ja/about",
    "x-default": "https://s.dev/about",
  });
});
