import { describe, test, expect } from "vitest";

import modThreeFSM from "./modThreeFSM";

describe("modThreeFSM", () => {
  test("it should throw if input string is not binary", () => {
    expect(() => modThreeFSM("12121212")).toThrowError(
      /^Provided alphabet does not contain 2$/
    );
  });

  test("it should return correct value", () => {
    expect(modThreeFSM("1101")).toBe(1);
    expect(modThreeFSM("1110")).toBe(2);
    expect(modThreeFSM("1111")).toBe(0);
    expect(modThreeFSM("110")).toBe(0);
  });

  test("it should return 0 if an empty string is passed in", () => {
    expect(modThreeFSM("")).toBe(0);
  });

  test("it should return correct value with larger numbers", () => {
    // 14,531
    expect(modThreeFSM("11100011000011")).toBe(2);
    // 926,747
    expect(modThreeFSM("11100010010000011011")).toBe(2);
    // 192,366,430
    expect(modThreeFSM("1011011101110100011101011110")).toBe(1);
  });
});
