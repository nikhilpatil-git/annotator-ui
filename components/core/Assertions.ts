import assert, { AssertionError } from "assert";

function IsDefined<T>(
  val: T,
  valueName: string
): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError({
      message: `Expected ${valueName} to be defined, but received ${val}`,
    });
  }
}

export function AssertArrayLength<T>(val: T[], valueName: string) {
  if (val.length === 0) {
    throw new AssertionError({
      message: `${valueName} array is empty`,
    });
  }
}

export function AssertIsDefined<T>(val: T, valueName: string): T {
  IsDefined(val, valueName);
  return val;
}

export function AssertArrayIsNotEmpty<T>(val: T[], valueName: string): T[] {
  IsDefined(val, valueName);
  AssertArrayLength(val, valueName);
  return val;
}
