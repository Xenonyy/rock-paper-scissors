import type { RPSChoice } from '../types/RPSChoice';
import type { GameState } from '../types/RPSState';

export const calculateWinner = (player: RPSChoice, computer: RPSChoice): GameState => {
  console.log(`Player chose: ${player}`);
  console.log(`Computer chose: ${computer}`);
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
