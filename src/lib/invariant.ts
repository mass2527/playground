export function invariant(condition: any): asserts condition {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}
