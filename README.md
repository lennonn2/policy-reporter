## Description

The repo contains three folders but it's only recommended to look at `/FiniteStateMachine` and `/modThreeFSM` for the files relating to the Advanced solution. The folder `/modThree` was just used to give myself an intro to the basic functionality of a FSM and so I could test the `modThreeFSM` against the tests in `/modThree`.

## Running Tests

1. Install dependencies with your package manager of choice (npm, yarn, pnpm)
2. Run `yarn test` or `npm test` or `pnpm test`

## Process

1. I started off working on the initial problem just to re-familiarise myself with Finite State Machines. I think I greatly overestimated my levels of confusion for the first one as it ended up being fairly straightforward.
2. From there I added some error handling to the original modThree function and wrote a few basic tests to make sure it worked properly
3. I then read through the advanced spec again and tried to convert the arguments listed in the doc to parameters for a `modThree` FSM created using a `FiniteStateMachine` generator.
4. I wrote the code and managed to get it working without any error handling or type checking but I had a few questions so I stopped there until our chat.
5. I copied over the tests from the original `modThree` function to test my FSM solution.

6. After the meeting with Chris, I started digging more into FSMs and realized that I was thinking about them in the wrong way. I was seeing them as a short-lived thing where one was created and called with an input and that was that. The more I thought about it, that didn't really make sense so I read about the use cases of them and had to re-consider what the interface between the FSM and the client would be.
7. I added 2 functions `getActiveState` and `isActiveStateValid`
8. I added generic types to the FSM class to make it more difficult to accidentally pass in incorrect props
9. I revisited my existing error handling with the following changes:

- the case when the character the machine is trying to process isn't in the alphabet. In the original modThree function, I checked this up-front for the entire string but I feel like checking at the character level is more performant, especially is the alphabet is larger.
- The case where a next state doesn't exist for a given state and character.
- I had error handling in place for when an empty input string was passed into `processString` but a quick Google told me that empty strings are valid inputs into FSM so I removed that and made a note to test that the state doesn't change when an empty string is passed in in my unit tests.

10. Wrote unit tests for the FSM module
