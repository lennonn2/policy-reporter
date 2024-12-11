import { describe, test, expect } from "vitest";

import modThree from "./modThree";

describe("modThree", () => {
  test("it should throw if input string is not binary", () => {
    expect(() => modThree("12121212")).toThrowError(
      /^Please only input binary string$/
    );
  });

  test;

  test("it should return correct value", () => {
    expect(modThree("1101")).toBe(1);
    expect(modThree("1110")).toBe(2);
    expect(modThree("1111")).toBe(0);
    expect(modThree("110")).toBe(0);
  });
});
