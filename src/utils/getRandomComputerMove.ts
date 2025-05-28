import type { RPSChoice } from '../types/RPSChoice';

export const getRandomComputerMove = (): RPSChoice => {
  const choices: RPSChoice[] = ['rock', 'paper', 'scissors'];
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return choices[array[0] % 3];
};
