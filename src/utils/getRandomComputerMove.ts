import type { ExtendedChoices } from '../types/gameChoices';

export const getRandomComputerMove = (modeOptions: ExtendedChoices[]): ExtendedChoices => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const index = array[0] % modeOptions.length;
  return modeOptions[index];
};
