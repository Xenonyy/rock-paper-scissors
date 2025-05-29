import type { CalculateInterface } from '../types/calculateUtil';
import type { ExtendedChoices } from '../types/gameChoices';

export type CalculateWinnerType = ExtendedChoices | 'draw';

export const calculateWinner = ({ playerChoice, computerChoice, rules }: CalculateInterface): CalculateWinnerType => {
  if (playerChoice === computerChoice) return 'draw';

  return rules[playerChoice].includes(computerChoice) ? playerChoice : computerChoice;
};
