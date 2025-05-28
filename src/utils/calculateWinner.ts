import type { RPSChoice } from '../types/RPSChoice';

export type CalculateWinnerType = RPSChoice | 'draw';

export const calculateWinner = (player: RPSChoice, computer: RPSChoice): CalculateWinnerType => {
  if (player === computer) return 'draw';

  const winsAgainst: Record<RPSChoice, RPSChoice> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return winsAgainst[player] === computer ? player : computer;
};
