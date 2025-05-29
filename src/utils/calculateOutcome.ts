import type { CalculateInterface } from '../types/calculateUtil';
import type { GameState } from '../types/RPSState';

export const calculateOutcome = ({ playerChoice, computerChoice, rules }: CalculateInterface): GameState => {
  if (playerChoice === computerChoice) return 'draw';
  return rules[playerChoice].includes(computerChoice) ? 'you win' : 'you lose';
};
