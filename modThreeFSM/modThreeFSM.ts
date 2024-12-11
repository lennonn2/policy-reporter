import FiniteStateAutomata from "../FiniteStateMachine/FiniteStateMachine";

type ModThreeStateType = "s0" | "s1" | "s2";
type ModThreeReturnType = 0 | 1 | 2;
export type ModThreeAlphabetType = "1" | "0";

const modThreeStates: Array<ModThreeStateType> = ["s0", "s1", "s2"];
const modThreeAlphabet: Array<ModThreeAlphabetType> = ["0", "1"];
const returnMap: Record<ModThreeStateType, ModThreeReturnType> = {
  s0: 0,
  s1: 1,
  s2: 2,
};

const modThree = (input: Array<ModThreeAlphabetType>) => {
  const modThreeFSM = new FiniteStateAutomata<
    ModThreeStateType,
    ModThreeStateType,
    ModThreeAlphabetType
  >({
    alphabet: new Set(modThreeAlphabet),
    acceptingStates: new Set<ModThreeStateType>(modThreeStates),
    initialState: "s0",
    transitionFunction: {
      s0: {
        "0": "s0",
        "1": "s1",
      } as const,
      s1: {
        "0": "s2",
        "1": "s0",
      } as const,
      s2: {
        "0": "s1",
        "1": "s2",
      } as const,
    },
  });

  const finalState = modThreeFSM.processInput(input);
  return returnMap[finalState];
};

export default modThree;
