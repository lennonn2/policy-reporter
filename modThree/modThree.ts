const isBinary = (val: string): boolean => {
  return val.split("").every((char) => char === "0" || char === "1");
};

type ModThreeInputCharType = 0 | 1;
type ModThreeReturnType = 0 | 1 | 2;
type ModThreeStatesType = "s0" | "s1" | "s2";

const returnMap: Record<ModThreeStatesType, ModThreeReturnType> = {
  s0: 0,
  s1: 1,
  s2: 2,
};

const s0Map = {
  0: "s0",
  1: "s1",
} as const;

const s1Map = {
  0: "s2",
  1: "s0",
} as const;

const s2Map = {
  0: "s1",
  1: "s2",
} as const;

const allMaps: Record<
  ModThreeStatesType,
  Record<ModThreeInputCharType, ModThreeStatesType>
> = {
  s0: s0Map,
  s1: s1Map,
  s2: s2Map,
};

export default function modThree(binaryInput: string): ModThreeReturnType {
  if (!binaryInput.length) {
    throw new Error("Empty string input");
  }
  if (!isBinary(binaryInput)) {
    throw new Error("Please only input binary string");
  }

  let activeState: ModThreeStatesType = "s0";

  for (const char of binaryInput) {
    activeState = allMaps[activeState][char];
  }

  return returnMap[activeState];
}
