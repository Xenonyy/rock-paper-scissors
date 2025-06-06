# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Features](#features)
  - [Links](#links)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)  
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser _(optional)_
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_

### Screenshot

![](https://i.gyazo.com/a5a046e219e85e61b1ab78879edbd294.png)

### Features

- 🎮 **Two Game Modes**
  - Classic: Rock, Paper, Scissors
  - Advanced: Rock, Paper, Scissors, Lizard, Spock
- 🧠 Accurate and extensible game logic
- 💾 **Score persistence** with localStorage
- ⚛️ Clean state management using **React Context**
- 💨 **Framer Motion** animations for fluid UI transitions
- 📱 Fully **responsive** layout across all screen sizes
- ♿ Thoughtful **accessibility**: semantic HTML and keyboard-friendly controls, playable mouse-free

### Links

- [Solution URL](https://github.com/Xenonyy/rock-paper-scissors/)
- [Live Site URL](https://rps-gameapp.netlify.app/)


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/Xenonyy/rock-paper-scissors.git
cd rock-paper-scissors
npm install
```

### Running Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Superset of JS
- [TailwindCSS](https://tailwindcss.com/blog/tailwindcss-v4) - Responsiveness and styling
- [Motion](https://motion.dev/) - Fluid animations
- [Clsx](https://github.com/lukeed/clsx#readme) - Utlity tool for dynamic classnames
- [Vite](https://vite.dev/) - Frontend build tool

### What I learned

This project helped me solidify modern React concepts and improve my confidence in building responsive, animated UIs with TailwindCSS and Motion, while also challenging me to write clean, scalable and maintainable code with the intorduction of the bonus features.

- 🧠 React 19 App Architecture

I structured the game using composable and reusable functional components, with Contexts to manage global state like the game state, game mode, score and the winner.

- 📱 Responsive Design with Tailwind

Rather than hardcoding breakpoints, I used Tailwind’s responsive utility classes to build layouts that scale naturally. Also learnt about Tailwind ^4.0 setup and new features.

- 🛠️ Bonus and Maintainability

Adding the Lizard and Spock for the bonus challenged me to refactor my logic to support multiple rulesets without duplicating code. I introduced enums, mappings and contexts to keep it scalable.

- 🎲 True Randomness

Using the cryptographically powered randomness to get true unpredictability instead of opting for a simple `Math.random()`. While undeniably overkill here, it was fun to learn about it!


- I'm proud of this optimized gamelogic-handling custom react hook:

```js
export const useRPSGameLogic = () => {
  const [playerChoice, setPlayerChoice] = useState<ExtendedChoices | null>(null);
  const [computerChoice, setComputerChoice] = useState<ExtendedChoices | null>(null);
  const { stage, setStage } = useGameStage();
  const [, setLocalStorageScore] = useLocalStorage<number>('score', 0);
  const { setScore } = useScore();
  const { winner, setWinner } = useWinner();
  const { mode } = useGameMode();
  const options = useMemo(() => ModePickOptions[mode], [mode]);
  const rules = useMemo(() => WinningRules[mode], [mode]);

  const handleGameStart = useCallback(
    async (choice: ExtendedChoices) => {
      if (stage !== 'idle') return;

      setPlayerChoice(choice);
      setStage('animating');
      await new Promise((res) => setTimeout(res, 500));

      const computer = getRandomComputerMove(options);
      setComputerChoice(computer);
      setStage('reveal');
      await new Promise((res) => setTimeout(res, 200));
      setStage('result');

      const result = calculateOutcome({ playerChoice: choice, computerChoice: computer, rules });
      setWinner(calculateWinner({ playerChoice: choice, computerChoice: computer, rules }));

      if (result === 'you win') {
        setScore((prev) => prev + 1);
        setLocalStorageScore((prev) => prev + 1);
      } else if (result === 'you lose') {
        setScore((prev) => prev - 1);
        setLocalStorageScore((prev) => prev - 1);
      }
    },
    [stage, options]
  );
  const handleReset = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setStage('idle');
    setWinner('draw');
  }, []);

  return useMemo(() => ({ stage, playerChoice, computerChoice, winner, handleGameStart, handleReset, rules }),
    [stage, playerChoice, computerChoice, winner, handleGameStart, handleReset, rules]);
};
```

### Useful resources

- [React Reference](https://react.dev/reference/react) - Good use case examples and adequate explanations of react concepts.
- [Tailwind4 Setup](https://tailwindcss.com/docs/installation/using-vite) - Helped me with setup and new changes, as I haven't used Vite or version ^4 before.
- [React Motion Component](https://motion.dev/docs/react-motion-component) - Perfect starter guide for someone like me who has never used Motion before.

## Author

- Website - [Armand Gonda](https://xenonyy.github.io/)
- Frontend Mentor - [@Xenonyy](https://www.frontendmentor.io/profile/Xenonyy)
