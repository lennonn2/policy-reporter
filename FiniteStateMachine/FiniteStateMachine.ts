type FiniteStateMachineParamsType<
  State extends string,
  AcceptingState extends State,
  Alphabet extends string
> = {
  alphabet: Set<Alphabet>;
  initialState: State;
  acceptingStates: Set<AcceptingState>;
  transitionFunction: Record<State, Record<Alphabet, State>>;
};

export default class FiniteStateMachine<
  State extends string,
  AcceptingState extends State,
  Alphabet extends string
> {
  private alphabet: Set<Alphabet>;
  private initialState: State;
  private acceptingStates: Set<AcceptingState>;
  private transitionFunction: Record<State, Record<Alphabet, State>>;
  private activeState: State;

  constructor({
    alphabet,
    initialState,
    acceptingStates,
    transitionFunction,
  }: FiniteStateMachineParamsType<State, AcceptingState, Alphabet>) {
    this.alphabet = alphabet;
    this.initialState = initialState;
    this.acceptingStates = acceptingStates;
    this.transitionFunction = transitionFunction;

    this.activeState = initialState;
  }

  processInput(input: Array<Alphabet>) {
    for (const item of input) {
      if (!this.alphabet.has(item)) {
        throw new Error(`Provided alphabet does not contain ${item}`);
      }

      const nextState = this.transitionFunction[this.activeState]?.[item];

      if (!nextState) {
        throw new Error(
          `State does not exist in transition function from ${this.activeState} with character "${item}"`
        );
      }

      this.activeState = nextState;
    }

    return this.activeState;
  }

  isActiveStateValid() {
    return this.acceptingStates.has(this.activeState as AcceptingState);
  }

  getActiveState() {
    return this.activeState;
  }

  reset() {
    this.activeState = this.initialState;
  }
}
