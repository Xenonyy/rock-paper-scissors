import type { ExtendedChoices } from './gameChoices';

export interface CalculateInterface {
  playerChoice: ExtendedChoices;
  computerChoice: ExtendedChoices;
  rules: Record<string, string[]>;
}
