import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateOutcome } from '../utils/calculateOutcome';
import { getRandomComputerMove } from '../utils/getRandomComputerMove';
import { calculateWinner } from '../utils/calculateWinner';
import { useScore } from '../contexts/ScoreContext';
import { useWinner } from '../contexts/WinnerContext';
import type { GameStage } from '../types/RPSState';
import type { RPSChoice } from '../types/RPSChoice';

export const useRPSGameLogic = () => {
  const [playerChoice, setPlayerChoice] = useState<RPSChoice | null>(null);
  const [computerChoice, setComputerChoice] = useState<RPSChoice | null>(null);
  const [stage, setStage] = useState<GameStage>('idle');

  const { setScore } = useScore();
  const { winner, setWinner } = useWinner();

  const handleGameStart = useCallback(
    async (choice: RPSChoice) => {
      if (stage !== 'idle') return;

      setPlayerChoice(choice);
      setStage('animating');
      await new Promise((res) => setTimeout(res, 500));

      const computer = getRandomComputerMove();
      setComputerChoice(computer);
      setStage('reveal');
      await new Promise((res) => setTimeout(res, 200));

      setStage('result');
    },
    [stage]
  );
  const handleReset = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setStage('idle');
    setWinner('draw');
  }, []);

  useEffect(() => {
    if (playerChoice && computerChoice) {
      const result = calculateOutcome(playerChoice, computerChoice);
      if (result === 'you win') {
        setScore((prev) => prev + 1);
      }
      setWinner(calculateWinner(playerChoice, computerChoice));
    }
  }, [playerChoice, computerChoice]);

  return useMemo(
    () => ({
      stage,
      playerChoice,
      computerChoice,
      winner,
      handleGameStart,
      handleReset,
    }),
    [stage, playerChoice, computerChoice, winner, handleGameStart, handleReset]
  );
};
