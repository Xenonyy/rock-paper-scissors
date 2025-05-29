import { useCallback, useMemo, useState } from 'react';
import { calculateOutcome } from '../utils/calculateOutcome';
import { getRandomComputerMove } from '../utils/getRandomComputerMove';
import { calculateWinner } from '../utils/calculateWinner';
import { useScore } from '../contexts/ScoreContext';
import { useWinner } from '../contexts/WinnerContext';
import { useGameMode } from '../contexts/GameModeContext';
import { useLocalStorage } from './useLocalStorage';
import { ModePickOptions, WinningRules } from '../types/gameModes';
import type { ExtendedChoices } from '../types/gameChoices';
import { useGameStage } from '../contexts/GameStateContext';

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

  return useMemo(
    () => ({
      stage,
      playerChoice,
      computerChoice,
      winner,
      handleGameStart,
      handleReset,
      rules,
    }),
    [stage, playerChoice, computerChoice, winner, handleGameStart, handleReset, rules]
  );
};
