import { describe, test, expect } from "vitest";
import FiniteStateMachine from "./FiniteStateMachine";

type StateType = "q0" | "q1" | "q2";
type AcceptingStateType = "q2";

const standardFSAParams = {
  states: new Set<StateType>(["q0", "q1", "q2"]),
  alphabet: new Set(["a", "b"] as const),
  initialState: "q0" as StateType,
  acceptingStates: new Set<AcceptingStateType>(["q2"]),
  transitionFunction: {
    q0: { a: "q1", b: "q2" },
    q1: { a: "q2", b: "q0" },
    q2: { a: "q0", b: "q1" },
  } as const,
};

describe("Finite State Automata", () => {
  // Test the initial state
  test("should start in the initial state", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    expect(fsa.getActiveState()).toBe("q0");

    // New FSA with initial state in different position
    const otherFSA = new FiniteStateMachine({
      ...standardFSAParams,
      initialState: "q1",
    });
    expect(otherFSA.getActiveState()).toBe("q1");
  });

  // Process an empty character
  test("process an empty character", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    expect(fsa.getActiveState()).toBe("q0");
  });

  // Test that the first character moves to the correct state
  test("process a single character", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    fsa.processString("a");
    expect(fsa.getActiveState()).toBe("q1");
  });

  // Process multiple characters
  test("process multiple characters", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    fsa.processString("aabab");
    expect(fsa.getActiveState()).toBe("q1");
  });

  // Process multiple strings
  test("process multiple strings", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    fsa.processString("aab");
    expect(fsa.getActiveState()).toBe("q1");
    fsa.processString("bb");
    expect(fsa.getActiveState()).toBe("q2");
  });

  // Process an invalid character
  test("process an invalid character", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    expect(() => fsa.processString("abc")).toThrowError(
      "Provided alphabet does not contain c"
    );
  });

  // Check is state is in valid final state - valid
  test("check if active state is valid accepting state - valid", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    fsa.processString("aa");
    expect(fsa.isActiveStateValid()).toBe(true);
  });

  // Check is state is in valid final state - invalid
  test("check if active state is valid accepting state - invalid", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    fsa.processString("a");
    expect(fsa.isActiveStateValid()).toBe(false);
  });

  // Resetting state works as expected
  test("resetting the state sets the active state to be the initial state", () => {
    const fsa = new FiniteStateMachine(standardFSAParams);
    fsa.processString("a");
    expect(fsa.getActiveState()).toBe("q1");
    fsa.reset();
    expect(fsa.getActiveState()).toBe("q0");
  });

  // Check that an error is thrown if there is no state to transition to from an input character
  test("processing a character should throw if no transition state exists", () => {
    const fsa = new FiniteStateMachine({
      ...standardFSAParams,
      transitionFunction: {
        q0: { a: "q1" /*, b: "q2" */ },
        q1: { a: "q2", b: "q0" },
        q2: { a: "q0", b: "q1" },
      } as const,
    });
    expect(() => fsa.processString("b")).toThrowError(
      `State does not exist in transition function from q0 with character "b"`
    );
    // Active state shouldn't be updated if error is thrown
    expect(fsa.getActiveState()).toBe("q0");
  });
});
