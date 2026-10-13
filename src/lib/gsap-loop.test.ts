import { test, after } from "node:test";
import assert from "node:assert/strict";
import { gsap } from "gsap";
import { primeReversibleLoop } from "./gsap-loop.ts";

after(() => gsap.ticker.sleep());

test("primed infinite loop has at least an hour of room to play backward", () => {
  const tween = gsap.to({ x: 0 }, { x: -50, duration: 30, ease: "none", repeat: -1, paused: true });
  primeReversibleLoop(tween);
  // Playing at timeScale -1 stops once totalTime reaches 0; an unprimed loop starts at 0.
  assert.ok(tween.totalTime() >= 3600, `totalTime was ${tween.totalTime()}`);
  tween.kill();
});

test("priming lands on a loop boundary, so a seamless marquee does not jump", () => {
  const tween = gsap.to({ x: 0 }, { x: -50, duration: 30, ease: "none", repeat: -1, paused: true });
  primeReversibleLoop(tween);
  // A boundary is either the start or the end of an iteration; for a track made
  // of two identical halves both render the same frame.
  assert.ok(tween.time() === 0 || tween.time() === tween.duration(), `time was ${tween.time()}`);
  tween.kill();
});
