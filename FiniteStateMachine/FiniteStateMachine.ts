type AlphabetType = string | number;
type FiniteStateMachineParamsType<
  State extends string,
  AcceptingState extends State
> = {
  states: Set<State>;
  alphabet: Set<AlphabetType>;
  initialState: State;
  acceptingStates: Set<AcceptingState>;
  transitionFunction: Record<State, Record<AlphabetType, State>>;
};

export default class FiniteStateMachine<
  State extends string,
  AcceptingState extends State
> {
  private states: Set<State>;
  private alphabet: Set<AlphabetType>;
  private initialState: State;
  private acceptingStates: Set<AcceptingState>;
  private transitionFunction: Record<State, Record<AlphabetType, State>>;
  private activeState: State;

  constructor({
    states,
    alphabet,
    initialState,
    acceptingStates,
    transitionFunction,
  }: FiniteStateMachineParamsType<State, AcceptingState>) {
    this.states = states;
    this.alphabet = alphabet;
    this.initialState = initialState;
    this.acceptingStates = acceptingStates;
    this.transitionFunction = transitionFunction;

    this.activeState = initialState;
  }

  private handleProcessChar(char: string) {
    if (!this.alphabet.has(char)) {
      throw new Error(`Provided alphabet does not contain ${char}`);
    }

    const nextState = this.transitionFunction[this.activeState]?.[char];

    if (!nextState) {
      throw new Error(
        `State does not exist in transition function from ${this.activeState} with character "${char}"`
      );
    }

    this.activeState = nextState;
  }

  processString(inputString: string) {
    for (const char of inputString) {
      this.handleProcessChar(char);
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
