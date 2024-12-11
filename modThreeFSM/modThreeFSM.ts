import FiniteStateAutomata from "../FiniteStateMachine/FiniteStateMachine";

type ModThreeStateType = "s0" | "s1" | "s2";
type ModThreeReturnType = 0 | 1 | 2;

const modThreeStates: Array<ModThreeStateType> = ["s0", "s1", "s2"];
const returnMap: Record<ModThreeStateType, ModThreeReturnType> = {
  s0: 0,
  s1: 1,
  s2: 2,
};

const modThree = (input: string) => {
  const modThreeFSM = new FiniteStateAutomata<
    ModThreeStateType,
    ModThreeStateType
  >({
    states: new Set<ModThreeStateType>(modThreeStates),
    alphabet: new Set(["0", "1"]),
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

  const finalState = modThreeFSM.processString(input);
  return returnMap[finalState];
};

export default modThree;
