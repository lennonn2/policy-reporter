import { describe, test, expect } from "vitest";

import modThreeFSM, { type ModThreeAlphabetType } from "./modThreeFSM";

describe("modThreeFSM", () => {
  test("it should throw if input is not binary", () => {
    expect(() =>
      modThreeFSM([
        "1",
        "2",
        "1",
        "2",
        "1",
        "2",
        "1",
        "2",
      ] as Array<ModThreeAlphabetType>)
    ).toThrowError(/^Provided alphabet does not contain 2$/);
  });

  test("it should return correct value", () => {
    expect(modThreeFSM(["1", "1", "0", "1"])).toBe(1);
    expect(modThreeFSM(["1", "1", "1", "0"])).toBe(2);
    expect(modThreeFSM(["1", "1", "1", "1"])).toBe(0);
    expect(modThreeFSM(["1", "1", "0"])).toBe(0);
  });

  test("it should return 0 if an empty array is passed in", () => {
    expect(modThreeFSM([])).toBe(0);
  });

  test("it should return correct value with larger numbers", () => {
    // 14,531
    expect(
      modThreeFSM([
        "1",
        "1",
        "1",
        "0",
        "0",
        "0",
        "1",
        "1",
        "0",
        "0",
        "0",
        "0",
        "1",
        "1",
      ])
    ).toBe(2);
    // 926,747
    expect(
      modThreeFSM([
        "1",
        "1",
        "1",
        "0",
        "0",
        "0",
        "1",
        "0",
        "0",
        "1",
        "0",
        "0",
        "0",
        "0",
        "0",
        "1",
        "1",
        "0",
        "1",
        "1",
      ])
    ).toBe(2);
    // 192,366,430
    expect(
      modThreeFSM([
        "1",
        "0",
        "1",
        "1",
        "0",
        "1",
        "1",
        "1",
        "0",
        "1",
        "1",
        "1",
        "0",
        "1",
        "0",
        "0",
        "0",
        "1",
        "1",
        "1",
        "0",
        "1",
        "0",
        "1",
        "1",
        "1",
        "1",
        "0",
      ])
    ).toBe(1);
  });
});
