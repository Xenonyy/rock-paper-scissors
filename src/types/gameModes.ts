import type { ExtendedChoices } from './gameChoices';

export type GameMode = 'classic' | 'advanced';

export const ModePickOptions: Record<'classic' | 'advanced', ExtendedChoices[]> = {
  classic: ['rock', 'paper', 'scissors'],
  advanced: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
};

export const WinningRules = {
  classic: {
    rock: ['scissors'],
    paper: ['rock'],
    scissors: ['paper'],
    lizard: [],
    spock: [],
  },
  advanced: {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  },
};
