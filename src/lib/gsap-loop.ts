type LoopTween = { duration(): number; totalTime(value: number): unknown };

// An infinite (repeat: -1) tween starts at totalTime 0, so playing it backward
// (timeScale < 0) hits the start and stops. Jump a whole number of iterations
// ahead so it can run backward indefinitely without changing its phase.
export function primeReversibleLoop<T extends LoopTween>(tween: T): T {
  tween.totalTime(tween.duration() * 1000);
  return tween;
}
