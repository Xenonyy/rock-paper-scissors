import type { RPSChoice } from '../types/RPSChoice';
import type { GameState } from '../types/RPSState';

export const calculateOutcome = (player: RPSChoice, computer: RPSChoice): GameState => {
  if (player === computer) return 'draw';

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'you win';
  }
  return 'you lose';
};
